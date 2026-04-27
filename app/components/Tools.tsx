import type { Copy } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Tools({ t }: { t: Copy }) {
  return (
    <section className="vwc-section" id="tools">
      <SectionLabel>{t.sectionTagline.tools}</SectionLabel>
      <h2 className="vwc-h2">{t.toolsH}</h2>
      <div className="vwc-tools-grid">
        {t.tools.map((tool, i) => (
          <div key={i} className="vwc-tool">
            <div className="vwc-tool-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                {i === 0 && <path d="M4 7h16M4 12h10M4 17h16" stroke="currentColor" strokeWidth="1.6" />}
                {i === 1 && (
                  <path d="M5 5h14v14H5z M5 9h14 M9 5v14" stroke="currentColor" strokeWidth="1.6" fill="none" />
                )}
                {i === 2 && (
                  <path
                    d="M3 12l5-5 5 5-5 5z M13 12l5-5 5 5-5 5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    fill="none"
                  />
                )}
              </svg>
            </div>
            <div className="vwc-tool-body">
              <div className="vwc-tool-head">
                <h3>{tool.t}</h3>
                <span>{tool.price}</span>
              </div>
              <p>{tool.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
