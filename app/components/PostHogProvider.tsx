"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Already initialized? Skip.
    if ((posthog as unknown as Record<string, unknown>).__loaded) return;

    const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token) {
      // eslint-disable-next-line no-console
      console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set.");
      return;
    }

    posthog.init(token, {
      api_host: host || "https://us.i.posthog.com",
      capture_pageview: false, // manual pageview to include lang
      capture_pageleave: true,
      loaded: (ph) => {
        (posthog as unknown as Record<string, unknown>).__loaded = true;
        ph.capture("pageview", { path: window.location.pathname });
      },
    });
  }, []);

  return <>{children}</>;
}
