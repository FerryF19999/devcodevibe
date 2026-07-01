import { PUBLISHED_ARTICLES } from "../lib/agentCms";
import type { Copy, Lang } from "../lib/copy";
import { SectionLabel } from "./shared";

export function Blog({ t, lang }: { t: Copy; lang: Lang }) {
  const recentArticles = [...PUBLISHED_ARTICLES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <section className="vwc-section" id="blog">
      <SectionLabel>{t.sectionTagline.blog}</SectionLabel>
      <h2 className="vwc-h2">{t.blogH}</h2>
      <ul className="vwc-blog">
        {recentArticles.map((article) => (
          <li key={article.slug} className="vwc-blog-row">
            <span className="vwc-blog-d">{article.date}</span>
            <a href={`/journal/${article.slug}`} className="vwc-blog-t">
              {article.title}
            </a>
            <span className="vwc-blog-r">{article.read}</span>
          </li>
        ))}
      </ul>
      <a href="/journal" className="vwc-link vwc-blog-all">
        {lang === "en" ? "All posts" : "Semua post"} &rarr;
      </a>
    </section>
  );
}
