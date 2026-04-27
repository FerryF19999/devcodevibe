import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

export function LlmsCallout({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="vwc-section" id="agents">
      <SectionLabel>{t.sectionTagline.llms}</SectionLabel>
      <div className="vwc-llms-grid">
        <div className="vwc-llms-left">
          <h2 className="vwc-h2">{t.llmsH}</h2>
          <p className="vwc-lead">{t.llmsSub}</p>
          <div className="vwc-llms-cta">
            <a href="/llms.txt" className="vwc-btn vwc-btn-ghost">
              {lang === "en" ? "Open llms.txt" : "Buka llms.txt"}
            </a>
            <a href="/agent.json" className="vwc-btn vwc-btn-ghost">
              {lang === "en" ? "Open agent.json" : "Buka agent.json"}
            </a>
          </div>
        </div>
        <div className="vwc-llms-right">
          <div className="vwc-files">
            {t.llmsFiles.map((f, i) => (
              <a key={i} href={f.f} className="vwc-file">
                <code className="vwc-file-name">{f.f}</code>
                <span className="vwc-file-d">{f.d}</span>
                <span className="vwc-file-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
