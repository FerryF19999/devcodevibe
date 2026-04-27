import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Voices({ t }: { t: Copy }) {
  return (
    <section className="vwc-section vwc-section-dark" id="voices">
      <SectionLabel>{t.sectionTagline.voices}</SectionLabel>
      <h2 className="vwc-h2 vwc-h2-light">{t.voicesH}</h2>
      <div className="vwc-voices">
        {t.voices.map((v, i) => (
          <figure key={i} className="vwc-voice">
            <blockquote className="vwc-quote">
              <span aria-hidden="true">&ldquo;</span>
              {v.q}
              <span aria-hidden="true">&rdquo;</span>
            </blockquote>
            <figcaption>{v.a}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
