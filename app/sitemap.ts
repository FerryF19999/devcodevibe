import type { MetadataRoute } from "next";
import { PUBLISHED_ARTICLES } from "./lib/agentCms";

const BASE_URL = "https://devcodeagency.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...PUBLISHED_ARTICLES.map((article) => ({
      url: `${BASE_URL}/journal/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: article.slug === "autonomous-ai-agent-cms-for-seo-geo" ? 0.85 : 0.65,
    })),
  ];
}
