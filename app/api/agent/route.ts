import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = { prompt?: string };

export async function POST(req: NextRequest) {
  const { prompt } = (await req.json().catch(() => ({}))) as Body;
  if (!prompt) return NextResponse.json({ error: "missing prompt" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ text: localFallback(prompt) });
  }

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text();
    return NextResponse.json({ error: `anthropic ${upstream.status}: ${detail.slice(0, 200)}` }, { status: 502 });
  }

  const data = (await upstream.json()) as { content?: { type: string; text?: string }[] };
  const text = (data.content ?? [])
    .filter((c) => c.type === "text")
    .map((c) => c.text ?? "")
    .join("");
  return NextResponse.json({ text });
}

function localFallback(prompt: string): string {
  const isId =
    /Return HANYA JSON|Kamu adalah|Kamu admin|Bahasa|Tanya|harga|timeline|dinotif|balas|Bisa|Butuh|Rekomendasi/i.test(
      prompt,
    );

  if (prompt.trim().startsWith("{") || /Return ONLY valid|Return HANYA JSON/i.test(prompt)) {
    return JSON.stringify(
      isId
        ? {
            name: "Tenangin",
            headline: "Pikiran rapi, pelan.",
            sub: "Jurnal privat untuk hari yang penuh tab.",
            cta: "Mulai menulis",
            accent: "#D4F26A",
            surface: "#FAFAF7",
            ink: "#1A1A17",
            features: ["Offline dulu", "Terenkripsi penuh", "Tag + markdown"],
            sections: ["Hero", "Fitur", "Harga", "FAQ"],
          }
        : {
            name: "Calmpad",
            headline: "A quieter way to think.",
            sub: "Journaling for people who close their tabs.",
            cta: "Start journaling",
            accent: "#D4F26A",
            surface: "#FAFAF7",
            ink: "#1A1A17",
            features: ["Offline first", "End-to-end encrypted", "Markdown + tags"],
            sections: ["Hero", "Features", "Pricing", "FAQ"],
          },
    );
  }
  if (isId) {
    return "Saya sedang berjalan dalam mode demo offline (ANTHROPIC_API_KEY belum diset). Untuk respons AI live, isi env var itu. Untuk sekarang: devcodeagency bisa bantu MVP median 9 hari, Starter Sprint $1,400, Full MVP $4,800, Async Retainer $3,200/bln. Email hello@devcodeagency.dev untuk mulai.";
  }
  return "I'm running in offline-demo mode (no ANTHROPIC_API_KEY set). Set the env var to unlock real responses. In the meantime: devcodeagency ships MVPs in ~9 days, Starter Sprint $1,400, Full MVP $4,800, Async Retainer $3,200/mo. Email hello@devcodeagency.dev to start.";
}
