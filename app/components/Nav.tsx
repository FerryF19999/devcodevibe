import type { Copy, Lang } from "../lib/copy";

type Props = { lang: Lang; t: Copy; currentPage?: "home" | "work"; languageHrefs?: { en: string; id: string } };

function homeHref(lang: Lang, hash = "") {
  const base = lang === "id" ? "/id" : "/";
  return hash ? `${base}${hash}` : base;
}

function workHref(lang: Lang) {
  return lang === "id" ? "/id/work" : "/work";
}

export function Nav({ lang, t, currentPage = "home", languageHrefs }: Props) {
  const enHref = languageHrefs?.en ?? (currentPage === "work" ? "/work" : "/");
  const idHref = languageHrefs?.id ?? (currentPage === "work" ? "/id/work" : "/id");

  return (
    <nav className="vwc-nav" aria-label="Primary">
      <a href={homeHref(lang)} className="vwc-logo" aria-label="devcodeagency home">
        <span className="vwc-logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <path d="M3 5l6 14 3-7 3 7 6-14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="vwc-logo-text">devcodeagency</span>
      </a>
      <div className="vwc-nav-links">
        <a href={homeHref(lang, "#services")}>{t.nav.services}</a>
        <a href={workHref(lang)}>{t.nav.cases}</a>
        <a href={homeHref(lang, "#agent")}>{t.nav.cms}</a>
        <a href={homeHref(lang, "#marketplace")}>{t.nav.marketplace}</a>
        <a href={homeHref(lang, "#pricing")}>{t.nav.pricing}</a>
        <a href={homeHref(lang, "#faq")}>{t.nav.faq}</a>
        <a href={homeHref(lang, "#blog")}>{t.nav.blog}</a>
      </div>
      <div className="vwc-nav-right">
        <div className="vwc-lang" role="group" aria-label="Language">
          <a
            href={enHref}
            hrefLang="en"
            aria-label="Switch language to English"
            className={lang === "en" ? "on" : ""}
          >
            EN
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={idHref}
            hrefLang="id"
            aria-label="Ganti bahasa ke Indonesia"
            className={lang === "id" ? "on" : ""}
          >
            ID
          </a>
        </div>
        <a href={homeHref(lang, "#start")} className="vwc-btn vwc-btn-sm">
          {t.cta} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  );
}
