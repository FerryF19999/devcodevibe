import type { MetadataRoute } from "next";
import { PUBLISHED_ARTICLES } from "./lib/agentCms";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...PUBLISHED_ARTICLES.map((article) => ({
      url: `${SITE_URL}/journal/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: article.slug === "autonomous-ai-agent-cms-for-seo-geo" ? 0.85 : 0.65,
    })),
  ];
}
