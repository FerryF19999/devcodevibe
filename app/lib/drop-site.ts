export const DROP_MAX_FILES = 1_000;
export const DROP_MAX_FILE_BYTES = 5 * 1024 * 1024;
export const DROP_MAX_TOTAL_BYTES = 50 * 1024 * 1024;
export const DROP_MAX_ARCHIVE_BYTES = 20 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([
  "",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".xml",
  ".txt",
  ".md",
  ".webmanifest",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".eot",
  ".wasm",
  ".pdf",
  ".mp3",
  ".mp4",
]);

const IGNORED_FILES = new Set([".ds_store", "thumbs.db"]);
const IGNORED_DIRECTORIES = new Set(["__macosx"]);
const BLOCKED_DIRECTORIES = new Set([".git", ".svn", "node_modules"]);

export type DropEntry = {
  path: string;
  bytes: Uint8Array;
};

export type DropManifest = {
  entries: DropEntry[];
  totalBytes: number;
  rootWasFlattened: boolean;
};

export class DropValidationError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "DropValidationError";
  }
}

function cleanPath(input: string) {
  return input.replaceAll("\\", "/").replace(/^\.\//, "").replace(/^\/+/, "");
}

function extensionOf(path: string) {
  const name = path.split("/").at(-1) ?? "";
  const dot = name.lastIndexOf(".");
  return dot <= 0 ? "" : name.slice(dot).toLowerCase();
}

function validatePath(path: string) {
  if (!path || path.includes("\0") || path.length > 240) {
    throw new DropValidationError("INVALID_PATH", `Path tidak valid: ${path || "(kosong)"}`);
  }

  if (/^[a-z]:/i.test(path) || path.startsWith("/")) {
    throw new DropValidationError("ABSOLUTE_PATH", `Absolute path tidak diizinkan: ${path}`);
  }

  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === "..")) {
    throw new DropValidationError("PATH_TRAVERSAL", `Path traversal tidak diizinkan: ${path}`);
  }

  const lowerSegments = segments.map((segment) => segment.toLowerCase());
  if (lowerSegments.some((segment) => BLOCKED_DIRECTORIES.has(segment))) {
    throw new DropValidationError("BLOCKED_DIRECTORY", `Folder internal/source tidak boleh dipublish: ${path}`);
  }

  const filename = lowerSegments.at(-1) ?? "";
  if (
    filename === ".env" ||
    filename.startsWith(".env.") ||
    filename === ".htpasswd" ||
    filename === "id_rsa" ||
    filename.endsWith(".pem") ||
    filename.endsWith(".key") ||
    filename.endsWith(".p12") ||
    filename.endsWith(".pfx") ||
    filename.endsWith(".map")
  ) {
    throw new DropValidationError("SENSITIVE_FILE", `File sensitif/source-map tidak boleh dipublish: ${path}`);
  }

  if (["_worker.js", "wrangler.toml", "wrangler.json", "wrangler.jsonc"].includes(filename)) {
    throw new DropValidationError("RUNTIME_FILE", `Konfigurasi runtime tidak diterima pada static Drop: ${path}`);
  }

  const extension = extensionOf(path);
  if (!ALLOWED_EXTENSIONS.has(extension)) {
    throw new DropValidationError("UNSUPPORTED_FILE", `Tipe file belum didukung: ${path}`);
  }
}

function flattenSingleRoot(entries: DropEntry[]) {
  if (entries.some((entry) => entry.path.toLowerCase() === "index.html")) {
    return { entries, flattened: false };
  }

  const roots = new Set(entries.map((entry) => entry.path.split("/")[0]));
  if (roots.size !== 1) return { entries, flattened: false };

  const [root] = [...roots];
  const prefix = `${root}/`;
  if (!entries.some((entry) => entry.path.toLowerCase() === `${prefix}index.html`.toLowerCase())) {
    return { entries, flattened: false };
  }

  return {
    entries: entries.map((entry) => ({ ...entry, path: entry.path.slice(prefix.length) })),
    flattened: true,
  };
}

export function validateDropEntries(rawEntries: DropEntry[]): DropManifest {
  const filtered: DropEntry[] = [];
  const seen = new Set<string>();

  for (const rawEntry of rawEntries) {
    const path = cleanPath(rawEntry.path);
    if (!path || path.endsWith("/")) continue;

    const segments = path.toLowerCase().split("/");
    if (segments.some((segment) => IGNORED_DIRECTORIES.has(segment))) continue;
    if (IGNORED_FILES.has(segments.at(-1) ?? "")) continue;

    validatePath(path);
    const key = path.toLowerCase();
    if (seen.has(key)) {
      throw new DropValidationError("DUPLICATE_PATH", `Ada dua file dengan path sama: ${path}`);
    }
    seen.add(key);

    if (rawEntry.bytes.byteLength > DROP_MAX_FILE_BYTES) {
      throw new DropValidationError("FILE_TOO_LARGE", `${path} melebihi batas 5 MiB.`);
    }
    filtered.push({ path, bytes: rawEntry.bytes });
  }

  if (!filtered.length) {
    throw new DropValidationError("EMPTY_SITE", "Folder atau ZIP tidak berisi static assets yang dapat dipublish.");
  }
  if (filtered.length > DROP_MAX_FILES) {
    throw new DropValidationError("TOO_MANY_FILES", `Jumlah file ${filtered.length} melebihi batas ${DROP_MAX_FILES}.`);
  }

  const flattened = flattenSingleRoot(filtered);
  const totalBytes = flattened.entries.reduce((sum, entry) => sum + entry.bytes.byteLength, 0);
  if (totalBytes > DROP_MAX_TOTAL_BYTES) {
    throw new DropValidationError("SITE_TOO_LARGE", "Total isi website melebihi batas 50 MiB.");
  }

  if (!flattened.entries.some((entry) => entry.path.toLowerCase() === "index.html")) {
    const looksLikeSource = flattened.entries.some((entry) => entry.path.toLowerCase() === "package.json");
    throw new DropValidationError(
      looksLikeSource ? "SOURCE_NOT_BUILT" : "INDEX_MISSING",
      looksLikeSource
        ? "Ini terlihat seperti source project. Jalankan build lalu drop folder dist/ atau out/."
        : "index.html harus berada di root folder website.",
    );
  }

  const looksLikeUnbuiltSource =
    flattened.entries.some((entry) => entry.path.toLowerCase() === "package.json") &&
    flattened.entries.some((entry) => entry.path.toLowerCase().startsWith("src/"));
  if (looksLikeUnbuiltSource) {
    throw new DropValidationError(
      "SOURCE_NOT_BUILT",
      "Folder ini masih berupa source project. Drop hasil build dari dist/ atau out/.",
    );
  }

  return {
    entries: flattened.entries.sort((a, b) => a.path.localeCompare(b.path)),
    totalBytes,
    rootWasFlattened: flattened.flattened,
  };
}

export function formatDropBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MiB`;
}
