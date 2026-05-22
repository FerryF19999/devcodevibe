"use client";

import { useEffect, useRef, useState } from "react";
import type { Copy, Lang } from "../lib/copy";
import { agentComplete } from "../lib/agent";
import { SectionLabel } from "./shared";

type Msg = { role: "user" | "agent"; text: string };

export function AgentDemo({ t, lang }: { t: Copy; lang: Lang }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "agent",
      text:
        lang === "en"
          ? "Hi, I'm the devcodeagency assistant. Ask anything: pricing, timelines, template recs, or have me draft a brief. I can also book a kickoff."
          : "Hai, saya asisten devcodeagency. Tanya apa saja: harga, timeline, rekomendasi template, atau minta draft brief. Bisa juga booking kickoff.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    const sys =
      lang === "en"
        ? "You are the devcodeagency assistant. Studio offers: Starter Sprint $1,400 (1 week), Full MVP $4,800 (2-3 weeks), Async Retainer $3,200/mo. Templates: Quietkit $89, Warungkit $69, Agentpost $49, Pocketboard $129, Schemaforge $29, Voicepage $59. Median ship 9 days. Bilingual EN/ID. Be concise (under 90 words), warm, specific. End with one helpful next step."
        : "Kamu adalah asisten devcodeagency. Studio: Starter Sprint $1,400 (1 minggu), Full MVP $4,800 (2-3 minggu), Async Retainer $3,200/bln. Template: Quietkit $89, Warungkit $69, Agentpost $49, Pocketboard $129, Schemaforge $29, Voicepage $59. Median rilis 9 hari. Dwibahasa. Singkat (di bawah 90 kata), hangat, spesifik. Akhiri dengan satu langkah berikutnya.";
    try {
      const reply = await agentComplete(`${sys}\n\nUser: ${q}`);
      setMessages((m) => [...m, { role: "agent", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "agent",
          text:
            lang === "en"
              ? "I couldn't reach the model just now. Email hello@devcodeagency.dev and we'll respond in hours."
              : "Tidak bisa menghubungi model. Email hello@devcodeagency.dev, kami balas dalam jam.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="vwc-section vwc-section-tinted" id="agent">
      <SectionLabel>{t.sectionTagline.agent}</SectionLabel>
      <div className="vwc-agent-grid">
        <div className="vwc-agent-left">
          <h2 className="vwc-h2">{t.agentH}</h2>
          <p className="vwc-lead">{t.agentSub}</p>
          <div className="vwc-agent-meta">
            <div className="vwc-meta-row">
              <span>endpoint</span>
              <code>POST /api/agent</code>
            </div>
            <div className="vwc-meta-row">
              <span>auth</span>
              <code>Bearer or anonymous</code>
            </div>
            <div className="vwc-meta-row">
              <span>spec</span>
              <code>/openapi.json</code>
            </div>
            <div className="vwc-meta-row">
              <span>latency</span>
              <code>~640ms p50</code>
            </div>
          </div>
        </div>
        <div className="vwc-agent-right">
          <div className="vwc-chat">
            <div className="vwc-chat-bar">
              <span className="vwc-chat-dot" /> assistant.devcodeagency · {lang.toUpperCase()}
              <span className="vwc-chat-bar-r">claude-haiku</span>
            </div>
            <div className="vwc-chat-body" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`vwc-msg vwc-msg-${m.role}`}>
                  <div className="vwc-msg-tag">
                    {m.role === "user" ? (lang === "en" ? "you" : "kamu") : "assistant"}
                  </div>
                  <div className="vwc-msg-text">{m.text}</div>
                </div>
              ))}
              {busy && (
                <div className="vwc-msg vwc-msg-agent">
                  <div className="vwc-msg-tag">assistant</div>
                  <div className="vwc-msg-text vwc-typing">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}
            </div>
            <div className="vwc-chat-suggest">
              {t.agentSuggest.map((s, i) => (
                <button key={i} onClick={() => send(s)} disabled={busy}>
                  {s}
                </button>
              ))}
            </div>
            <form
              className="vwc-chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === "en" ? "Ask anything…" : "Tanya apa saja…"}
                aria-label="Message the assistant"
              />
              <button type="submit" disabled={busy} aria-label="Send">
                →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
