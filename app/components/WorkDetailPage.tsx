import type { Lang } from "../lib/copy";
import { COPY } from "../lib/copy";
import type { WorkCase } from "../lib/work";
import { workPath } from "../lib/work";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SectionLabel } from "./shared";

function workIndexPath(lang: Lang) {
  return lang === "id" ? "/id/work" : "/work";
}

export function WorkDetailPage({ lang, work }: { lang: Lang; work: WorkCase }) {
  const t = COPY[lang];
  const backLabel = lang === "en" ? "All selected work" : "Semua karya";
  const challengeLabel = lang === "en" ? "Challenge" : "Tantangan";
  const approachLabel = lang === "en" ? "Approach" : "Pendekatan";
  const outcomeLabel = lang === "en" ? "Outcome" : "Hasil";
  const stackLabel = lang === "en" ? "Stack" : "Stack";
  const nextLabel = lang === "en" ? "Start a similar build" : "Mulai build serupa";

  return (
    <div className="vwc-app vwc-work-page" lang={lang}>
      <Nav
        lang={lang}
        t={t}
        currentPage="work"
        languageHrefs={{ en: workPath("en", work.slug), id: workPath("id", work.slug) }}
      />
      <main id="main-content">
        <section className="vwc-section vwc-work-detail-hero">
          <a href={workIndexPath(lang)} className="vwc-work-back">
            <span aria-hidden="true">&larr;</span> {backLabel}
          </a>
          <SectionLabel>
            &apos;{work.year} / {work.tag}
          </SectionLabel>
          <div className="vwc-work-detail-head">
            <div>
              <h1 className="vwc-h1">{work.client}</h1>
              <p className="vwc-work-detail-summary">{work.summary}</p>
            </div>
            <div className="vwc-work-detail-meta">
              <div>
                <span>{lang === "en" ? "Role" : "Peran"}</span>
                <strong>{work.role}</strong>
              </div>
              <div>
                <span>{lang === "en" ? "Timeline" : "Timeline"}</span>
                <strong>{work.timeline}</strong>
              </div>
            </div>
          </div>
          <dl className="vwc-work-metrics">
            {work.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="vwc-section vwc-work-detail-body">
          <article className="vwc-work-narrative">
            <div className="vwc-work-block">
              <h2>{challengeLabel}</h2>
              <p>{work.challenge}</p>
            </div>
            <div className="vwc-work-block">
              <h2>{approachLabel}</h2>
              <ol>
                {work.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
            <div className="vwc-work-block">
              <h2>{outcomeLabel}</h2>
              <ol>
                {work.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </article>

          <aside className="vwc-work-sidebar" aria-label={stackLabel}>
            <h2>{stackLabel}</h2>
            <ul>
              {work.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={lang === "id" ? "/id#start" : "/#start"} className="vwc-btn vwc-btn-primary">
              {nextLabel} <span aria-hidden="true">&rarr;</span>
            </a>
          </aside>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </div>
  );
}

export function detailLanguageAlternates(slug: string) {
  return {
    en: workPath("en", slug),
    id: workPath("id", slug),
    "x-default": workPath("en", slug),
  };
}
