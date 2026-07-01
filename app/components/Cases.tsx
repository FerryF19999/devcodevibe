import type { Copy, Lang } from "../lib/copy";
import { getWorkCases, workPath } from "../lib/work";
import { SectionLabel } from "./shared";

export function Cases({ lang, t }: { lang: Lang; t: Copy }) {
  const workCases = getWorkCases(lang);

  return (
    <section className="vwc-section" id="cases">
      <SectionLabel>{t.sectionTagline.cases}</SectionLabel>
      <h2 className="vwc-h2">{t.casesH}</h2>
      <div className="vwc-cases">
        {workCases.map((work) => (
          <article key={work.slug} className="vwc-case-row">
            <div className="vwc-case-y">&apos;{work.year}</div>
            <div className="vwc-case-c">{work.client}</div>
            <div className="vwc-case-d">{work.summary}</div>
            <div className="vwc-case-tag">{work.tag}</div>
            <a href={workPath(lang, work.slug)} className="vwc-case-link" aria-label={`${lang === "en" ? "Open work detail for" : "Buka detail karya"} ${work.client}`}>
              {"\u2197"}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
