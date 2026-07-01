import type { Lang } from "../lib/copy";
import { COPY } from "../lib/copy";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SectionLabel } from "./shared";

const WORK_DETAILS = {
  en: [
    {
      scope: "MVP build, Stripe, lifecycle email, analytics, agent endpoint",
      result: "Launched the first paid journaling workflow and converted the founder's audience into recurring revenue.",
    },
    {
      scope: "Bahasa-first catalog, WhatsApp checkout, QRIS handoff, inventory ops",
      result: "Gave growers a lighter commerce surface without forcing them into a heavy marketplace stack.",
    },
    {
      scope: "Agent SDK, project memory, weekly digest, team permissions",
      result: "Moved planning out of scattered docs into an agent-readable workspace for active product teams.",
    },
    {
      scope: "Remote ergonomics tracker, async nudges, calm reporting",
      result: "Turned a three-sprint experiment into a durable internal wellness tool.",
    },
  ],
  id: [
    {
      scope: "MVP, Stripe, email lifecycle, analytics, endpoint agent",
      result: "Meluncurkan workflow journaling berbayar pertama dan mengubah audiens founder menjadi revenue berulang.",
    },
    {
      scope: "Katalog Bahasa-first, WhatsApp checkout, handoff QRIS, inventory ops",
      result: "Memberi petani surface commerce yang ringan tanpa memaksa mereka masuk stack marketplace berat.",
    },
    {
      scope: "Agent SDK, project memory, digest mingguan, izin tim",
      result: "Memindahkan planning dari dokumen terpencar ke workspace yang mudah dibaca agent.",
    },
    {
      scope: "Tracker ergonomi remote, nudges async, reporting tenang",
      result: "Mengubah eksperimen tiga sprint menjadi tool wellness internal yang tahan dipakai.",
    },
  ],
} satisfies Record<Lang, { scope: string; result: string }[]>;

export function WorkPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const details = WORK_DETAILS[lang];
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
            {t.cases.map((work, index) => (
              <article key={work.c} className="vwc-case-row vwc-case-row-detailed">
                <div className="vwc-case-y">&apos;{work.y}</div>
                <div className="vwc-case-main">
                  <h3 className="vwc-case-c">{work.c}</h3>
                  <p>{details[index].scope}</p>
                </div>
                <div className="vwc-case-d">
                  <strong>{work.d}</strong>
                  <span>{details[index].result}</span>
                </div>
                <div className="vwc-case-tag">{work.tag}</div>
                <a href="/journal" className="vwc-case-link" aria-label={`${lang === "en" ? "Read notes for" : "Baca catatan untuk"} ${work.c}`}>
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
