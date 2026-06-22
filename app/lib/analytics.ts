// PostHog analytics helpers for devcodeagency landing page
// All event names and properties are typed. Keep this file synced with docs/posthog-events.md.

import posthog from "posthog-js";

export type AnalyticsEvent =
  | "pageview"
  | "cta_clicked"
  | "pricing_viewed"
  | "agent_opened"
  | "agent_question_sent"
  | "lead_started"
  | "lead_submitted"
  | "language_switched"
  | "section_viewed";

export interface EventPayload {
  pageview: { path?: string; lang?: string };
  cta_clicked: { element: string; label: string; href?: string; lang?: string };
  pricing_viewed: { lang?: string };
  agent_opened: { lang?: string };
  agent_question_sent: { lang?: string };
  lead_started: { lang?: string };
  lead_submitted: { email: string; lang?: string };
  language_switched: { from: string; to: string };
  section_viewed: { section: string; lang?: string };
}

export function capture<E extends AnalyticsEvent>(
  event: E,
  props: EventPayload[E],
): void {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, props);
  } catch {
    // silently fail to avoid breaking UI
  }
}

export function identify(distinctId: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    posthog.identify(distinctId, props);
  } catch {
    // silently fail
  }
}
