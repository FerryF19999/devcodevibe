"use client";

import { useEffect, useState } from "react";
import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

type Stage = "idle" | "plan" | "edit" | "check" | "ready";

const PROMPTS = {
  en: [
    "Make the hero feel more premium",
    "Add a pricing section in IDR",
    "Fix the mobile navigation",
  ],
  id: [
    "Bikin hero lebih premium",
    "Tambahkan section harga IDR",
    "Rapikan navigation di mobile",
  ],
};

const STAGES: Record<Exclude<Stage, "idle">, { label: string; file: string }> = {
  plan: { label: "Membaca brief dan menyusun plan", file: "project context" },
  edit: { label: "Mengubah komponen dan design tokens", file: "app/components/Hero.tsx" },
  check: { label: "Menjalankan typecheck dan build", file: "npm run build" },
  ready: { label: "Preview baru siap dilihat", file: "snapshot v12" },
};

export function AgentDemo({ lang }: { t: Copy; lang: Lang }) {
  const [prompt, setPrompt] = useState(PROMPTS[lang][0]);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    if (stage === "idle" || stage === "ready") return;
    const order: Stage[] = ["plan", "edit", "check", "ready"];
    const timer = window.setTimeout(() => {
      setStage(order[Math.min(order.indexOf(stage) + 1, order.length - 1)]);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const stageIndex = stage === "idle" ? -1 : ["plan", "edit", "check", "ready"].indexOf(stage);
  const copy = lang === "en"
    ? {
        label: "02 / CODEX BUILD LOOP",
        heading: "Drop it once. Keep building by conversation.",
        body: "After a static site is live, ask Codex to change the real files. You see the plan, file diff, build result, and refreshed preview in one workspace.",
        input: "Tell Codex what to change",
        run: "Run with Codex",
        again: "Try another change",
        ready: "3 files changed · build passed · snapshot saved",
      }
    : {
        label: "02 / ALUR BUILD CODEX",
        heading: "Drop sekali. Lanjut bangun lewat percakapan.",
        body: "Setelah website live, minta Codex mengubah file aslinya. Plan, diff file, hasil build, dan preview terbaru terlihat dalam satu workspace.",
        input: "Tulis perubahan yang kamu mau",
        run: "Jalankan dengan Codex",
        again: "Coba perubahan lain",
        ready: "3 file berubah · build lulus · snapshot tersimpan",
      };

  function run() {
    if (!prompt.trim()) return;
    setStage("plan");
  }

  return (
    <section className="vwc-section vwc-section-tinted" id="agent">
      <SectionLabel>{copy.label}</SectionLabel>
      <div className="codex-loop-grid">
        <div>
          <h2 className="vwc-h2">{copy.heading}</h2>
          <p className="vwc-lead">{copy.body}</p>
          <div className="codex-loop-facts">
            <div><span>OAuth</span><strong>Owner managed</strong></div>
            <div><span>Billing</span><strong>Quoted in K tokens</strong></div>
            <div><span>Preview</span><strong>Live + rollback</strong></div>
          </div>
        </div>

        <div className="codex-loop-demo">
          <div className="codex-loop-topbar">
            <span><i /> project / warung-kopi</span>
            <span>Codex connected</span>
          </div>
          <div className="codex-loop-prompt">
            <label htmlFor="codex-demo-prompt">{copy.input}</label>
            <textarea
              id="codex-demo-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              disabled={stage !== "idle" && stage !== "ready"}
              rows={3}
            />
            <div>
              <span>Estimated 64K–112K tokens</span>
              <button type="button" onClick={run} disabled={stage !== "idle" && stage !== "ready"}>
                {stage === "ready" ? copy.again : copy.run} →
              </button>
            </div>
          </div>

          <div className="codex-loop-events" aria-live="polite">
            {(["plan", "edit", "check", "ready"] as const).map((item, index) => {
              const active = stageIndex === index;
              const done = stageIndex > index || stage === "ready";
              return (
                <div key={item} className={`${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>
                  <span>{done ? "✓" : active ? "•" : String(index + 1).padStart(2, "0")}</span>
                  <div><strong>{STAGES[item].label}</strong><code>{STAGES[item].file}</code></div>
                </div>
              );
            })}
          </div>

          {stage === "ready" && <div className="codex-loop-result">{copy.ready}</div>}
          <div className="codex-loop-suggestions">
            {PROMPTS[lang].map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => { setPrompt(suggestion); setStage("idle"); }}>
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
