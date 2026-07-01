import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Cases({ t }: { t: Copy }) {
  return (
    <section className="vwc-section" id="cases">
      <SectionLabel>{t.sectionTagline.cases}</SectionLabel>
      <h2 className="vwc-h2">{t.casesH}</h2>
      <div className="vwc-cases">
        {t.cases.map((c) => (
          <article key={c.c} className="vwc-case-row">
            <div className="vwc-case-y">&apos;{c.y}</div>
            <div className="vwc-case-c">{c.c}</div>
            <div className="vwc-case-d">{c.d}</div>
            <div className="vwc-case-tag">{c.tag}</div>
            <a href="/journal" className="vwc-case-link" aria-label={`Read ${c.c}`}>
              {"\u2197"}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
