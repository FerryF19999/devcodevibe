import type { Lang } from "../lib/copy";
import { COPY } from "../lib/copy";
import { getWorkCases, workPath } from "../lib/work";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SectionLabel } from "./shared";

export function WorkPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const workCases = getWorkCases(lang);
  const intro =
    lang === "en"
      ? "A compact archive of shipped work: names changed where needed, numbers kept useful, and the product surface shown plainly."
      : "Arsip ringkas pekerjaan yang sudah dikirim: beberapa nama disamarkan, angka tetap berguna, dan surface produk dijelaskan apa adanya.";
  const note =
    lang === "en"
      ? "Need the unredacted version? We share deeper notes after a fit check."
      : "Butuh versi tanpa redaksi? Kami bagikan catatan lebih dalam setelah fit check.";

  return (
    <div className="vwc-app vwc-work-page" lang={lang}>
      <Nav lang={lang} t={t} currentPage="work" />
      <main id="main-content">
        <section className="vwc-section vwc-work-hero">
          <SectionLabel>{t.sectionTagline.cases}</SectionLabel>
          <div className="vwc-work-head">
            <h1 className="vwc-h1">{t.casesH}</h1>
            <p className="vwc-lead">{intro}</p>
          </div>
        </section>

        <section className="vwc-section vwc-work-list" aria-labelledby="work-list-title">
          <h2 id="work-list-title" className="sr-only">
            {t.nav.cases}
          </h2>
          <div className="vwc-cases vwc-cases-detailed">
            {workCases.map((work) => (
              <article key={work.slug} className="vwc-case-row vwc-case-row-detailed">
                <div className="vwc-case-y">&apos;{work.year}</div>
                <div className="vwc-case-main">
                  <h3 className="vwc-case-c">{work.client}</h3>
                  <p>{work.scope}</p>
                </div>
                <div className="vwc-case-d">
                  <strong>{work.summary}</strong>
                  <span>{work.result}</span>
                </div>
                <div className="vwc-case-tag">{work.tag}</div>
                <a href={workPath(lang, work.slug)} className="vwc-case-link" aria-label={`${lang === "en" ? "Open work detail for" : "Buka detail karya"} ${work.client}`}>
                  {"\u2197"}
                </a>
              </article>
            ))}
          </div>
          <div className="vwc-work-note">
            <p>{note}</p>
            <a href={lang === "id" ? "/id#start" : "/#start"} className="vwc-btn vwc-btn-primary">
              {t.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>
      </main>
      <Footer t={t} lang={lang} />
    </div>
  );
}
