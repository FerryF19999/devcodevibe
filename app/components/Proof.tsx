import type { Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

const PROOF = {
  en: {
    label: "04 / CLIENT SIGNAL",
    h: "Teams use us when speed and search both matter.",
    sub: "The work stays anonymized, but the pattern is consistent: sharper web surfaces, cleaner technical SEO, faster pages, and content that agents can understand.",
    stats: [
      { value: "100", label: "technical health score reached" },
      { value: "A", label: "GTmetrix grade after speed work" },
      { value: "384+", label: "qualified leads tracked" },
      { value: "150+", label: "monthly bookings influenced" },
    ],
    sectors: ["Software teams", "Bali travel", "Canggu clinics", "Workspace operators", "Local commerce", "AI-search content"],
    cta: "Book a free consultation",
  },
  id: {
    label: "04 / SINYAL KLIEN",
    h: "Tim datang saat speed dan search sama-sama penting.",
    sub: "Nama brand tetap diredaksi, tapi polanya konsisten: permukaan web lebih tajam, technical SEO lebih bersih, halaman lebih cepat, dan konten yang bisa dipahami agent.",
    stats: [
      { value: "100", label: "technical health score tercapai" },
      { value: "A", label: "GTmetrix grade setelah optimasi" },
      { value: "384+", label: "qualified leads terlacak" },
      { value: "150+", label: "booking bulanan terpengaruh" },
    ],
    sectors: ["Software team", "Travel Bali", "Klinik Canggu", "Operator workspace", "Commerce lokal", "Konten AI Search"],
    cta: "Konsultasi gratis",
  },
} satisfies Record<
  Lang,
  {
    label: string;
    h: string;
    sub: string;
    stats: { value: string; label: string }[];
    sectors: string[];
    cta: string;
  }
>;

export function Proof({ lang }: { lang: Lang }) {
  const copy = PROOF[lang];

  return (
    <section className="vwc-section vwc-proof" id="proof">
      <div className="vwc-proof-head">
        <div>
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 className="vwc-h2">{copy.h}</h2>
        </div>
        <p className="vwc-lead">{copy.sub}</p>
      </div>

      <dl className="vwc-proof-stats">
        {copy.stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.value}</dt>
            <dd>{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="vwc-proof-strip" aria-label={lang === "en" ? "Client categories" : "Kategori klien"}>
        {copy.sectors.map((sector) => (
          <span key={sector}>{sector}</span>
        ))}
      </div>

      <a href="#start" className="vwc-btn vwc-btn-primary vwc-proof-cta">
        {copy.cta} <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  );
}
