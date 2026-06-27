import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Services({ t }: { t: Copy }) {
  return (
    <section className="vwc-section" id="services">
      <SectionLabel>{t.sectionTagline.services}</SectionLabel>
      <h2 className="vwc-h2">{t.servicesH}</h2>
      <div className="vwc-services-grid">
        {t.services.map((s, i) => (
          <article key={i} className="vwc-service">
            <div className="vwc-service-k">{s.k}</div>
            <h3 className="vwc-service-t">{s.t}</h3>
            <p className="vwc-service-d">{s.d}</p>
            <div className="vwc-service-foot">
              <span className="vwc-service-price">{s.price}</span>
              <a href="#start" className="vwc-arrow" aria-label={`Start a project for ${s.t}`}>
                →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
