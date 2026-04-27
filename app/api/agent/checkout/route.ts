import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const CATALOG: Record<string, { name: string; price: number }> = {
  "VWC-001": { name: "Quietkit", price: 89 },
  "VWC-002": { name: "Warungkit", price: 69 },
  "VWC-003": { name: "Agentpost", price: 49 },
  "VWC-004": { name: "Pocketboard", price: 129 },
  "VWC-005": { name: "Schemaforge", price: 29 },
  "VWC-006": { name: "Voicepage", price: 59 },
};

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { sku?: string; returnUrl?: string };
  const sku = body.sku?.trim().toUpperCase();
  if (!sku || !CATALOG[sku]) {
    return NextResponse.json({ error: "unknown sku" }, { status: 400 });
  }

  const product = CATALOG[sku];
  return NextResponse.json({
    status: "checkout_handoff_ready",
    sku,
    product: product.name,
    price: product.price,
    currency: "USD",
    checkoutUrl: `mailto:hello@devcodeagency.dev?subject=Agent checkout ${encodeURIComponent(sku)}`,
    returnUrl: body.returnUrl || "https://devcodeagency.dev/",
    note: "Payment and license delivery are handed off to the studio until a live payment provider is connected.",
  });
}
