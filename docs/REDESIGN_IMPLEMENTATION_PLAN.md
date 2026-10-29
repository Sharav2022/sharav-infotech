# Redesign Implementation Plan

Branch: `redesign/premium-2026` · Checkpoint: tag `pre-redesign-2026-checkpoint` on `main`

## Status overview

| Phase | Scope | Status |
|---|---|---|
| 0 | Sync with `origin/main`, checkpoint tag, working branch | ✅ Done |
| 1 | Audit and decisions (`EXISTING_SITE_AUDIT.md`, `ARCHITECTURE_DECISIONS.md`) | ✅ Done |
| 2 | Platform: Next 13.4 → 16.4, React 19, remove legacy deps, security headers, 0 audit findings | ✅ Done |
| 3 | Design system: tokens, typography, components (`DESIGN_SYSTEM.md`) | ✅ Done |
| 4 | Identity: Concept A mark + lockups, Concept B alternate, favicon, app icons, OG image | ✅ Done (owner approval pending) |
| 5 | Pages: Home (sections A–J), Services, 6 service pages, IT Consulting, About, Contact, Privacy, 404 | ✅ Done |
| 6 | SEO: per-page metadata, canonical, OG/Twitter, JSON-LD, sitemap, robots, redirects | ✅ Done |
| 7 | Contact pipeline hardening | ✅ Done |
| 8 | Verification: build, route/redirect/header checks, browser QA desktop + mobile, form tests | ✅ Done |
| 9 | Owner review: `CONTENT_VERIFICATION.md` | ⏳ Owner |
| 10 | Pre-launch operations (below) | ⏳ Owner / ops |
| 11 | Deploy | ⏳ Not started. Requires authorization |

## Information architecture

```
/                       Home (A Hero · B Positioning · C Capabilities · D Process ·
                        E Expertise · F Demonstrations · G Why · H Engagement · I CTA · J Footer)
/services               Services overview, grouped
  /services/product-design
  /services/web-development
  /services/cloud-services
  /services/software-testing
  /services/launching-and-support
  /services/digital-marketing
/it-consulting          IT Consulting (listed as service 06)
/about-us               Story, principles, leadership, location, careers
/contact                Enquiry form + direct channels   (/support → 308 here)
/privacy                Privacy notice
```

Deliberately **not** created (brief: "no empty or misleading pages"):

- **Our Work**: no approved case studies yet. The homepage shows clearly labelled
  capability demonstrations instead.
- **Insights**: no content or editorial commitment yet.
- **Solutions / Expertise** as a separate page: covered by the homepage expertise matrix
  and service pages. Revisit once there is enough distinct content.

## Pre-launch operations (owner / DevOps)

1. **Rotate the SendGrid credentials now.** A SendGrid password is in the public GitHub
   history (`src/globals/mock.js`). Removing the file does not remove it from history.
   Change the SendGrid account password, revoke and reissue API keys, and enable 2FA.
   Optionally purge history with `git filter-repo`, which requires a force-push and coordination.
2. In Vercel project settings, set `SENDGRID_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`
   (see `.env.example`). Use a restricted "Mail Send" key. Ideally authenticate the
   `sharavinfotech.com` domain in SendGrid and send from `no-reply@sharavinfotech.com`.
3. Vercel → Domains: redirect `www.sharavinfotech.com` → `sharavinfotech.com` (308).
4. Set the Vercel project's Node.js version to 20.x or later.
5. Deploy the branch to a **preview** URL, then submit a real test enquiry and confirm
   it arrives.
6. After production deploy: submit `https://sharavinfotech.com/sitemap.xml` in Google
   Search Console and watch Coverage for 404s over two weeks.
7. Optional: Vercel Firewall rate-limit rule on `/api/contact`.

## QA checklist (performed on this branch)

- [x] `next build` succeeds; all content routes prerendered
- [x] All routes 200; unknown route 404; `/support`, `/about`, `/services/it-consulting` → 308
- [x] Sitemap lists 12 absolute HTTPS URLs; robots references the sitemap
- [x] Security headers present on responses
- [x] Zero console errors and zero failed requests on all pages (headless Chromium)
- [x] No horizontal overflow at 390px; visual review at 1440 / 1280 / 390px
- [x] Form: required errors, focus moves to first invalid field, 405 / 415 / 400 / 429 / 502 paths, honeypot
- [x] Services menu: click, hover, Escape, outside click; mobile menu
- [x] Text contrast meets WCAG AA (see `DESIGN_SYSTEM.md`)
- [ ] Lighthouse run on the Vercel preview (real network, CDN)
- [ ] Screen-reader pass (VoiceOver / NVDA)
- [ ] Real SendGrid delivery test on preview

## Follow-ups

- Nonce-based CSP via middleware to remove `'unsafe-inline'` from `script-src`.
- Durable rate limiting (Vercel Firewall or KV).
- Higher-resolution team photography.
- Case studies, once approved.
- Remove unused legacy images in `public/images/{services,langs}` and `job_opening.png`
  after confirming nothing external links to them.

## Note on the brief

The brief received was cut off in section 10, item 7 ("Application Launch,").
Everything up to that point is implemented. Any requirements after it (for example
further services-page specifics, performance budgets, or testing requirements) have
not been seen and should be supplied for a follow-up pass.
