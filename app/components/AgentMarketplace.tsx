"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../lib/copy";
import { agentComplete } from "../lib/agent";
import { SectionLabel } from "./shared";

type Seller = {
  id: string;
  handle: string;
  name: string;
  avatar: string;
  spec: string;
  rate: string;
  rating: number;
  jobs: number;
  online: boolean;
  tags: string[];
  owner: string;
};

const AGENT_SELLERS: Seller[] = [
  { id: "agt_01", handle: "@rania.dev", name: "Rania", avatar: "R", spec: "Bahasa-first SaaS", rate: "$1,200 / sprint", rating: 4.9, jobs: 38, online: true, tags: ["Next.js", "Stripe", "WhatsApp"], owner: "Rania P., Jakarta" },
  { id: "agt_02", handle: "@bagas.build", name: "Bagas", avatar: "B", spec: "UMKM commerce", rate: "$900 / sprint", rating: 5.0, jobs: 24, online: true, tags: ["QRIS", "Expo", "Drizzle"], owner: "Bagas, Bandung" },
  { id: "agt_03", handle: "@devon.codes", name: "Devon", avatar: "D", spec: "Agent-first tooling", rate: "$1,800 / sprint", rating: 4.8, jobs: 51, online: false, tags: ["tRPC", "Claude SDK", "LangGraph"], owner: "Devon L., Remote" },
  { id: "agt_04", handle: "@maya.ships", name: "Maya", avatar: "M", spec: "Calm-tech landing", rate: "$700 / page", rating: 5.0, jobs: 19, online: true, tags: ["Astro", "GEO", "JSON-LD"], owner: "Maya R., Bali" },
  { id: "agt_05", handle: "@indra.api", name: "Indra", avatar: "I", spec: "Agent SDKs", rate: "$2,400 / mo", rating: 4.7, jobs: 12, online: true, tags: ["OpenAPI", "Webhooks", "Auth"], owner: "Indra S., Surabaya" },
  { id: "agt_06", handle: "@sari.saas", name: "Sari", avatar: "S", spec: "Mobile MVPs", rate: "$1,500 / sprint", rating: 4.9, jobs: 29, online: false, tags: ["Expo", "Supabase", "Revenuecat"], owner: "Sari A., Yogya" },
];

type Notif = {
  id: number;
  seller: Seller;
  msg: string;
  kind: "ambient" | "owner";
  webhook?: string;
  t: Date;
};

type LogEntry = { role: "buyer" | "agent"; text: string; seller?: string };

export function AgentMarketplace({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState<Seller | null>(null);
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [showInbox, setShowInbox] = useState(false);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [busy, setBusy] = useState(false);

  function pushNotif(n: Omit<Notif, "id" | "t">) {
    setNotifs((xs) => [{ ...n, id: Date.now() + Math.random(), t: new Date() }, ...xs].slice(0, 8));
  }

  useEffect(() => {
    const msgs =
      lang === "en"
        ? [
            "New inquiry: landing page in 5 days",
            "Quote requested: $1.2k budget",
            "Agent-to-agent: template clarification",
            "Kickoff scheduled for Tuesday",
            "Refund question (closed in 2m)",
          ]
        : [
            "Inquiry baru: landing 5 hari",
            "Minta quote: budget $1.2k",
            "Agent-ke-agent: klarifikasi template",
            "Kickoff dijadwalkan Selasa",
            "Tanya refund (selesai 2 mnt)",
          ];
    const id = setInterval(() => {
      const s = AGENT_SELLERS[Math.floor(Math.random() * AGENT_SELLERS.length)];
      pushNotif({ seller: s, msg: msgs[Math.floor(Math.random() * msgs.length)], kind: "ambient" });
    }, 7000);
    return () => clearInterval(id);
  }, [lang]);

  async function contactAgent(seller: Seller, question?: string) {
    const q = (question ?? msg).trim();
    if (!q || busy) return;
    setLog((l) => [...l, { role: "buyer", text: q }]);
    setMsg("");
    setBusy(true);

    pushNotif({
      seller,
      msg: (lang === "en" ? "Incoming buyer via agent → " : "Buyer baru via agent → ") + q.slice(0, 48) + (q.length > 48 ? "…" : ""),
      kind: "owner",
      webhook: `POST https://api.devcodeagency.dev/webhooks/${seller.id}`,
    });

    try {
      const sys =
        lang === "en"
          ? `You are ${seller.name}'s admin AI agent on devcodeagency marketplace. You represent a seller offering "${seller.spec}" at ${seller.rate}. Stack: ${seller.tags.join(", ")}. You respond to buyer inquiries concisely (under 70 words), warm, specific. Mention that the owner (${seller.owner}) has been notified and will confirm. End with one clear next step. Buyer: ${q}`
          : `Kamu admin AI agent ${seller.name} di marketplace devcodeagency. Kamu wakili seller yang tawarkan "${seller.spec}" seharga ${seller.rate}. Stack: ${seller.tags.join(", ")}. Balas inquiry buyer ringkas (di bawah 70 kata), hangat, spesifik. Sebutkan owner (${seller.owner}) sudah dapat notifikasi dan akan konfirmasi. Akhiri dengan satu langkah berikutnya. Buyer: ${q}`;
      const text = await agentComplete(sys);
      setLog((l) => [...l, { role: "agent", text, seller: seller.name }]);
    } catch {
      setLog((l) => [
        ...l,
        {
          role: "agent",
          text:
            lang === "en"
              ? `${seller.name}'s agent is offline. Owner notified via webhook, will respond within an hour.`
              : `Agent ${seller.name} offline. Owner sudah dinotif via webhook, balas dalam 1 jam.`,
          seller: seller.name,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const L = {
    label: "05 / AGENT MARKETPLACE",
    h: lang === "en" ? "Every agent is a seller. Every contact pings a human." : "Tiap agent jadi seller. Tiap kontak ping ke manusia.",
    sub:
      lang === "en"
        ? "Indie hackers list their AI agent on the marketplace. When a buyer (or buyer's agent) messages it, the admin agent replies instantly AND a webhook fires to the owner's phone. No missed leads. No ghosted quotes."
        : "Indie hacker listing AI agent-nya di marketplace. Saat buyer (atau agent buyer) kirim pesan, admin agent balas instant DAN webhook langsung ke HP owner. Nggak ada lead kelewat. Nggak ada quote di-ghost.",
    inbox: lang === "en" ? "Owner inbox" : "Inbox owner",
    live: lang === "en" ? "live · webhooks active" : "live · webhook aktif",
    contact: lang === "en" ? "Contact agent" : "Hubungi agent",
    placeholder: lang === "en" ? "Ask anything: pricing, scope, timeline…" : "Tanya apa saja: harga, scope, timeline…",
    suggest:
      lang === "en"
        ? ["What can you ship in 5 days?", "Can I pay in IDR?", "Do you do agent integrations?"]
        : ["Bisa rilis apa dalam 5 hari?", "Bisa bayar pakai IDR?", "Terima integrasi agent?"],
    ownerNotif: lang === "en" ? "Owner notified" : "Owner dinotif",
    ambientNotif: lang === "en" ? "Ambient activity" : "Aktivitas ambient",
    jobs: lang === "en" ? "jobs" : "proyek",
    listYours: lang === "en" ? "List your agent →" : "Daftarkan agent kamu →",
  };

  return (
    <section className="vwc-section" id="agents-market">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
        <div style={{ flex: "1 1 480px", minWidth: 0 }}>
          <SectionLabel>{L.label}</SectionLabel>
          <h2 className="vwc-h2" style={{ margin: 0 }}>{L.h}</h2>
          <p className="vwc-lead" style={{ marginTop: 20 }}>{L.sub}</p>
        </div>
        <button
          onClick={() => setShowInbox(true)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            border: "1px solid var(--line-strong)",
            borderRadius: 999,
            background: "var(--bg)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: notifs.length ? "var(--accent)" : "var(--line-strong)",
              boxShadow: notifs.length ? "0 0 10px var(--accent)" : "none",
              animation: notifs.length ? "vwc-pulse 1.6s ease-in-out infinite" : "none",
            }}
          />
          {L.inbox} <span style={{ color: "var(--fg-mute)" }}>· {notifs.length}</span>
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {AGENT_SELLERS.map((s) => (
          <article
            key={s.id}
            style={{
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: 18,
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              transition: "border-color .15s, transform .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--fg)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  position: "relative",
                }}
              >
                {s.avatar}
                <span
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: s.online ? "var(--accent)" : "var(--line-strong)",
                    border: "2px solid var(--bg)",
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{s.name}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-mute)" }}>{s.handle}</div>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-mute)" }}>★ {s.rating}</div>
            </div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1.2 }}>{s.spec}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {s.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    padding: "2px 7px",
                    background: "var(--bg-tint)",
                    borderRadius: 4,
                    color: "var(--fg-soft)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 10,
                borderTop: "1px solid var(--line)",
                marginTop: "auto",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg)" }}>{s.rate}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg-mute)" }}>
                  {s.jobs} {L.jobs}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelected(s);
                  setLog([]);
                }}
                style={{
                  padding: "8px 14px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                {L.contact} →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--fg-mute)" }}>
          {lang === "en"
            ? "All contacts are double-routed: agent replies instantly, owner gets a webhook ping."
            : "Semua kontak di-route ganda: agent balas instant, owner dapat ping webhook."}
        </div>
        <a href="#start" className="vwc-link">
          {L.listYours}
        </a>
      </div>

      {selected && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,20,18,0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: "var(--bg)",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              maxHeight: "88vh",
              overflow: "hidden",
              boxShadow: "0 40px 120px -20px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--serif)",
                  fontSize: 16,
                }}
              >
                {selected.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>
                  {selected.name} <span style={{ color: "var(--fg-mute)", fontWeight: 400 }}>· {selected.handle}</span>
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--fg-mute)" }}>
                  <span style={{ color: selected.online ? "oklch(0.65 0.15 145)" : "var(--fg-mute)" }}>●</span>{" "}
                  {selected.online
                    ? lang === "en"
                      ? "online · agent answers"
                      : "online · agent balas"
                    : lang === "en"
                    ? "offline · webhook only"
                    : "offline · webhook saja"}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: "none", border: "none", fontSize: 20, color: "var(--fg-mute)", cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                padding: "14px 20px",
                background: "var(--bg-tint)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--fg-soft)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span style={{ color: "var(--accent-ink)", background: "var(--accent)", padding: "2px 6px", borderRadius: 3, fontWeight: 500 }}>
                WEBHOOK
              </span>{" "}
              POST /webhooks/{selected.id} → {selected.owner}
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 200,
              }}
            >
              {log.length === 0 && (
                <div style={{ color: "var(--fg-mute)", fontSize: 14, textAlign: "center", padding: "20px 0" }}>
                  {lang === "en"
                    ? `Ask ${selected.name}'s agent anything. ${selected.owner} will be notified.`
                    : `Tanya apa saja ke agent ${selected.name}. ${selected.owner} akan dinotif.`}
                </div>
              )}
              {log.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: m.role === "buyer" ? "flex-end" : "flex-start",
                    gap: 4,
                  }}
                >
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg-mute)" }}>
                    {m.role === "buyer" ? (lang === "en" ? "you" : "kamu") : `${m.seller} · agent`}
                  </div>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      fontSize: 14,
                      lineHeight: 1.5,
                      maxWidth: "88%",
                      background: m.role === "buyer" ? "var(--fg)" : "var(--bg-tint)",
                      color: m.role === "buyer" ? "var(--bg)" : "var(--fg)",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--fg-mute)", fontFamily: "var(--mono)", fontSize: 11 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "vwc-pulse 1s infinite" }} />
                  {selected.name}&apos;s agent {lang === "en" ? "typing…" : "mengetik…"}
                </div>
              )}
            </div>

            <div style={{ padding: "8px 20px", borderTop: "1px solid var(--line)", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {L.suggest.map((s, i) => (
                <button
                  key={i}
                  onClick={() => contactAgent(selected, s)}
                  disabled={busy}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    padding: "5px 10px",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    background: "transparent",
                    color: "var(--fg-soft)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              toolname="contact_template_seller_agent"
              tooldescription="Sends a message to a template seller's agent about purchasing, setup, or implementation help."
              onSubmit={(e) => {
                e.preventDefault();
                contactAgent(selected);
              }}
              style={{ display: "flex", gap: 8, padding: "12px 20px 18px", borderTop: "1px solid var(--line)" }}
            >
              <input
                name="message"
                toolparamdescription="The message or question to send to the selected template seller agent."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={L.placeholder}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  fontSize: 14,
                  fontFamily: "var(--sans)",
                  background: "var(--bg)",
                }}
              />
              <button
                type="submit"
                disabled={busy}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  border: "none",
                  cursor: busy ? "not-allowed" : "pointer",
                  fontSize: 18,
                  opacity: busy ? 0.5 : 1,
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </form>
          </div>
        </div>
      )}

      {showInbox && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowInbox(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,20,18,0.4)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              height: "100%",
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{L.inbox}</div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--fg-mute)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 2,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
                  {L.live}
                </div>
              </div>
              <button
                onClick={() => setShowInbox(false)}
                style={{ background: "none", border: "none", fontSize: 22, color: "var(--fg-mute)", cursor: "pointer" }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
              {notifs.length === 0 && (
                <div style={{ padding: 40, textAlign: "center", color: "var(--fg-mute)", fontSize: 14 }}>
                  {lang === "en" ? "Waiting for activity…" : "Menunggu aktivitas…"}
                </div>
              )}
              {notifs.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "14px 20px",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--fg)",
                      color: "var(--bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--serif)",
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {n.seller.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{n.seller.name}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg-mute)" }}>
                        {n.kind === "owner" ? (
                          <span style={{ color: "var(--accent-ink)", background: "var(--accent)", padding: "1px 5px", borderRadius: 3 }}>
                            {L.ownerNotif}
                          </span>
                        ) : (
                          L.ambientNotif
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--fg-soft)", marginTop: 2, lineHeight: 1.4 }}>{n.msg}</div>
                    {n.webhook && (
                      <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg-mute)", marginTop: 6 }}>{n.webhook}</div>
                    )}
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--fg-mute)", marginTop: 4 }}>
                      {n.t.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
