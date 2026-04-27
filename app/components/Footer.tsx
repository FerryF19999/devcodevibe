import type { Copy, Lang } from "../lib/copy";

const FOOTER_HREFS: Record<string, string> = {
  Services: "#services",
  Layanan: "#services",
  Marketplace: "#marketplace",
  Tools: "#tools",
  Pricing: "#pricing",
  Harga: "#pricing",
  "Case studies": "#cases",
  Testimonials: "#voices",
  Testimoni: "#voices",
  Journal: "/journal",
  Jurnal: "/journal",
  Changelog: "/journal",
  "llms.txt": "/llms.txt",
  "agent.json": "/agent.json",
  "ai.txt": "/ai.txt",
  "/api/agent": "/openapi.json",
  "hello@devcodeagency.dev": "mailto:hello@devcodeagency.dev",
  "Book a kickoff": "#start",
  "Book kickoff": "#start",
  "EN / ID": "#top",
  Remote: "#top",
};

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
            <span aria-hidden="true">·</span>
            <span>Remote</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2024</span>
          </div>
        </div>
        <div className="vwc-footer-cols">
          {t.footerCols.map((c, i) => (
            <div key={i} className="vwc-footer-col">
              <h4>{c.h}</h4>
              <ul>
                {c.l.map((li, j) => (
                  <li key={j}>
                    <a href={FOOTER_HREFS[li] ?? "#top"}>{li}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="vwc-footer-bottom">
        <span>
          © 2026 devcodeagency.{" "}
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
