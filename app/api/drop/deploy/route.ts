import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { unzipSync } from "fflate";
import {
  DROP_MAX_ARCHIVE_BYTES,
  DROP_MAX_FILE_BYTES,
  DROP_MAX_FILES,
  DROP_MAX_TOTAL_BYTES,
  DropValidationError,
  validateDropEntries,
} from "../../../lib/drop-site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const DEPLOY_TIMEOUT_MS = 105_000;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT = 3;
const require = createRequire(import.meta.url);

type RateStore = Map<string, number[]>;
const globalRateStore = globalThis as typeof globalThis & { __dropRateStore?: RateStore };
const rateStore = globalRateStore.__dropRateStore ?? new Map<string, number[]>();
globalRateStore.__dropRateStore = rateStore;

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (rateStore.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateStore.set(ip, recent);
  return false;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function stripAnsi(value: string) {
  return value.replace(/[\u001B\u009B][[\]()#;?]*(?:(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*)?\u0007)|(?:(?:\d{1,4}(?:[;:]\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))/g, "");
}

function friendlyDeployError(output: string) {
  const lower = output.toLowerCase();
  if (lower.includes("too many temporary") || lower.includes("rate limit") || lower.includes("429")) {
    return "Cloudflare sedang membatasi temporary deployment. Download ZIP lalu gunakan Drop manual.";
  }
  if (lower.includes("already authenticated") || lower.includes("--temporary")) {
    return "Temporary deployer memiliki konfigurasi yang tidak kompatibel. Gunakan Drop manual untuk saat ini.";
  }
  return "Cloudflare belum dapat menerbitkan website ini. File tetap siap untuk Drop manual.";
}

async function runWrangler(configPath: string, workdir: string) {
  const packagePath = require.resolve("wrangler/package.json");
  const wranglerBin = join(dirname(packagePath), "bin", "wrangler.js");
  const homeDir = join(workdir, "home");
  const cacheDir = join(workdir, "wrangler-cache");
  await Promise.all([mkdir(homeDir, { recursive: true }), mkdir(cacheDir, { recursive: true })]);

  const env = { ...process.env };
  for (const key of Object.keys(env)) {
    if (key.startsWith("CLOUDFLARE_")) delete env[key];
  }
  delete env.NODE_OPTIONS;
  Object.assign(env, {
    HOME: homeDir,
    USERPROFILE: homeDir,
    APPDATA: homeDir,
    LOCALAPPDATA: homeDir,
    WRANGLER_CACHE_DIR: cacheDir,
    CI: "1",
  });

  return new Promise<string>((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, [wranglerBin, "deploy", "--temporary", "--config", configPath], {
      cwd: workdir,
      env,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = "";
    const append = (chunk: Buffer) => {
      if (output.length < 200_000) output += chunk.toString("utf8");
    };
    child.stdout.on("data", append);
    child.stderr.on("data", append);

    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 2_000).unref();
      rejectPromise(new Error("DEPLOY_TIMEOUT"));
    }, DEPLOY_TIMEOUT_MS);

    child.once("error", (error) => {
      clearTimeout(timeout);
      rejectPromise(error);
    });
    child.once("close", (code) => {
      clearTimeout(timeout);
      const clean = stripAnsi(output);
      if (code === 0) resolvePromise(clean);
      else rejectPromise(new Error(friendlyDeployError(clean)));
    });
  });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return json({ error: "Origin tidak diizinkan." }, 403);
  if (isRateLimited(clientIp(request))) {
    return json({ error: "Batas 3 temporary deploy per jam tercapai. Gunakan Drop manual." }, 429);
  }

  if (process.env.NODE_ENV === "production" && process.env.DROP_TEMPORARY_DEPLOY_ENABLED !== "true") {
    return json(
      {
        error: "Temporary deploy belum diaktifkan pada environment ini.",
        manualUrl: "https://www.cloudflare.com/drop/",
      },
      503,
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > DROP_MAX_ARCHIVE_BYTES + 1_000_000) {
    return json({ error: "ZIP upload melebihi batas 20 MiB." }, 413);
  }

  let tempRoot = "";
  try {
    const form = await request.formData();
    const archive = form.get("site");
    if (!(archive instanceof File)) return json({ error: "ZIP website tidak ditemukan." }, 400);
    if (archive.size > DROP_MAX_ARCHIVE_BYTES) return json({ error: "ZIP upload melebihi batas 20 MiB." }, 413);

    const zipped = new Uint8Array(await archive.arrayBuffer());
    let unzipped: Record<string, Uint8Array>;
    try {
      let fileCount = 0;
      let totalSize = 0;
      unzipped = unzipSync(zipped, {
        filter(file) {
          if (file.name.endsWith("/")) return false;
          fileCount += 1;
          totalSize += file.originalSize;
          if (fileCount > DROP_MAX_FILES) {
            throw new DropValidationError("TOO_MANY_FILES", "ZIP berisi lebih dari 1.000 file.");
          }
          if (file.originalSize > DROP_MAX_FILE_BYTES) {
            throw new DropValidationError("FILE_TOO_LARGE", `${file.name} melebihi batas 5 MiB.`);
          }
          if (totalSize > DROP_MAX_TOTAL_BYTES) {
            throw new DropValidationError("SITE_TOO_LARGE", "Isi ZIP setelah diekstrak melebihi 50 MiB.");
          }
          return true;
        },
      });
    } catch (error) {
      if (error instanceof DropValidationError) throw error;
      return json({ error: "ZIP rusak atau formatnya tidak didukung." }, 422);
    }

    const manifest = validateDropEntries(
      Object.entries(unzipped).map(([path, bytes]) => ({ path, bytes })),
    );

    tempRoot = await mkdtemp(join(tmpdir(), "devcode-drop-"));
    const siteDir = join(tempRoot, "site");
    await mkdir(siteDir, { recursive: true });

    for (const entry of manifest.entries) {
      const destination = resolve(siteDir, entry.path);
      const safeRoot = `${resolve(siteDir)}${sep}`;
      if (!destination.startsWith(safeRoot)) {
        throw new DropValidationError("PATH_TRAVERSAL", "Path file keluar dari root website.");
      }
      await mkdir(dirname(destination), { recursive: true });
      await writeFile(destination, entry.bytes);
    }

    const configPath = join(tempRoot, "wrangler.jsonc");
    const workerName = `drop-${randomUUID().replaceAll("-", "").slice(0, 20)}`;
    await writeFile(
      configPath,
      JSON.stringify(
        {
          name: workerName,
          compatibility_date: new Date().toISOString().slice(0, 10),
          assets: {
            directory: "./site",
            not_found_handling: "single-page-application",
          },
          observability: { enabled: false },
        },
        null,
        2,
      ),
      "utf8",
    );

    const output = await runWrangler(configPath, tempRoot);
    const publicUrl = output.match(/https:\/\/[a-z0-9-]+\.[a-z0-9-]+\.workers\.dev\b/i)?.[0];
    const claimUrl = output.match(/https:\/\/dash\.cloudflare\.com\/claim-preview\?claimToken=[^\s]+/i)?.[0];
    if (!publicUrl || !claimUrl) throw new Error("Cloudflare tidak mengembalikan URL deployment yang lengkap.");

    const deployedAt = new Date();
    return json({
      publicUrl,
      claimUrl,
      deployedAt: deployedAt.toISOString(),
      claimDeadlineEstimated: new Date(deployedAt.getTime() + 60 * 60 * 1000).toISOString(),
      fileCount: manifest.entries.length,
      totalBytes: manifest.totalBytes,
    });
  } catch (error) {
    if (error instanceof DropValidationError) {
      return json({ error: error.message, code: error.code }, 422);
    }
    const message = error instanceof Error ? error.message : "Temporary deployment gagal.";
    return json(
      {
        error: message.startsWith("Cloudflare") ? message : friendlyDeployError(message),
        manualUrl: "https://www.cloudflare.com/drop/",
      },
      message === "DEPLOY_TIMEOUT" ? 504 : 502,
    );
  } finally {
    if (tempRoot) await rm(tempRoot, { recursive: true, force: true }).catch(() => undefined);
  }
}
