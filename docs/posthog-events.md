## PostHog CRO Event Schema (devcodevibe)

| Event | Type | Trigger | Properties |
|-------|------|---------|-----------|
| `pageview` | auto | PostHog init | `path` (string), `lang` (string, optional) |
| `cta_clicked` | micro | CTA button/link | `element` (string), `label` (string), `href` (string, optional), `lang` (string, optional) |
| `pricing_viewed` | micro | Pricing section 50% visible | `lang` (string, optional) |
| `agent_opened` | micro | AgentDemo component mounts | `lang` (string, optional) |
| `agent_question_sent` | micro | User submits chat message | `lang` (string, optional) |
| `lead_started` | micro | Lead form email input focused | `lang` (string, optional) |
| `lead_submitted` | goal | Lead form successfully submitted | `email` (string), `lang` (string, optional) |
| `language_switched` | micro | EN/ID toggle | `from` (string), `to` (string) |
| `section_viewed` | micro | Section enters viewport | `section` (string), `lang` (string, optional) |

### Vercel Environment Variables

Add to Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_ruk2QGqqTpqgud9HCWQdnPSNLvjPfnzmhANX2tSRDXkD
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Both are public (client-side) and safe to expose.

### Files Added / Modified

- `app/components/PostHogProvider.tsx` — client-side PostHog init wrapper
- `app/lib/analytics.ts` — typed capture helpers
- `app/layout.tsx` — wrapped children in `<PostHogProvider>`
- `app/components/Nav.tsx` — nav link + lang switch + CTA clicks
- `app/components/Hero.tsx` — prompt submit + example chip clicks
- `app/components/Pricing.tsx` — IntersectionObserver for pricing_viewed
- `app/components/AgentDemo.tsx` — agent_opened on mount + agent_question_sent on send
- `app/components/StartStrip.tsx` — lead_started (onFocus) + lead_submitted (on success)
- `docs/posthog-events.md` — this file
