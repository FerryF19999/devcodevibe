import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function FAQ({ t }: { t: Copy }) {
  return (
    <section className="vwc-section vwc-section-tinted" id="faq">
      <SectionLabel>{t.sectionTagline.faq}</SectionLabel>
      <h2 className="vwc-h2">{t.faqH}</h2>
      <div className="vwc-faq">
        {t.faq.map((f, i) => (
          <details key={i} open={i === 0} className="vwc-faq-item">
            <summary>
              <span className="vwc-faq-q">{f.q}</span>
              <span className="vwc-faq-mark" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="vwc-faq-a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
