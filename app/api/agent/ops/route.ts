import { NextResponse } from "next/server";
import { PUBLISHED_ARTICLES, VERIFIED_AGENT } from "../../../lib/agentCms";

export const runtime = "nodejs";

const BASE_URL = "https://devcodeagency.dev";

export async function GET() {
  const latestArticle = PUBLISHED_ARTICLES[0];

  return NextResponse.json({
    status: "ready",
    agent: VERIFIED_AGENT,
    tokenConfigured: Boolean(process.env.AGENT_CMS_TOKEN),
    routes: {
      publicSite: "/",
      hiddenDashboard: "/agent-cms",
      hiddenDashboardRobots: "noindex,nofollow",
      hiddenDashboardCrawlRule: "Disallow: /agent-cms",
      cmsRun: "/api/agent/cms",
      publish: "/api/agent/publish",
      openApi: "/openapi.json",
      sitemap: "/sitemap.xml",
      llms: "/llms.txt",
      openclawManifest: "/.well-known/openclaw.json",
    },
    seo: {
      articleCount: PUBLISHED_ARTICLES.length,
      latestArticle: latestArticle
        ? {
            title: latestArticle.title,
            slug: latestArticle.slug,
            url: `${BASE_URL}/journal/${latestArticle.slug}`,
            date: latestArticle.date,
          }
        : null,
      indexedCollections: ["/journal"],
      noindexRoutes: ["/agent-cms"],
      requiredChecks: [
        "Keep sitemap in sync with journal URLs",
        "Keep title tags under 60 characters where possible",
        "Keep visible claims aligned with llms.txt and schema",
      ],
    },
    geo: {
      discoveryFiles: ["/llms.txt", "/agent.json", "/ai.txt", "/openapi.json", "/.well-known/openclaw.json"],
      schemaTypes: ["Organization", "ProfessionalService", "FAQPage", "ItemList", "WebSite", "Article"],
      answerEnginePolicy: "allow-with-attribution",
    },
    openclaw: {
      agentId: VERIFIED_AGENT.id,
      runExample: {
        method: "POST",
        path: "/api/agent/cms",
        headers: {
          "content-type": "application/json",
          "x-agent-token": "<AGENT_CMS_TOKEN when configured>",
        },
        body: {
          agentId: VERIFIED_AGENT.id,
          mode: "weekly",
          lang: "id",
          topic: "SEO GEO autonomous untuk devcodeagency",
          keyword: "AI Agent CMS",
          audience: "founder indie",
          offer: "AI agent CMS untuk artikel, SEO, GEO, dan conversion",
          intent: "commercial investigation",
        },
      },
      publishExample: {
        method: "POST",
        path: "/api/agent/publish",
        headers: {
          "content-type": "application/json",
          "x-agent-token": "<AGENT_CMS_TOKEN>",
        },
        body: {
          agentId: VERIFIED_AGENT.id,
          draft: "AgentCmsResult returned from /api/agent/cms",
          dryRun: false,
        },
      },
      handoff: "Use /api/agent/publish only for reviewed article drafts. Do not publish pricing, legal, or external claims without human review.",
    },
  });
}
