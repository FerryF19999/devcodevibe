import { NextRequest, NextResponse } from "next/server";
import {
  VERIFIED_AGENT,
  buildCmsPrompt,
  createFallbackCmsResult,
  normalizeCmsRequest,
  type AgentCmsResult,
  type AgentCmsRequest,
} from "../../../lib/agentCms";

export const runtime = "nodejs";

type AnthropicContent = { type: string; text?: string };

export async function GET() {
  return NextResponse.json({
    agent: VERIFIED_AGENT,
    acceptedModes: ["article", "seo", "geo", "conversion", "weekly"],
    contract: {
      method: "POST",
      input: ["mode", "lang", "topic", "audience", "offer", "keyword", "intent"],
      output: ["article", "seo", "geo", "conversion", "tasks", "jsonLd"],
    },
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as AgentCmsRequest;
  const normalized = normalizeCmsRequest(body);
  const requiredToken = process.env.AGENT_CMS_TOKEN;

  if (requiredToken && req.headers.get("x-agent-token") !== requiredToken) {
    return NextResponse.json({ error: "missing or invalid agent token" }, { status: 401 });
  }

  if (normalized.agentId !== VERIFIED_AGENT.id) {
    return NextResponse.json(
      {
        error: "unverified agent",
        verifiedAgent: VERIFIED_AGENT.id,
      },
      { status: 403 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(createFallbackCmsResult(normalized));
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
        max_tokens: 1800,
        messages: [{ role: "user", content: buildCmsPrompt(normalized) }],
      }),
    });

    if (!upstream.ok) {
      return NextResponse.json(createFallbackCmsResult(normalized));
    }

    const data = (await upstream.json()) as { content?: AnthropicContent[] };
    const text = (data.content ?? [])
      .filter((item) => item.type === "text")
      .map((item) => item.text ?? "")
      .join("");
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as Omit<AgentCmsResult, "agent" | "mode" | "createdAt">;

    return NextResponse.json({
      ...parsed,
      agent: VERIFIED_AGENT,
      mode: normalized.mode,
      createdAt: new Date().toISOString(),
    } satisfies AgentCmsResult);
  } catch {
    return NextResponse.json(createFallbackCmsResult(normalized));
  }
}
