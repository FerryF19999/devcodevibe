import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Cases({ t }: { t: Copy }) {
  return (
    <section className="vwc-section" id="cases">
      <SectionLabel>{t.sectionTagline.cases}</SectionLabel>
      <h2 className="vwc-h2">{t.casesH}</h2>
      <div className="vwc-cases">
        {t.cases.map((c, i) => (
          <article key={i} className="vwc-case-row">
            <div className="vwc-case-y">&apos;{c.y}</div>
            <div className="vwc-case-c">{c.c}</div>
            <div className="vwc-case-d">{c.d}</div>
            <div className="vwc-case-tag">{c.tag}</div>
            <a
              href={c.href}
              className="vwc-case-link"
              aria-label={`Read ${c.c}`}
              target="_blank"
              rel="noreferrer"
            >
              ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
