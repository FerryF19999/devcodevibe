import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

const STARTERS = [
  { code: "LAND/01", title: "Product launch", description: "Hero, benefits, social proof, pricing, FAQ, dan CTA.", tag: "CONVERSION", tone: "lime" },
  { code: "PORT/02", title: "Creative portfolio", description: "Selected work, project detail, about, dan contact flow.", tag: "EDITORIAL", tone: "ink" },
  { code: "UMKM/03", title: "Local business", description: "Menu atau layanan, lokasi, WhatsApp CTA, dan jam buka.", tag: "BAHASA", tone: "sand" },
  { code: "SAAS/04", title: "SaaS waitlist", description: "Feature story, use cases, email capture, dan changelog.", tag: "STARTUP", tone: "blue" },
  { code: "EVNT/05", title: "Event page", description: "Agenda, speaker, venue, sponsor, dan registration CTA.", tag: "FAST", tone: "orange" },
  { code: "DOCS/06", title: "Documentation", description: "Navigation, search-ready structure, examples, dan API sections.", tag: "TECHNICAL", tone: "gray" },
];

export function Marketplace({ lang }: { t: Copy; lang: Lang }) {
  const id = lang === "id";
  return (
    <section className="vwc-section" id="marketplace">
      <SectionLabel>{id ? "03 / STARTER WEBSITE" : "03 / WEBSITE STARTERS"}</SectionLabel>
      <div className="vwc-section-head">
        <h2 className="vwc-h2">{id ? "Mulai dari struktur yang sudah punya arah." : "Start from a structure with a point of view."}</h2>
        <p className="vwc-lead vwc-lead-r">
          {id
            ? "Pilih starter, ubah dengan Codex, lalu publish. Semua starter static-first, responsive, dan bisa diekspor."
            : "Choose a starter, reshape it with Codex, then publish. Every starter is static-first, responsive, and exportable."}
        </p>
      </div>
      <div className="starter-grid">
        {STARTERS.map((starter, index) => (
          <article key={starter.code} className={`starter-card starter-${starter.tone}`}>
            <div className="starter-preview" aria-hidden="true">
              <div className="starter-preview-nav"><span /><span /></div>
              <div className="starter-preview-copy"><i /><i /><i /></div>
              <div className="starter-preview-art">{String(index + 1).padStart(2, "0")}</div>
            </div>
            <div className="starter-card-body">
              <div><code>{starter.code}</code><span>{starter.tag}</span></div>
              <h3>{starter.title}</h3>
              <p>{starter.description}</p>
              <a href="#start">{id ? "Pakai starter" : "Use starter"} →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
