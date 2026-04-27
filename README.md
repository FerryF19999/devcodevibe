# devcodeagency - Next.js

Next.js App Router site for devcodeagency, including an agent-readable public site and a hidden AI Agent CMS operator route.

## Run

```bash
npm install
npm run dev

# production build
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local` and fill values as needed.

```bash
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-4-5-20251001
AGENT_CMS_TOKEN=change-me
```

`ANTHROPIC_API_KEY` enables live model responses. Without it, the app returns deterministic demo responses.

`AGENT_CMS_TOKEN` is optional. When set, external operators such as OpenClaw must send it as `x-agent-token` when calling `POST /api/agent/cms`.

## Public Routes

- `/` - landing page.
- `/journal` - public article index.
- `/journal/[slug]` - SEO/GEO article pages with Article and FAQ schema.
- `/llms.txt`, `/agent.json`, `/ai.txt`, `/openapi.json`, `/sitemap.xml` - agent and crawler discovery files.
- `/.well-known/openclaw.json` - OpenClaw operator manifest.

## Hidden Operator Route

- `/agent-cms` - hidden AI Agent CMS dashboard.

The dashboard is intentionally not linked from the homepage or nav. It is marked `noindex,nofollow` and is not included in the sitemap. Use it for manual operator testing only.

## Agent API

- `POST /api/agent` - general assistant completion endpoint.
- `POST /api/agent/cms` - the single verified AI Agent CMS runner.
- `GET /api/agent/ops` - SEO/GEO operating status for external operators.
- `POST /api/agent/checkout` - template checkout handoff.
- `POST /api/leads` - kickoff lead capture.

Verified CMS agent:

```json
{
  "agentId": "vwc-growth-agent-01",
  "name": "VWC Growth Agent"
}
```

Example OpenClaw run:

```bash
curl -X POST http://localhost:3000/api/agent/cms \
  -H "content-type: application/json" \
  -H "x-agent-token: $AGENT_CMS_TOKEN" \
  -d '{
    "agentId": "vwc-growth-agent-01",
    "mode": "weekly",
    "lang": "id",
    "topic": "SEO GEO autonomous untuk devcodeagency",
    "keyword": "AI Agent CMS",
    "audience": "founder indie",
    "offer": "AI agent CMS untuk artikel, SEO, GEO, dan conversion",
    "intent": "commercial investigation"
  }'
```

The CMS endpoint returns draft artifacts only: article draft, SEO metadata, GEO answer blocks, JSON-LD, conversion recommendations, and task queue. Public publishing should happen through a reviewed PR or approved CMS workflow.

## Structure

- `app/components/App.tsx` - public homepage composition and language state.
- `app/components/AgentCMS.tsx` - hidden CMS dashboard UI.
- `app/lib/agentCms.ts` - verified agent types, fallback generation, and published article data.
- `app/api/agent/cms/route.ts` - CMS agent API.
- `app/api/agent/ops/route.ts` - OpenClaw/ops status API.
- `app/journal/*` - public SEO/GEO article routes.
- `public/.well-known/openclaw.json` - OpenClaw manifest.
