import { useEffect, useRef } from "react";
import type { Copy, Lang } from "../lib/copy";
import { capture } from "../lib/analytics";
import { SectionLabel } from "./shared";

export function Pricing({ t, lang }: { t: Copy; lang: Lang }) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let fired = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          capture("pricing_viewed", { lang });
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lang]);

  return (
    <section ref={ref} className="vwc-section vwc-section-tinted" id="pricing">
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
            <a href="#start" className={`vwc-btn ${p.featured ? "vwc-btn-primary" : "vwc-btn-ghost"} vwc-btn-block`} onClick={() => capture("cta_clicked", { element: "pricing_tier", label: p.t, href: "#start", lang })}>
              {t.cta} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
