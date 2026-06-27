"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Copy, Lang } from "../lib/copy";
import { agentComplete } from "../lib/agent";
import { capture } from "../lib/analytics";
import { Hairline } from "./shared";

const HERO_EXAMPLES: Record<Lang, string[]> = {
  en: [
    "calm journaling app for closed-tab people",
    "UMKM commerce site with WhatsApp checkout",
    "agent-first project manager, dark mode",
    "voice-search optimized landing for a law firm",
  ],
  id: [
    "app jurnal calm-tech buat yang suka nutup tab",
    "site commerce UMKM dengan checkout WhatsApp",
    "project manager agent-first, dark mode",
    "landing page kantor hukum yang voice-search friendly",
  ],
};

type Spec = {
  name: string;
  headline: string;
  sub: string;
  cta: string;
  accent: string;
  surface: string;
  ink: string;
  features: string[];
  sections: string[];
};

const DEFAULT_SPEC: Spec = {
  name: "Quietnote",
  headline: "A quieter way to think.",
  sub: "Journaling for people who close their tabs.",
  cta: "Start journaling",
  accent: "#D4F26A",
  surface: "#FAFAF7",
  ink: "#1A1A17",
  features: ["Offline first", "End-to-end encrypted", "Markdown + tags"],
  sections: ["Hero", "Features", "Pricing", "FAQ"],
};

type Phase = "idle" | "streaming" | "ready" | "error";

export function Hero({ t, lang }: { t: Copy; lang: Lang }) {
  const [input, setInput] = useState(HERO_EXAMPLES[lang][0]);
  const [phase, setPhase] = useState<Phase>("ready");
  const [streamed, setStreamed] = useState(() => specToCode(DEFAULT_SPEC));
  const [spec, setSpec] = useState<Spec>(DEFAULT_SPEC);
  const [activePrompt, setActivePrompt] = useState(HERO_EXAMPLES[lang][0]);
  const streamTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const promptId = useId();
  const promptHintId = useId();

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current);
    };
  }, []);

  async function generate(p?: string) {
    const prompt = (p ?? input).trim();
    if (!prompt || phase === "streaming") return;
    setActivePrompt(prompt);
    setPhase("streaming");
    setStreamed("");
    try {
      const sys =
        lang === "en"
          ? `You design landing pages. Return ONLY valid minified JSON with these keys: {"name": string (product name, 1-2 words), "headline": string (max 7 words, editorial tone), "sub": string (max 14 words), "cta": string (2-4 words), "accent": string (hex like "#D4F26A"), "surface": string (warm off-white hex), "ink": string (near-black hex), "features": string[] (exactly 3, 2-4 words each), "sections": string[] (4 labels like "Hero","Features","Pricing","FAQ")}. No prose, no code fence, no comments. Prompt: ${prompt}`
          : `Kamu desainer landing page. Return HANYA JSON valid minified dengan key: {"name": string (nama produk, 1-2 kata), "headline": string (max 7 kata, tone editorial), "sub": string (max 14 kata), "cta": string (2-4 kata), "accent": string (hex seperti "#D4F26A"), "surface": string (hex off-white hangat), "ink": string (hex near-black), "features": string[] (tepat 3, 2-4 kata), "sections": string[] (4 label)}. Tanpa prosa, tanpa code fence, tanpa komentar. Prompt: ${prompt}`;
      const text = await agentComplete(sys);
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Partial<Spec>;
      const next = { ...DEFAULT_SPEC, ...parsed };
      setSpec(next);
      const code = specToCode(next);
      streamCode(code, setStreamed, streamTimer, () => setPhase("ready"));
    } catch {
      setPhase("error");
      setTimeout(() => setPhase("ready"), 1400);
    }
  }

  const exs = HERO_EXAMPLES[lang];

  return (
    <header className="vwc-hero" id="top">
      <div className="vwc-hero-grid">
        <div className="vwc-hero-left">
          <div className="vwc-badge">
            <span className="vwc-badge-dot" /> {t.badge}
          </div>
          <h1 className="vwc-h1">
            <span className="vwc-h1-a">{t.h1a}</span>
            <span className="vwc-h1-b">{t.h1b}</span>
          </h1>
          <p className="vwc-sub">{t.sub}</p>

          <form
            className="vwc-prompt-box"
            toolname="generate_landing_page_preview"
            tooldescription="Generates an agent-ready landing page preview from a product or website prompt."
            onSubmit={(e) => {
              e.preventDefault();
              capture("cta_clicked", { element: "hero_prompt_submit", label: input.slice(0, 40), lang });
              generate();
            }}
          >
            <div className="vwc-prompt-head">
              <label className="vwc-prompt-tag" htmlFor={promptId}>
                prompt
              </label>
              <span className="vwc-prompt-hint" id={promptHintId}>
                {lang === "en" ? "describe a site, watch it build" : "deskripsikan site, lihat dibangun"}
              </span>
            </div>
            <textarea
              id={promptId}
              name="prompt"
              toolparamdescription="A short description of the product, business, or website the user wants to generate."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generate();
                }
              }}
              rows={2}
              placeholder={lang === "en" ? "build a landing page for…" : "buat landing page untuk…"}
              aria-describedby={promptHintId}
            />
            <div className="vwc-prompt-foot">
              <div className="vwc-prompt-chips">
                {exs.slice(0, 3).map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      capture("cta_clicked", { element: "hero_example_chip", label: ex, lang });
                      setInput(ex);
                      generate(ex);
                    }}
                    disabled={phase === "streaming"}
                  >
                    {ex}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="vwc-btn vwc-btn-primary vwc-prompt-submit"
                disabled={phase === "streaming"}
              >
                {phase === "streaming" ? (lang === "en" ? "Building…" : "Membangun…") : t.cta}{" "}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>

          <dl className="vwc-stats">
            <div>
              <dt>47</dt>
              <dd>{lang === "en" ? "shipped MVPs" : "MVP dirilis"}</dd>
            </div>
            <div>
              <dt>9d</dt>
              <dd>{lang === "en" ? "median ship" : "median rilis"}</dd>
            </div>
            <div>
              <dt>92%</dt>
              <dd>{lang === "en" ? "second project" : "proyek kedua"}</dd>
            </div>
            <div>
              <dt>12.4k</dt>
              <dd>{lang === "en" ? "downloads" : "unduhan"}</dd>
            </div>
          </dl>
        </div>

        <div className="vwc-hero-right">
          <div className="vwc-codepanel">
            <div className="vwc-codepanel-bar">
              <span className="vwc-cb-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="vwc-cb-title">
                // site.tsx / {activePrompt.slice(0, 38)}
                {activePrompt.length > 38 ? "…" : ""}
              </span>
              <span className={`vwc-cb-status ${phase === "streaming" ? "on" : ""}`}>
                <span className="vwc-pulse" /> {phase === "streaming" ? "STREAM" : phase === "error" ? "RETRY" : "READY"}
              </span>
            </div>
            <div className="vwc-codepanel-body">
              <pre className="vwc-code">
                <code>
                  <CodeStream text={streamed} />
                  {phase === "streaming" && <span className="vwc-caret">▍</span>}
                </code>
              </pre>
              <div
                className="vwc-preview-strip"
                aria-hidden="true"
                style={{
                  opacity: phase === "ready" || phase === "error" ? 1 : 0.4,
                  transition: "opacity .3s",
                }}
              >
                <div className="vwc-preview-head">
                  <span>preview · localhost:3000</span>
                  <span className="vwc-preview-meta">JSON-LD ✓ · llms.txt ✓ · agent.json ✓</span>
                </div>
                <LivePreview spec={spec} />
              </div>
            </div>
          </div>
          <div className="vwc-hero-meta">
            <span>
              //{" "}
              {lang === "en"
                ? "every site we ship is readable by humans AND agents"
                : "tiap site yang kami rilis bisa dibaca manusia DAN agent"}
            </span>
          </div>
        </div>
      </div>
      <Hairline />
    </header>
  );
}

function specToCode(s: Spec) {
  const feat = s.features.map((f) => `    "${f}"`).join(",\n");
  return `export default function Page() {
  return (
    <main style={{ background: "${s.surface}", color: "${s.ink}" }}>
      <Hero
        title="${s.headline}"
        sub="${s.sub}"
        cta="${s.cta}"
        accent="${s.accent}"
      />
      <FeatureGrid items={[
${feat}
      ]} />
      <Pricing /> <FAQ schema />
      <AgentEndpoint path="/api/agent" />
    </main>
  );
}`;
}

function streamCode(
  code: string,
  setStreamed: (s: string) => void,
  timerRef: { current: ReturnType<typeof setInterval> | null },
  onDone?: () => void,
) {
  if (timerRef.current) clearInterval(timerRef.current);
  let i = 0;
  setStreamed("");
  timerRef.current = setInterval(() => {
    i += 4;
    setStreamed(code.slice(0, i));
    if (i >= code.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      onDone?.();
    }
  }, 14);
}

function LivePreview({ spec }: { spec: Spec }) {
  const S = {
    wrap: { background: spec.surface, color: spec.ink, padding: "14px 14px 14px", fontFamily: "var(--sans)" },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      paddingBottom: "10px",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      marginBottom: "14px",
    },
    brand: { fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em" },
    links: { display: "flex", gap: "10px", fontSize: "9px", color: "rgba(26,26,23,0.82)" },
    chip: {
      background: spec.accent,
      color: spec.ink,
      fontFamily: "var(--sans)",
      fontSize: "9px",
      padding: "3px 8px",
      borderRadius: "999px",
      fontWeight: 500,
      whiteSpace: "nowrap" as const,
    },
    hero: { padding: "6px 0 14px" },
    h1: {
      fontFamily: "var(--serif)",
      fontSize: "22px",
      lineHeight: 1.05,
      letterSpacing: "-0.01em",
      textWrap: "balance" as const,
      margin: "0 0 6px",
    },
    sub: { fontSize: "10.5px", opacity: 0.7, margin: "0 0 10px", lineHeight: 1.4 },
    cta: {
      display: "inline-block",
      background: spec.accent,
      color: spec.ink,
      padding: "5px 10px",
      borderRadius: "999px",
      fontSize: "10px",
      fontWeight: 500,
      fontFamily: "var(--sans)",
    },
    feats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
      paddingTop: "10px",
      borderTop: "1px solid rgba(0,0,0,0.06)",
    },
    feat: { display: "flex", alignItems: "center", gap: "6px", fontSize: "9.5px", opacity: 0.8 },
    dot: { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0, background: spec.accent },
  };
  return (
    <div style={S.wrap}>
      <div style={S.nav}>
        <span style={S.brand}>{spec.name || "Brand"}</span>
        <span style={S.links}>
          {(spec.sections || []).slice(0, 4).map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </span>
        <span style={S.chip}>{spec.cta}</span>
      </div>
      <div style={S.hero}>
        <div style={S.h1}>{spec.headline}</div>
        <div style={S.sub}>{spec.sub}</div>
        <div style={S.cta}>{spec.cta} →</div>
      </div>
      <div style={S.feats}>
        {(spec.features || []).slice(0, 3).map((f, i) => (
          <div key={i} style={S.feat}>
            <span style={S.dot} />
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeStream({ text }: { text: string }) {
  const parts = text.split(
    /(\bexport\b|\bdefault\b|\bfunction\b|\breturn\b|\bclassName\b|\/\*[^*]*\*\/|"[^"]*"|<\/?[A-Za-z][^>\s/]*|\/>|\{|\})/g,
  );
  return (
    <>
      {parts.map((p, i) => {
        let cls = "";
        if (/^(export|default|function|return)$/.test(p)) cls = "tk-kw";
        else if (p === "className") cls = "tk-attr";
        else if (/^"/.test(p)) cls = "tk-str";
        else if (/^<\/?/.test(p) || p === "/>") cls = "tk-tag";
        else if (/^\/\*/.test(p)) cls = "tk-cmt";
        else if (p === "{" || p === "}") cls = "tk-brc";
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        );
      })}
    </>
  );
}
