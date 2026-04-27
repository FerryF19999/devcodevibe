import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { email?: string; lang?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  return NextResponse.json({
    status: "received",
    email,
    nextStep:
      body.lang === "id"
        ? "Kami akan balas dengan slot kickoff dan brief singkat."
        : "We'll reply with kickoff slots and a short brief.",
  });
}
