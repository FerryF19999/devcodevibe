"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "../lib/copy";
import {
  PUBLISHED_ARTICLES,
  VERIFIED_AGENT,
  createFallbackCmsResult,
  type AgentCmsMode,
  type AgentCmsResult,
} from "../lib/agentCms";
import { SectionLabel } from "./shared";

type SavedDraft = AgentCmsResult & { savedAt: string };

const STORAGE_KEY = "vwc-agent-cms-drafts";

const MODE_LABELS: Record<AgentCmsMode, { en: string; id: string }> = {
  article: { en: "Article", id: "Artikel" },
  seo: { en: "SEO audit", id: "Audit SEO" },
  geo: { en: "GEO pack", id: "Paket GEO" },
  conversion: { en: "Conversion", id: "Konversi" },
  weekly: { en: "Weekly run", id: "Run mingguan" },
};

export function AgentCMS({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const defaults = useMemo(
    () => ({
      mode: "weekly" as AgentCmsMode,
      topic: isId ? "AI Agent CMS untuk SEO dan GEO autonomous" : "AI Agent CMS for autonomous SEO and GEO",
      audience: isId ? "founder indie yang mau website jalan dengan agent" : "indie founders who want agent-run growth",
      offer: isId ? "CMS agent terverifikasi untuk artikel, SEO, GEO, dan conversion" : "verified agent CMS for content, SEO, GEO, and conversion",
      keyword: isId ? "AI Agent CMS" : "AI Agent CMS",
      intent: isId ? "mencari solusi growth autonomous" : "evaluating autonomous growth systems",
    }),
    [isId],
  );

  const [mode, setMode] = useState<AgentCmsMode>(defaults.mode);
  const [topic, setTopic] = useState(defaults.topic);
  const [audience, setAudience] = useState(defaults.audience);
  const [offer, setOffer] = useState(defaults.offer);
  const [keyword, setKeyword] = useState(defaults.keyword);
  const [intent, setIntent] = useState(defaults.intent);
  const [agentToken, setAgentToken] = useState("");
  const [result, setResult] = useState<AgentCmsResult>(() => createFallbackCmsResult({ lang, ...defaults }));
  const [savedDrafts, setSavedDrafts] = useState<SavedDraft[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setMode(defaults.mode);
    setTopic(defaults.topic);
    setAudience(defaults.audience);
    setOffer(defaults.offer);
    setKeyword(defaults.keyword);
    setIntent(defaults.intent);
    setResult(createFallbackCmsResult({ lang, ...defaults }));
  }, [defaults, lang]);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]") as SavedDraft[];
      setSavedDrafts(stored.slice(0, 5));
    } catch {
      setSavedDrafts([]);
    }
  }, []);

  async function runAgent(nextMode = mode) {
    setBusy(true);
    setStatus(isId ? "Agent sedang menyiapkan draft..." : "Agent is preparing the draft...");
    try {
      const res = await fetch("/api/agent/cms", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(agentToken ? { "x-agent-token": agentToken } : {}),
        },
        body: JSON.stringify({
          agentId: VERIFIED_AGENT.id,
          mode: nextMode,
          lang,
          topic,
          audience,
          offer,
          keyword,
          intent,
        }),
      });
      if (!res.ok) throw new Error(`cms ${res.status}`);
      const data = (await res.json()) as AgentCmsResult;
      setResult(data);
      setStatus(isId ? "Draft siap review." : "Draft ready for review.");
    } catch {
      const fallback = createFallbackCmsResult({ mode: nextMode, lang, topic, audience, offer, keyword, intent });
      setResult(fallback);
      setStatus(isId ? "Mode demo aktif. Draft fallback siap review." : "Demo mode active. Fallback draft ready for review.");
    } finally {
      setBusy(false);
    }
  }

  function saveDraft() {
    if (!result) return;
    const draft: SavedDraft = { ...result, savedAt: new Date().toISOString() };
    const next = [draft, ...savedDrafts].slice(0, 5);
    setSavedDrafts(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    setStatus(isId ? "Draft tersimpan di CMS lokal." : "Draft saved to local CMS.");
  }

  const L = {
    label: isId ? "03 / AI AGENT CMS" : "03 / AI AGENT CMS",
    h: isId ? "Satu agent terverifikasi untuk SEO, GEO, artikel, dan konversi." : "One verified agent for SEO, GEO, articles, and conversion.",
    sub: isId
      ? "Agent membuat draft, schema, answer block, internal link, dan rekomendasi design. Manusia tetap review sebelum publish."
      : "The agent prepares drafts, schema, answer blocks, internal links, and design recommendations. Humans review before publishing.",
    run: isId ? "Jalankan agent" : "Run agent",
    weekly: isId ? "Run autonomous" : "Autonomous run",
    save: isId ? "Simpan draft" : "Save draft",
    verified: isId ? "Terverifikasi" : "Verified",
    liveRoutes: isId ? "Artikel live" : "Live articles",
    draftQueue: isId ? "Draft tersimpan" : "Saved drafts",
    emptyQueue: isId ? "Belum ada draft tersimpan." : "No saved drafts yet.",
  };

  return (
    <section className="vwc-section vwc-cms" id="agent-cms">
      <div className="vwc-cms-head">
        <div>
          <SectionLabel>{L.label}</SectionLabel>
          <h2 className="vwc-h2">{L.h}</h2>
          <p className="vwc-lead">{L.sub}</p>
        </div>
        <div className="vwc-agent-card" aria-label="Verified AI agent">
          <div className="vwc-agent-card-top">
            <span className="vwc-agent-avatar">AI</span>
            <span className="vwc-agent-verified">{L.verified}</span>
          </div>
          <strong>{VERIFIED_AGENT.name}</strong>
          <code>{VERIFIED_AGENT.id}</code>
          <span>{VERIFIED_AGENT.role}</span>
        </div>
      </div>

      <div className="vwc-cms-grid">
        <form
          className="vwc-cms-controls"
          onSubmit={(e) => {
            e.preventDefault();
            runAgent();
          }}
        >
          <div className="vwc-cms-field">
            <span>{isId ? "Mode" : "Mode"}</span>
            <div className="vwc-segments">
              {(Object.keys(MODE_LABELS) as AgentCmsMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={mode === item ? "on" : ""}
                  onClick={() => setMode(item)}
                >
                  {MODE_LABELS[item][lang]}
                </button>
              ))}
            </div>
          </div>
          <label className="vwc-cms-field">
            <span>{isId ? "Topik" : "Topic"}</span>
            <textarea value={topic} onChange={(e) => setTopic(e.target.value)} rows={3} />
          </label>
          <label className="vwc-cms-field">
            <span>{isId ? "Audiens" : "Audience"}</span>
            <input value={audience} onChange={(e) => setAudience(e.target.value)} />
          </label>
          <label className="vwc-cms-field">
            <span>{isId ? "Offer" : "Offer"}</span>
            <input value={offer} onChange={(e) => setOffer(e.target.value)} />
          </label>
          <div className="vwc-cms-inline">
            <label className="vwc-cms-field">
              <span>{isId ? "Keyword utama" : "Primary keyword"}</span>
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </label>
            <label className="vwc-cms-field">
              <span>{isId ? "Intent" : "Intent"}</span>
              <input value={intent} onChange={(e) => setIntent(e.target.value)} />
            </label>
          </div>
          <label className="vwc-cms-field">
            <span>{isId ? "Agent token opsional" : "Optional agent token"}</span>
            <input
              value={agentToken}
              onChange={(e) => setAgentToken(e.target.value)}
              type="password"
              autoComplete="off"
              placeholder="AGENT_CMS_TOKEN"
            />
          </label>
          <div className="vwc-cms-actions">
            <button className="vwc-btn vwc-btn-primary" type="submit" disabled={busy}>
              {busy ? (isId ? "Menjalankan..." : "Running...") : L.run}
            </button>
            <button
              className="vwc-btn vwc-btn-ghost"
              type="button"
              disabled={busy}
              onClick={() => {
                setMode("weekly");
                runAgent("weekly");
              }}
            >
              {L.weekly}
            </button>
            <button className="vwc-btn vwc-btn-ghost" type="button" onClick={saveDraft} disabled={!result || busy}>
              {L.save}
            </button>
          </div>
          {status && <div className="vwc-cms-status">{status}</div>}
        </form>

        <div className="vwc-cms-output" aria-live="polite">
          {result && (
            <>
              <article className="vwc-cms-preview">
                <div className="vwc-card-meta">
                  <span>{result.mode.toUpperCase()}</span>
                  <span>{result.article.readingTime}</span>
                </div>
                <h3>{result.article.title}</h3>
                <p>{result.article.excerpt}</p>
                <div className="vwc-cms-tags">
                  {result.article.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>

              <div className="vwc-cms-panels">
                <Artifact title="SEO" items={[result.seo.titleTag, result.seo.metaDescription, ...result.seo.technicalFixes]} />
                <Artifact title="GEO" items={[result.geo.llmsSummary, ...result.geo.entityFacts]} />
                <Artifact title={isId ? "Konversi" : "Conversion"} items={[result.conversion.heroRewrite, result.conversion.offerFrame, ...result.conversion.designFixes]} />
              </div>

              <div className="vwc-cms-work">
                <h3>{isId ? "Queue agent" : "Agent queue"}</h3>
                {result.tasks.map((task, i) => (
                  <div key={`${task.title}-${i}`} className="vwc-cms-task">
                    <span>{task.priority}</span>
                    <strong>{task.title}</strong>
                    <code>{task.owner}</code>
                  </div>
                ))}
              </div>

              <details className="vwc-json-preview">
                <summary>JSON-LD</summary>
                <pre>{JSON.stringify(result.jsonLd, null, 2)}</pre>
              </details>
            </>
          )}
        </div>
      </div>

      <div className="vwc-cms-bottom">
        <div>
          <h3>{L.liveRoutes}</h3>
          <div className="vwc-route-list">
            {PUBLISHED_ARTICLES.slice(0, 4).map((article) => (
              <a key={article.slug} href={`/journal/${article.slug}`}>
                <span>{article.title}</span>
                <code>/{article.slug}</code>
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3>{L.draftQueue}</h3>
          <div className="vwc-draft-list">
            {savedDrafts.length === 0 && <p>{L.emptyQueue}</p>}
            {savedDrafts.map((draft) => (
              <button key={`${draft.article.slug}-${draft.savedAt}`} type="button" onClick={() => setResult(draft)}>
                <span>{draft.article.title}</span>
                <code>{new Date(draft.savedAt).toLocaleString()}</code>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Artifact({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="vwc-cms-artifact">
      <h3>{title}</h3>
      <ul>
        {items.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
