import type { MetadataRoute } from "next";
import { PUBLISHED_ARTICLES } from "./lib/agentCms";
import { SITE_URL } from "./lib/site";
import { getWorkCases } from "./lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const workPages = [
    ...getWorkCases("en").map((work) => ({
      url: `${SITE_URL}/work/${work.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
    ...getWorkCases("id").map((work) => ({
      url: `${SITE_URL}/id/work/${work.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    })),
  ];

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/id`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/id/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...workPages,
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
