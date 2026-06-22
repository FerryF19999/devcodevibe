"use client";

import { capture } from "../lib/analytics";
import type { Copy, Lang } from "../lib/copy";

type Props = { lang: Lang; setLang: (l: Lang) => void; t: Copy };

export function Nav({ lang, setLang, t }: Props) {
  return (
    <nav className="vwc-nav" aria-label="Primary">
      <a href="#top" className="vwc-logo" aria-label="devcodeagency home">
        <span className="vwc-logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M3 5l6 14 3-7 3 7 6-14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="vwc-logo-text">devcodeagency</span>
      </a>
      <div className="vwc-nav-links">
        <a href="#services" onClick={() => capture("cta_clicked", { element: "nav", label: "Services", href: "#services", lang })}>{t.nav.services}</a>
        <a href="#marketplace" onClick={() => capture("cta_clicked", { element: "nav", label: "Marketplace", href: "#marketplace", lang })}>{t.nav.marketplace}</a>
        <a href="#tools" onClick={() => capture("cta_clicked", { element: "nav", label: "Tools", href: "#tools", lang })}>{t.nav.tools}</a>
        <a href="#pricing" onClick={() => capture("cta_clicked", { element: "nav", label: "Pricing", href: "#pricing", lang })}>{t.nav.pricing}</a>
        <a href="#cases" onClick={() => capture("cta_clicked", { element: "nav", label: "Cases", href: "#cases", lang })}>{t.nav.cases}</a>
        <a href="#faq" onClick={() => capture("cta_clicked", { element: "nav", label: "FAQ", href: "#faq", lang })}>{t.nav.faq}</a>
        <a href="#blog" onClick={() => capture("cta_clicked", { element: "nav", label: "Blog", href: "#blog", lang })}>{t.nav.blog}</a>
      </div>
      <div className="vwc-nav-right">
        <div className="vwc-lang" role="group" aria-label="Language">
          <button onClick={() => { capture("language_switched", { from: lang, to: "en" }); setLang("en"); }} aria-pressed={lang === "en"} className={lang === "en" ? "on" : ""}>
            EN
          </button>
          <span aria-hidden="true">/</span>
          <button onClick={() => { capture("language_switched", { from: lang, to: "id" }); setLang("id"); }} aria-pressed={lang === "id"} className={lang === "id" ? "on" : ""}>
            ID
          </button>
        </div>
        <a href="#start" className="vwc-btn vwc-btn-sm" onClick={() => capture("cta_clicked", { element: "nav", label: "Start", href: "#start", lang })}>
          {t.cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
