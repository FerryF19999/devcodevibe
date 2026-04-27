import type { Metadata } from "next";
import { PUBLISHED_ARTICLES } from "../lib/agentCms";

export const metadata: Metadata = {
  title: "Journal | devcodeagency",
  description: "AI-agent-native notes on SEO, GEO, vibe coding, agent CMS, and indie SaaS shipping.",
  alternates: {
    canonical: "/journal",
  },
};

export default function JournalPage() {
  return (
    <main className="vwc-article-shell">
      <section className="vwc-article-hero">
        <a href="/" className="vwc-link">
          ← devcodeagency
        </a>
        <h1>Journal</h1>
        <p>Notes on agent-native websites, autonomous SEO/GEO, and shipping small SaaS with taste.</p>
      </section>

      <section className="vwc-journal-list" aria-label="Journal posts">
        {PUBLISHED_ARTICLES.map((article) => (
          <article key={article.slug} className="vwc-journal-card">
            <div className="vwc-card-meta">
              <span>{article.date}</span>
              <span>{article.read}</span>
            </div>
            <h2>
              <a href={`/journal/${article.slug}`}>{article.title}</a>
            </h2>
            <p>{article.excerpt}</p>
            <div className="vwc-cms-tags">
              {article.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
