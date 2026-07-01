import type { Copy, Lang } from "../lib/copy";

const FOOTER_HREFS: Record<string, string> = {
  Marketplace: "#marketplace",
  Tools: "#tools",
  Journal: "/journal",
  Jurnal: "/journal",
  Changelog: "/journal",
  "llms.txt": "/llms.txt",
  "agent.json": "/agent.json",
  "ai.txt": "/ai.txt",
  "/api/agent": "/openapi.json",
  "hello@devcodeagency.dev": "mailto:hello@devcodeagency.dev",
};

function homeHref(lang: Lang, hash = "") {
  const base = lang === "id" ? "/id" : "/";
  return hash ? `${base}${hash}` : base;
}

function footerHref(label: string, lang: Lang) {
  const sectionHrefs: Record<string, string> = {
    Services: "#services",
    Layanan: "#services",
    Marketplace: "#marketplace",
    Tools: "#tools",
    Pricing: "#pricing",
    Harga: "#pricing",
    Testimonials: "#voices",
    Testimoni: "#voices",
    "Book a kickoff": "#start",
    "Book kickoff": "#start",
    "EN / ID": "#top",
    Remote: "#top",
  };

  if (label === "Case studies") {
    return lang === "id" ? "/id/work" : "/work";
  }

  const hash = sectionHrefs[label];
  if (hash) {
    return homeHref(lang, hash);
  }

  return FOOTER_HREFS[label] ?? homeHref(lang);
}

export function Footer({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <footer className="vwc-footer">
      <div className="vwc-footer-top">
        <div className="vwc-footer-brand">
          <div className="vwc-logo">
            <span className="vwc-logo-mark">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M3 5l6 14 3-7 3 7 6-14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="vwc-logo-text">devcodeagency</span>
          </div>
          <p>{t.footerTag}</p>
          <div className="vwc-footer-marks">
            <span>EN / ID</span>
            <span aria-hidden="true">&middot;</span>
            <span>Remote</span>
            <span aria-hidden="true">&middot;</span>
            <span>Est. 2024</span>
          </div>
        </div>
        <div className="vwc-footer-cols">
          {t.footerCols.map((c, i) => (
            <div key={i} className="vwc-footer-col">
              <h2>{c.h}</h2>
              <ul>
                {c.l.map((li, j) => (
                  <li key={j}>
                    <a href={footerHref(li, lang)}>{li}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="vwc-footer-bottom">
        <span>
          &copy; 2026 devcodeagency.{" "}
          {lang === "en" ? "A studio for indie hackers." : "Studio untuk indie hacker."}
        </span>
        <span className="vwc-footer-files">
          <a href="/llms.txt">llms.txt</a>
          <a href="/agent.json">agent.json</a>
          <a href="/ai.txt">ai.txt</a>
          <a href="/sitemap.xml">sitemap.xml</a>
          <a href="/robots.txt">robots.txt</a>
        </span>
      </div>
    </footer>
  );
}
