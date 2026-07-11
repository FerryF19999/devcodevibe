import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

const CAPABILITIES = [
  { number: "01", title: "Static Drop", description: "Folder atau ZIP divalidasi, dibersihkan, lalu siap diterbitkan.", meta: "0 TOKEN" },
  { number: "02", title: "Live preview", description: "Lihat website di desktop, tablet, dan mobile tanpa reload manual.", meta: "HMR" },
  { number: "03", title: "Codex editor", description: "Prompt menjadi plan, perubahan file, diff, build, dan ringkasan.", meta: "Metered" },
  { number: "04", title: "Version control", description: "Snapshot otomatis, last-known-good preview, dan rollback satu klik.", meta: "Safe" },
];

export function Tools({}: { t: Copy }) {
  return (
    <section className="vwc-section studio-tools" id="tools">
      <SectionLabel>05 / STUDIO CAPABILITIES</SectionLabel>
      <div className="vwc-section-head">
        <h2 className="vwc-h2">Satu tempat dari file mentah sampai website live.</h2>
        <p className="vwc-lead vwc-lead-r">Tooling dipilih untuk alur yang pendek: drop, lihat, ubah, validasi, dan publish.</p>
      </div>
      <div className="studio-tools-grid">
        {CAPABILITIES.map((tool) => (
          <article key={tool.number}>
            <div><span>{tool.number}</span><code>{tool.meta}</code></div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
