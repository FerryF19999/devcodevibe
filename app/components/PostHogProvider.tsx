"use client";

import { useEffect } from "react";

type PostHogLike = {
  __loaded?: boolean;
  init: (token: string, options: Record<string, unknown>) => void;
};

type WindowWithPostHog = Window & {
  __vwcPostHog?: PostHogLike;
};

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as WindowWithPostHog;
    if (w.__vwcPostHog?.__loaded) return;

    const token = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token) {
      // eslint-disable-next-line no-console
      console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY not set.");
      return;
    }

    let active = true;
    void import("posthog-js").then(({ default: posthog }) => {
      if (!active) return;
      const client = posthog as unknown as PostHogLike;
      w.__vwcPostHog = client;
      client.init(token, {
        api_host: host || "https://us.i.posthog.com",
        capture_pageview: false,
        capture_pageleave: true,
        loaded: () => {
          client.__loaded = true;
          w.__vwcPostHog = client;
        },
      });
    });

    return () => {
      active = false;
    };
  }, []);

  return <>{children}</>;
}
