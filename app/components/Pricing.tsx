import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Pricing({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="vwc-section vwc-section-tinted" id="pricing">
      <SectionLabel>{t.sectionTagline.pricing}</SectionLabel>
      <h2 className="vwc-h2">{t.pricingH}</h2>
      <div className="vwc-pricing-grid">
        {t.pricing.map((p, i) => (
          <article key={i} className={`vwc-tier ${p.featured ? "is-featured" : ""}`}>
            {p.featured && <div className="vwc-tier-flag">{lang === "en" ? "MOST CHOSEN" : "PALING DIPILIH"}</div>}
            <h3 className="vwc-tier-t">{p.t}</h3>
            <div className="vwc-tier-price">
              <span className="vwc-tier-amt">{p.p}</span>
              <span className="vwc-tier-per">{p.per}</span>
            </div>
            <ul className="vwc-tier-list">
              {p.l.map((li, j) => (
                <li key={j}>
                  <span aria-hidden="true">+</span>
                  {li}
                </li>
              ))}
            </ul>
            <a href="#start" className={`vwc-btn ${p.featured ? "vwc-btn-primary" : "vwc-btn-ghost"} vwc-btn-block`}>
              {t.cta} <span aria-hidden="true">â†’</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
