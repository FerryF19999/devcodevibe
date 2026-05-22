import { NextResponse } from "next/server";
import { VERIFIED_AGENT } from "../lib/agentCms";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    openapi: "3.1.0",
    info: {
      title: "devcodeagency Agent API",
      version: "1.0.0",
    },
    paths: {
      "/api/agent": {
        post: {
          summary: "Assistant completion endpoint",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["prompt"],
                  properties: {
                    prompt: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Completion text",
            },
          },
        },
      },
      "/api/agent/cms": {
        get: {
          summary: "Verified CMS agent manifest",
          responses: {
            "200": {
              description: VERIFIED_AGENT.id,
            },
          },
        },
        post: {
          summary: "Run the single verified AI Agent CMS",
          parameters: [
            {
              name: "x-agent-token",
              in: "header",
              required: false,
              schema: { type: "string" },
              description: "Required when AGENT_CMS_TOKEN is configured.",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    agentId: { type: "string", enum: [VERIFIED_AGENT.id] },
                    mode: { type: "string", enum: ["article", "seo", "geo", "conversion", "weekly"] },
                    lang: { type: "string", enum: ["en", "id"] },
                    topic: { type: "string" },
                    audience: { type: "string" },
                    offer: { type: "string" },
                    keyword: { type: "string" },
                    intent: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "SEO/GEO/content/conversion artifact" },
            "401": { description: "Missing or invalid agent token" },
            "403": { description: "Unverified agent" },
          },
        },
      },
      "/api/agent/ops": {
        get: {
          summary: "Read SEO/GEO operating status for external agents",
          responses: {
            "200": {
              description: "Current agent, SEO, GEO, route, and OpenClaw status",
            },
          },
        },
      },
      "/api/agent/publish": {
        get: {
          summary: "Read the AI-agent publish contract",
          responses: {
            "200": {
              description: "Publish API contract",
            },
          },
        },
        post: {
          summary: "Publish a reviewed article draft to GitHub",
          parameters: [
            {
              name: "x-agent-token",
              in: "header",
              required: true,
              schema: { type: "string" },
              description: "Must match AGENT_CMS_TOKEN.",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["agentId"],
                  properties: {
                    agentId: { type: "string", enum: [VERIFIED_AGENT.id] },
                    draft: { type: "object" },
                    article: { type: "object" },
                    dryRun: { type: "boolean" },
                    branch: { type: "string" },
                    commitMessage: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Article published or dry-run response" },
            "401": { description: "Missing or invalid agent token" },
            "403": { description: "Unverified agent" },
            "503": { description: "Publish env vars are missing" },
          },
        },
      },
      "/api/agent/checkout": {
        post: {
          summary: "Prepare template checkout handoff",
          responses: {
            "200": { description: "Checkout handoff" },
          },
        },
      },
      "/api/leads": {
        post: {
          summary: "Capture kickoff lead",
          responses: {
            "200": { description: "Lead received" },
          },
        },
      },
    },
  });
}
