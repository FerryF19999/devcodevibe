"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { unzipSync, zipSync } from "fflate";
import {
  DROP_MAX_FILE_BYTES,
  DROP_MAX_FILES,
  DropValidationError,
  formatDropBytes,
  validateDropEntries,
  type DropEntry,
  type DropManifest,
} from "../lib/drop-site";

type BrowserFile = { path: string; file: File };
type DeployResult = {
  publicUrl: string;
  claimUrl: string;
  deployedAt: string;
  claimDeadlineEstimated: string;
  fileCount: number;
  totalBytes: number;
};

type FileSystemEntryLike = {
  isFile: boolean;
  isDirectory: boolean;
  name: string;
};

type FileEntryLike = FileSystemEntryLike & {
  file: (success: (file: File) => void, failure?: (error: DOMException) => void) => void;
};

type DirectoryEntryLike = FileSystemEntryLike & {
  createReader: () => {
    readEntries: (
      success: (entries: FileSystemEntryLike[]) => void,
      failure?: (error: DOMException) => void,
    ) => void;
  };
};

type PreparedSite = DropManifest & {
  archive: Uint8Array;
  label: string;
};

const DEPLOY_STEPS = [
  "Memeriksa ulang static assets",
  "Membuat temporary Cloudflare account",
  "Mengunggah website ke edge network",
  "Menunggu URL workers.dev",
];

function readFileEntry(entry: FileEntryLike, path: string) {
  return new Promise<BrowserFile>((resolve, reject) => {
    entry.file((file) => resolve({ path, file }), reject);
  });
}

function readDirectoryBatch(entry: DirectoryEntryLike) {
  const reader = entry.createReader();
  return new Promise<FileSystemEntryLike[]>((resolve, reject) => {
    const all: FileSystemEntryLike[] = [];
    const next = () => {
      reader.readEntries((batch) => {
        if (!batch.length) resolve(all);
        else {
          all.push(...batch);
          next();
        }
      }, reject);
    };
    next();
  });
}

async function walkEntry(entry: FileSystemEntryLike, parent = ""): Promise<BrowserFile[]> {
  const path = parent ? `${parent}/${entry.name}` : entry.name;
  if (entry.isFile) return [await readFileEntry(entry as FileEntryLike, path)];
  if (!entry.isDirectory) return [];
  const children = await readDirectoryBatch(entry as DirectoryEntryLike);
  const nested = await Promise.all(children.map((child) => walkEntry(child, path)));
  return nested.flat();
}

async function filesFromDrop(dataTransfer: DataTransfer) {
  const entries: FileSystemEntryLike[] = [...dataTransfer.items].flatMap((item) => {
    const withEntry = item as DataTransferItem & { webkitGetAsEntry?: () => FileSystemEntry | null };
    const entry = withEntry.webkitGetAsEntry?.();
    return entry ? [entry as unknown as FileSystemEntryLike] : [];
  });

  if (entries.length) {
    const nested = await Promise.all(entries.map((entry) => walkEntry(entry)));
    return nested.flat();
  }

  return [...dataTransfer.files].map((file) => ({ path: file.name, file }));
}

function unzipWithLimits(bytes: Uint8Array) {
  let fileCount = 0;
  let totalSize = 0;
  return unzipSync(bytes, {
    filter(file) {
      if (file.name.endsWith("/")) return false;
      fileCount += 1;
      totalSize += file.originalSize;
      if (fileCount > DROP_MAX_FILES) throw new DropValidationError("TOO_MANY_FILES", "ZIP berisi terlalu banyak file.");
      if (file.originalSize > DROP_MAX_FILE_BYTES) {
        throw new DropValidationError("FILE_TOO_LARGE", `${file.name} melebihi batas 5 MiB.`);
      }
      if (totalSize > 50 * 1024 * 1024) {
        throw new DropValidationError("SITE_TOO_LARGE", "Isi ZIP setelah diekstrak melebihi 50 MiB.");
      }
      return true;
    },
  });
}

async function prepareSite(files: BrowserFile[], label: string): Promise<PreparedSite> {
  if (files.length === 1 && files[0].path.toLowerCase().endsWith(".zip")) {
    const bytes = new Uint8Array(await files[0].file.arrayBuffer());
    const unzipped = unzipWithLimits(bytes);
    const manifest = validateDropEntries(Object.entries(unzipped).map(([path, value]) => ({ path, bytes: value })));
    const archive = zipSync(Object.fromEntries(manifest.entries.map((entry) => [entry.path, entry.bytes])), { level: 6 });
    return { ...manifest, archive, label: files[0].file.name };
  }

  const entries: DropEntry[] = await Promise.all(
    files.map(async ({ path, file }) => ({ path, bytes: new Uint8Array(await file.arrayBuffer()) })),
  );
  const manifest = validateDropEntries(entries);
  const archive = zipSync(Object.fromEntries(manifest.entries.map((entry) => [entry.path, entry.bytes])), { level: 6 });
  return { ...manifest, archive, label };
}

function useCountdown(deadline?: string) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!deadline) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(timer);
  }, [deadline]);

  if (!deadline) return "60:00";
  const remaining = Math.max(0, new Date(deadline).getTime() - now);
  const minutes = Math.floor(remaining / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1_000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function ownedArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

export function DropExperience({ embedded = false }: { embedded?: boolean }) {
  const folderInput = useRef<HTMLInputElement>(null);
  const zipInput = useRef<HTMLInputElement>(null);
  const [prepared, setPrepared] = useState<PreparedSite>();
  const [result, setResult] = useState<DeployResult>();
  const [dragging, setDragging] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown(result?.claimDeadlineEstimated);

  useEffect(() => {
    const input = folderInput.current;
    if (!input) return;
    input.setAttribute("webkitdirectory", "");
    input.setAttribute("directory", "");
  }, []);

  useEffect(() => {
    if (!deploying) return;
    const timer = window.setInterval(() => {
      setDeployStep((step) => Math.min(step + 1, DEPLOY_STEPS.length - 1));
    }, 4_500);
    return () => window.clearInterval(timer);
  }, [deploying]);

  const fileTypes = useMemo(() => {
    if (!prepared) return [];
    const groups = new Map<string, number>();
    for (const entry of prepared.entries) {
      const extension = entry.path.split(".").at(-1)?.toUpperCase() ?? "FILE";
      groups.set(extension, (groups.get(extension) ?? 0) + 1);
    }
    return [...groups.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [prepared]);

  async function acceptFiles(files: BrowserFile[], label: string) {
    setPreparing(true);
    setPrepared(undefined);
    setResult(undefined);
    setError("");
    try {
      setPrepared(await prepareSite(files, label));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Folder atau ZIP tidak dapat dibaca.");
    } finally {
      setPreparing(false);
    }
  }

  async function deploy() {
    if (!prepared) return;
    setDeploying(true);
    setDeployStep(0);
    setError("");
    setResult(undefined);
    try {
      const form = new FormData();
      form.set("site", new File([ownedArrayBuffer(prepared.archive)], "site.zip", { type: "application/zip" }));
      const response = await fetch("/api/drop/deploy", { method: "POST", body: form });
      const payload = (await response.json()) as DeployResult & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Cloudflare deployment gagal.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Cloudflare deployment gagal.");
    } finally {
      setDeploying(false);
    }
  }

  function downloadAndOpenDrop() {
    if (!prepared) return;
    const url = URL.createObjectURL(new Blob([ownedArrayBuffer(prepared.archive)], { type: "application/zip" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "static-site-ready.zip";
    anchor.click();
    URL.revokeObjectURL(url);
    window.open("https://www.cloudflare.com/drop/", "_blank", "noopener,noreferrer");
  }

  async function copyUrl() {
    if (!result) return;
    await navigator.clipboard.writeText(result.publicUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_600);
  }

  const content = (
    <>
      {!embedded && <header className="drop-nav">
        <a className="drop-brand" href="/" aria-label="devcodeagency home">
          <span className="drop-brand-mark">d/</span>
          <span>devcode.drop</span>
        </a>
        <div className="drop-nav-meta">
          <span><i /> Edge ready</span>
          <a href="/id">Kembali ke studio</a>
        </div>
      </header>}

      <section className="drop-hero">
        <div className="drop-eyebrow"><span>01</span> STATIC SITE DEPLOYMENT</div>
        <h1>Drop website.<br /><em>Langsung live.</em></h1>
        <p>
          Tarik folder atau ZIP berisi HTML, CSS, JavaScript, gambar, dan font. Kami memeriksa isinya,
          lalu Cloudflare memberi URL sementara yang bisa langsung dibagikan.
        </p>
        <div className="drop-facts" aria-label="Product facts">
          <span>Tanpa setup akun</span><span>Claim dalam 60 menit</span><span>0 token usage</span>
        </div>
      </section>

      <section className="drop-workspace" aria-live="polite">
        {!prepared && !preparing && (
          <div
            className={`drop-zone${dragging ? " is-dragging" : ""}`}
            onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              if (event.currentTarget === event.target) setDragging(false);
            }}
            onDrop={async (event) => {
              event.preventDefault();
              setDragging(false);
              const files = await filesFromDrop(event.dataTransfer);
              await acceptFiles(files, files[0]?.path.split("/")[0] ?? "Dropped site");
            }}
          >
            <div className="drop-orbit" aria-hidden="true"><span /><span /><span /></div>
            <div className="drop-zone-copy">
              <strong>{dragging ? "Lepaskan untuk membaca website" : "Letakkan folder atau ZIP di sini"}</strong>
              <span>Pastikan index.html berada di root hasil build.</span>
            </div>
            <div className="drop-actions">
              <button type="button" onClick={() => folderInput.current?.click()}>Pilih folder</button>
              <button type="button" className="is-secondary" onClick={() => zipInput.current?.click()}>Pilih ZIP</button>
            </div>
            <input
              ref={folderInput}
              className="drop-hidden-input"
              type="file"
              multiple
              onChange={(event) => {
                const files = [...(event.target.files ?? [])].map((file) => ({
                  path: file.webkitRelativePath || file.name,
                  file,
                }));
                void acceptFiles(files, files[0]?.path.split("/")[0] ?? "Selected folder");
                event.target.value = "";
              }}
            />
            <input
              ref={zipInput}
              className="drop-hidden-input"
              type="file"
              accept=".zip,application/zip"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void acceptFiles([{ path: file.name, file }], file.name);
                event.target.value = "";
              }}
            />
          </div>
        )}

        {preparing && (
          <div className="drop-loading">
            <span className="drop-spinner" />
            <strong>Membaca struktur website</strong>
            <p>Mengecek path, ukuran, dan index.html tanpa mengunggah apa pun.</p>
          </div>
        )}

        {prepared && !result && (
          <div className="drop-manifest">
            <div className="drop-manifest-head">
              <div>
                <span className="drop-kicker">READY TO PUBLISH</span>
                <h2>{prepared.label}</h2>
                <p>{prepared.rootWasFlattened ? "Folder utama dirapikan otomatis. " : ""}index.html ditemukan di root.</p>
              </div>
              <button className="drop-reset" type="button" onClick={() => { setPrepared(undefined); setError(""); }}>
                Ganti file
              </button>
            </div>

            <div className="drop-metrics">
              <div><span>Files</span><strong>{prepared.entries.length}</strong></div>
              <div><span>Unpacked</span><strong>{formatDropBytes(prepared.totalBytes)}</strong></div>
              <div><span>ZIP upload</span><strong>{formatDropBytes(prepared.archive.byteLength)}</strong></div>
              <div><span>Entry</span><strong>index.html</strong></div>
            </div>

            <div className="drop-file-grid">
              <div className="drop-file-list">
                <span className="drop-kicker">FILE MANIFEST</span>
                <ul>
                  {prepared.entries.slice(0, 8).map((entry) => (
                    <li key={entry.path}><code>{entry.path}</code><span>{formatDropBytes(entry.bytes.byteLength)}</span></li>
                  ))}
                </ul>
                {prepared.entries.length > 8 && <p>+ {prepared.entries.length - 8} file lainnya</p>}
              </div>
              <div className="drop-type-list">
                <span className="drop-kicker">ASSET MIX</span>
                {fileTypes.map(([type, count]) => (
                  <div key={type}><span>{type || "FILE"}</span><strong>{count}</strong></div>
                ))}
              </div>
            </div>

            <div className="drop-publish-bar">
              <div>
                <span>Temporary public deployment</span>
                <p>URL akan dihapus bila tidak diklaim dalam 60 menit.</p>
              </div>
              <button className="drop-live-button" type="button" onClick={() => void deploy()} disabled={deploying}>
                {deploying ? "Publishing…" : "Go live"} <span>↗</span>
              </button>
            </div>

            {deploying && (
              <div className="drop-progress">
                <span style={{ width: `${((deployStep + 1) / DEPLOY_STEPS.length) * 100}%` }} />
                <p>{DEPLOY_STEPS[deployStep]}</p>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="drop-result">
            <div className="drop-result-status"><i /> WEBSITE LIVE</div>
            <h2>Sudah ada di edge.</h2>
            <p className="drop-result-intro">Buka, tes, atau bagikan URL publik berikut. Claim sebelum timer selesai untuk menyimpannya.</p>
            <div className="drop-url-row">
              <code>{result.publicUrl.replace("https://", "")}</code>
              <button type="button" onClick={() => void copyUrl()}>{copied ? "Copied" : "Copy"}</button>
            </div>
            <div className="drop-result-actions">
              <a href={result.publicUrl} target="_blank" rel="noreferrer">Buka website <span>↗</span></a>
              <a className="is-claim" href={result.claimUrl} target="_blank" rel="noreferrer">Claim deployment</a>
            </div>
            <div className="drop-countdown">
              <span>CLAIM WINDOW</span>
              <strong>{countdown}</strong>
              <p>Claim link adalah kunci kepemilikan. Jangan bagikan link tersebut.</p>
            </div>
            <button className="drop-another" type="button" onClick={() => { setPrepared(undefined); setResult(undefined); setError(""); }}>
              Drop website lain
            </button>
          </div>
        )}

        {error && (
          <div className="drop-error" role="alert">
            <div><strong>Belum bisa diterbitkan</strong><p>{error}</p></div>
            {prepared && <button type="button" onClick={downloadAndOpenDrop}>Download ZIP & buka Drop resmi</button>}
          </div>
        )}
      </section>

      <section className="drop-how">
        <div><span>01</span><strong>Drop</strong><p>Folder atau ZIP static. Tidak ada source build otomatis.</p></div>
        <div><span>02</span><strong>Verify</strong><p>Path, secret, ukuran, dan entry point diperiksa dua kali.</p></div>
        <div><span>03</span><strong>Live</strong><p>Cloudflare membuat URL publik sementara di workers.dev.</p></div>
      </section>

      {!embedded && <footer className="drop-footer">
        <span>Static sites only · 1,000 files · 5 MiB per file</span>
        <span>Powered by Cloudflare temporary deployments</span>
      </footer>}
    </>
  );

  return embedded ? (
    <div className="drop-page drop-page-embedded">{content}</div>
  ) : (
    <main className="drop-page">{content}</main>
  );
}
