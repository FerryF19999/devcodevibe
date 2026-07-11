"use client";

import { useState } from "react";
import type { Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

const MODES = [
  {
    id: "quick",
    number: "01",
    title: "Quick build",
    description: "Perubahan fokus dengan context minimum. Cocok untuk copy, section kecil, dan perbaikan cepat.",
    budget: "Token rendah",
    output: "Scoped diff",
    accent: "quick",
  },
  {
    id: "design",
    number: "02",
    title: "Design quality",
    description: "Hallmark policy, design brief, tokens, responsive pass, dan visual audit dalam satu turn.",
    budget: "Token terestimasi",
    output: "Design-led build",
    accent: "design",
  },
  {
    id: "redesign",
    number: "03",
    title: "Full redesign",
    description: "Susun ulang visual hierarchy sambil mempertahankan konten, route, dan tujuan website.",
    budget: "Quote dahulu",
    output: "New direction",
    accent: "redesign",
  },
  {
    id: "audit",
    number: "04",
    title: "Read-only audit",
    description: "Cek responsive, contrast, overflow, konsistensi token, dan content integrity tanpa mengubah file.",
    budget: "Tanpa edit",
    output: "Findings report",
    accent: "audit",
  },
];

export function AgentMarketplace({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState("design");
  const active = MODES.find((mode) => mode.id === selected) ?? MODES[1];
  const id = lang === "id";

  return (
    <section className="vwc-section vwc-section-dark build-modes" id="agents-market">
      <SectionLabel>{id ? "04 / MODE BUILD" : "04 / BUILD MODES"}</SectionLabel>
      <div className="build-modes-head">
        <h2 className="vwc-h2 vwc-h2-light">{id ? "Pilih cara Codex mengerjakan website." : "Choose how Codex works on the site."}</h2>
        <p>
          {id
            ? "Bukan marketplace agent. Ini policy yang dikurasi platform supaya scope, kualitas, dan pemakaian kredit terlihat sebelum turn dimulai."
            : "Not an agent marketplace. These are platform-curated policies so scope, quality, and credit usage are visible before a turn starts."}
        </p>
      </div>

      <div className="build-mode-layout">
        <div className="build-mode-list" role="tablist" aria-label="Codex build modes">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={selected === mode.id}
              className={selected === mode.id ? "is-selected" : ""}
              onClick={() => setSelected(mode.id)}
            >
              <span>{mode.number}</span>
              <strong>{mode.title}</strong>
              <i>↗</i>
            </button>
          ))}
        </div>

        <div className={`build-mode-detail mode-${active.accent}`} role="tabpanel">
          <div className="build-mode-detail-top">
            <span>ACTIVE PROFILE</span>
            <code>policy/{active.id}@pinned</code>
          </div>
          <div className="build-mode-symbol" aria-hidden="true">{active.number}</div>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <dl>
            <div><dt>Budget</dt><dd>{active.budget}</dd></div>
            <div><dt>Output</dt><dd>{active.output}</dd></div>
            <div><dt>Credential</dt><dd>Platform managed</dd></div>
          </dl>
          <a href="#start">{id ? "Gunakan mode ini" : "Use this mode"} →</a>
        </div>
      </div>
    </section>
  );
}
