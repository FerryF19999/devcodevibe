"use client";

import { useState } from "react";
import type { Copy, Lang } from "../lib/copy";

export function StartStrip({ t, lang }: { t: Copy; lang: Lang }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, lang }),
      });
      const data = (await res.json()) as { nextStep?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "lead failed");
      setStatus(data.nextStep || (lang === "en" ? "Received." : "Diterima."));
      setEmail("");
    } catch {
      setStatus(lang === "en" ? "Please check the email and try again." : "Cek email lalu coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="vwc-start" id="start">
      <div className="vwc-start-inner">
        <div>
          <div className="vwc-sec-label">{lang === "en" ? "GET STARTED" : "MULAI"}</div>
          <h2 className="vwc-h2 vwc-h2-light">
            {lang === "en" ? "A 20-minute call. A real plan. No deck." : "Call 20 menit. Rencana nyata. Tanpa deck."}
          </h2>
        </div>
        <form
          className="vwc-start-form"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === "en" ? "your@email" : "email@kamu"}
            aria-label="email"
            required
          />
          <button type="submit" className="vwc-btn vwc-btn-primary" disabled={busy}>
            {busy ? (lang === "en" ? "Sending" : "Mengirim") : t.cta} <span aria-hidden="true">→</span>
          </button>
          {status && <p className="vwc-start-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
