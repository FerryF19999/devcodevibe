import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PUBLISHED_ARTICLES, getArticleBySlug } from "../../lib/agentCms";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PUBLISHED_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} | devcodeagency`,
    description: article.metaDescription,
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.metaDescription,
      url: `https://devcodeagency.dev/journal/${article.slug}`,
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "devcodeagency",
    },
    publisher: {
      "@type": "Organization",
      name: "devcodeagency",
      logo: {
        "@type": "ImageObject",
        url: "https://devcodeagency.dev/og.png",
      },
    },
    mainEntityOfPage: `https://devcodeagency.dev/journal/${article.slug}`,
    keywords: article.tags.join(", "),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="vwc-article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="vwc-article">
        <header className="vwc-article-hero">
          <a href="/journal" className="vwc-link">
            ← Journal
          </a>
          <div className="vwc-card-meta">
            <span>{article.date}</span>
            <span>{article.read}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="vwc-cms-tags">
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="vwc-article-body">
          {article.sections.map((section) => (
            <section key={section.h}>
              <h2>{section.h}</h2>
              {section.p.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="vwc-article-faq">
            <h2>FAQ</h2>
            {article.faq.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
