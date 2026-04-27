import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Marketplace({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="vwc-section" id="marketplace">
      <SectionLabel>{t.sectionTagline.market}</SectionLabel>
      <div className="vwc-section-head">
        <h2 className="vwc-h2">{t.marketH}</h2>
        <p className="vwc-lead vwc-lead-r">{t.marketSub}</p>
      </div>
      <div className="vwc-market-grid">
        {t.market.map((m, i) => (
          <article key={m.sku} className="vwc-card">
            <div className="vwc-card-vis" aria-hidden="true">
              <Placeholder seed={i} />
              <span className="vwc-card-tag">{m.tag}</span>
            </div>
            <div className="vwc-card-body">
              <div className="vwc-card-meta">
                <span className="vwc-card-sku">{m.sku}</span>
                <span className="vwc-card-price">{m.price}</span>
              </div>
              <h3 className="vwc-card-t">{m.t}</h3>
              <p className="vwc-card-d">{m.d}</p>
              <div className="vwc-card-foot">
                <a href="#start" className="vwc-link">
                  {lang === "en" ? "View" : "Lihat"} →
                </a>
                <code className="vwc-card-api">POST /api/agent/checkout</code>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Placeholder({ seed }: { seed: number }) {
  const patterns = [
    { bg: "#ECE9DF", stripe: "#D4CFC0" },
    { bg: "#E5E2D6", stripe: "#C9C2AB" },
    { bg: "#EDE7D4", stripe: "#D2C9A8" },
    { bg: "#E8E5DA", stripe: "#CFCAB8" },
    { bg: "#EAE6D8", stripe: "#CFC8AE" },
    { bg: "#E6E2D2", stripe: "#CCC4A6" },
  ];
  const p = patterns[seed % patterns.length];
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="none" width="100%" height="100%">
      <rect width="320" height="180" fill={p.bg} />
      <g stroke={p.stripe} strokeWidth="1">
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={i} x1={i * 10} y1="0" x2={i * 10 - 60} y2="180" />
        ))}
      </g>
      <text
        x="160"
        y="96"
        textAnchor="middle"
        fontFamily="ui-monospace, JetBrains Mono, monospace"
        fontSize="10"
        fill="#7c7864"
        letterSpacing="2"
      >
        PRODUCT  COVER
      </text>
    </svg>
  );
}
