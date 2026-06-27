import type { Copy, Lang } from "../lib/copy";

type Props = { lang: Lang; t: Copy };

export function Nav({ lang, t }: Props) {
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
        <a href="#services">{t.nav.services}</a>
        <a href="#marketplace">{t.nav.marketplace}</a>
        <a href="#tools">{t.nav.tools}</a>
        <a href="#pricing">{t.nav.pricing}</a>
        <a href="#cases">{t.nav.cases}</a>
        <a href="#faq">{t.nav.faq}</a>
        <a href="#blog">{t.nav.blog}</a>
      </div>
      <div className="vwc-nav-right">
        <div className="vwc-lang" role="group" aria-label="Language">
          <a
            href="/?lang=en"
            hrefLang="en"
            aria-current={lang === "en" ? "true" : undefined}
            aria-label="Switch language to English"
            className={lang === "en" ? "on" : ""}
          >
            EN
          </a>
          <span aria-hidden="true">/</span>
          <a
            href="/?lang=id"
            hrefLang="id"
            aria-current={lang === "id" ? "true" : undefined}
            aria-label="Ganti bahasa ke Indonesia"
            className={lang === "id" ? "on" : ""}
          >
            ID
          </a>
        </div>
        <a href="#start" className="vwc-btn vwc-btn-sm">
          {t.cta} <span aria-hidden="true">â†’</span>
        </a>
      </div>
    </nav>
  );
}
