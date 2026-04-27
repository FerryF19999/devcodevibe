import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Blog({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="vwc-section" id="blog">
      <SectionLabel>{t.sectionTagline.blog}</SectionLabel>
      <h2 className="vwc-h2">{t.blogH}</h2>
      <ul className="vwc-blog">
        {t.blog.map((b, i) => (
          <li key={i} className="vwc-blog-row">
            <span className="vwc-blog-d">{b.d}</span>
            <a href={`/journal/${b.slug}`} className="vwc-blog-t">
              {b.t}
            </a>
            <span className="vwc-blog-r">{b.read}</span>
          </li>
        ))}
      </ul>
      <a href="/journal" className="vwc-link vwc-blog-all">
        {lang === "en" ? "All posts" : "Semua post"} →
      </a>
    </section>
  );
}
