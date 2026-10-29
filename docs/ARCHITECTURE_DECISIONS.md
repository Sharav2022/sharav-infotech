# Architecture Decisions

Lightweight ADRs for the 2026 redesign. Status of all: **Accepted** (pending owner review).

---

## ADR-001 · Stay on Next.js Pages Router, upgrade to Next.js 16

**Context.** The site runs Next.js 13.4.19 with critical security advisories. Next.js 16.4.3
is the current stable release and still fully supports the Pages Router.

**Decision.** Upgrade to Next.js 16.4 and React 19.3, keeping the Pages Router.

**Rationale.** Preserves every existing route and URL with minimal risk. The site is
almost entirely static content, so App Router features (server components, streaming)
offer little benefit relative to migration cost. Migrating later remains straightforward
because content is now separated from presentation.

**Consequences.** Turbopack is the default bundler; custom webpack configuration (previously
used for `@svgr/webpack`) was removed. `next lint` no longer exists in Next 16, so the
`lint` script was dropped. Node ≥ 20.9 is required (declared in `engines`).

## ADR-002 · Replace the theme-derived styling with a custom design system (Option B)

**Context.** The brief asks whether to modernize the purchased theme (Option A) or
migrate to a custom design system (Option B). The audit found that no theme package
exists in the codebase; only colour values copied from the *Silicon* Bootstrap
template remain, several of them broken.

**Decision.** Option B: a token-based design system (`src/styles/tokens.css`) with
reusable React components and CSS Modules.

**Rationale.** Option A is not available: there is no installed, licensed, upgradable
theme. Re-adopting Silicon would mean adding Bootstrap and a generic SaaS look that
conflicts with the brief's goal of a distinctive identity. A custom system gives full
ownership with no licence dependency.

**Consequences.** No vendor files, no licence constraints on the new code. Any existing
Silicon licence is unaffected.

## ADR-003 · CSS Modules + semantic design tokens (no Tailwind / UI kit)

**Decision.** Keep the project's existing CSS Modules idiom. Primitive values (ink,
graphite, indigo, signal) are defined once; components consume only semantic tokens
(`--surface-*`, `--text-*`, `--border-*`). A `.theme-inverse` class re-maps the semantic
tokens for dark sections, so every component works on both surfaces without variants.

**Rationale.** Zero runtime cost, no new dependency, consistent with existing code.

## ADR-004 · Remove runtime UI dependencies

| Removed | Replacement |
|---|---|
| `react-slick` + slick CSS (cdnjs) | No carousel. Hero is a single message with an interactive diagram |
| `aos` | 30-line `Reveal` component on `IntersectionObserver` |
| `@lottiefiles/*` | Static, styled 404 page |
| boxicons (unpkg CDN) | Inline `Icon` component (10 icons) |
| `@svgr/webpack` | Inline SVG components |
| `axios` | `fetch` |
| `@sendgrid/mail` | Direct `fetch` to SendGrid v3 API (`src/lib/mail.js`) |

**Consequences.** No third-party origins are contacted by the browser, enabling a strict
`Content-Security-Policy`. `npm audit`: 0 vulnerabilities.

## ADR-005 · Content as data, verified claims only

**Decision.** All copy lives in `src/content/*.js`. `mock.js` is deleted. Claims that
cannot be verified from the repository or owner (client counts, reviews, testimonials,
24/7 support, specific technologies not previously published) are not shown.
The "Featured Work" section is explicitly labelled *Capability demonstrations* and
states that the examples are not client case studies.

**Consequences.** `docs/CONTENT_VERIFICATION.md` lists exactly what the owner must
confirm before additional claims can be published.

## ADR-006 · Static generation for all content routes

**Decision.** `/services/[service]` uses `getStaticPaths` / `getStaticProps` with
`fallback: false`. All other pages are static. `sitemap.xml` and `robots.txt` are
server-rendered page routes with CDN caching. The old secret-protected API routes are removed.

**Rationale.** Crawlers now receive full HTML for every service page.

## ADR-007 · URL preservation and redirects

| Old URL | New behaviour |
|---|---|
| `/`, `/services`, `/about-us`, `/it-consulting` | Unchanged |
| `/services/{product-design,web-development,cloud-services,software-testing,launching-and-support,digital-marketing}` | Unchanged slugs |
| `/support` | 308 permanent redirect → `/contact` |
| `/contact-us`, `/about`, `/services/it-consulting` | 308 → canonical pages |
| `/api/send-mail` | Removed (replaced by `/api/contact`) |

Canonical host is `https://sharavinfotech.com` (matches the existing canonical tag).
**Infrastructure action required:** configure a `www` → apex redirect in Vercel
domain settings (not changed by this work).

## ADR-008 · Contact form security model

- Shared validation rules (`src/lib/contact.js`) enforced in browser and server.
- JSON-only `POST`, 16 KB body limit, per-field length caps, line breaks stripped from
  header-bound values, `replyTo` set to the submitter (never `from`).
- Honeypot field; best-effort in-memory rate limit (5 per 10 minutes per IP per instance).
- Honest failure: a 502 with phone/email fallbacks when delivery fails.
- Secrets only via environment variables (`.env.example` documents them).

**Known limitation.** Serverless instances do not share memory, so the rate limit is
not global. For a durable limit, use Vercel Firewall rate-limiting rules or an
Upstash/KV store.

## ADR-009 · Security headers

Applied to all routes via `next.config.js`: CSP (self-only, no third-party origins),
`X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, HSTS. `script-src` includes `'unsafe-inline'` because the Pages
Router emits inline bootstrap scripts; moving to nonce-based CSP via middleware is a
possible follow-up.
