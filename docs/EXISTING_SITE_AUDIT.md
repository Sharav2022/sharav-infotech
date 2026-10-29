# Existing Site Audit

Audit of the Sharav Infotech website as it stood before the 2026 redesign.
Snapshot preserved at git tag `pre-redesign-2026-checkpoint` (commit `3830284`).

Audited: 28 October 2026 · Repository: `github.com/Sharav2022/sharav-infotech` (public)

---

## 1. Summary

| Area | Finding | Severity |
|---|---|---|
| Secrets | A SendGrid password is hard-coded in `src/globals/mock.js` and committed to a **public** repository | Critical |
| Framework | Next.js 13.4.19, which has known critical advisories (`npm audit`: 22 vulnerabilities, 3 critical) | Critical |
| Contact form | Mail errors are swallowed, so the API always returns 200 and users are told their message was sent when it may not have been | High |
| Contact form | No server-side validation, no spam protection, no method check; API key printed to logs | High |
| SEO | Service pages render client-side only; crawlers receive an empty page | High |
| SEO | Sitemap and robots URLs have no scheme (`www.sharavinfotech.com/...`), so they are invalid | Medium |
| SEO | Both `sharavinfotech.com` and `www.sharavinfotech.com` serve 200 with no redirect, creating duplicate content | Medium |
| SEO | Every page shares one title and description | Medium |
| Content | Unverified claims are published: "40+ clients", "Reviewed on Clutch, 20 reviews", "24/7 support", "lifetime support", testimonials | High (trust/legal) |
| Content | Placeholder social links (`facebook.com`, `twitter.com`, `instagram.com` homepages) | Medium |
| Accessibility | Clickable `div`s, no keyboard menu, missing form labels association, no skip link, no focus styles | High |
| Performance | Three render-blocking third-party stylesheets (slick ×2, boxicons); carousel, AOS and Lottie libraries | Medium |
| Repo hygiene | Local `main` was 3 commits behind `origin/main`; production content (Digital Marketing, Cloud Services) only existed remotely | Medium |

## 2. Technical inventory

| Item | Finding |
|---|---|
| Framework | Next.js **13.4.19**, Pages Router (`pages/`) |
| Runtime | React 18.2.0, React DOM 18.2.0 |
| Language | JavaScript (no TypeScript); `jsconfig.json` defines `@/*` alias (unused) |
| Routing | `/`, `/services`, `/services/[service]`, `/about-us`, `/support`, `/it-consulting`, `/404`, `/api/send-mail`, `/api/robots`, `/api/sitemap` |
| Rewrites | `/robots.txt` and `/sitemap.xml` rewritten to API routes guarded by a query-string "secret" (`sharav_infotech`) visible in `next.config.js` |
| Styling | CSS Modules per component + `src/styles/globals.css` |
| Fonts | Manrope via `next/font/google` (300–800, six weights) |
| Icons | `@svgr/webpack` SVG imports + boxicons via unpkg CDN |
| UI libraries | `react-slick` (+ slick CSS from cdnjs), `aos`, `@lottiefiles/react-lottie-player`, `@lottiefiles/lottie-player`, `axios` |
| Email | `@sendgrid/mail` 7.7; sender and recipient `sharavinfotech@gmail.com` |
| Hosting | Vercel (`server: Vercel`, `x-vercel-id` headers); no `vercel.json` |
| Node | Local Node 20.20.2 |

## 3. Commercial theme

**Finding: no commercial theme package is installed or vendored in this repository.**

The colour tokens and class names in `src/styles/globals.css` match the
*Silicon* Bootstrap template by Createx Studio (primary `#6366f1`, gray scale
`#f3f6ff`→`#0b0f19`, body text `#565973`, `.offcanvas-backdrop`, Silicon's
shadow tokens). These values were hand-copied into custom CSS; no Silicon
HTML, SCSS, JavaScript, or Bootstrap dependency exists in the repo or
`package.json`, and no licence file or purchase record is present.

Implications:

- There is nothing to "upgrade". Silicon is a static Bootstrap/HTML template,
  not a Next.js theme with an upgrade path.
- Several copied tokens were already broken (`rgba(var(--color-gray-900), 0.06)`
  with a hex value, `--color-secondary: --color-gray-200`) and had no effect.
- If a Silicon licence was purchased, it is unaffected by this work; the
  redesign no longer uses any Silicon-derived values.

See ADR-002 in `ARCHITECTURE_DECISIONS.md`.

## 4. Brand assets

| Asset | Notes |
|---|---|
| `public/icons/SharavInfotechLogo.jpeg` | Primary logo: indigo (≈`#4a4ff0`) round badge with a three-spoke glyph, uppercase geometric wordmark. The glyph closely resembles a well-known automotive emblem, which is a trademark-confusion risk. |
| `src/assets/icons/logo.svg` / `public/icons/logo.svg` | Different mark: horizontal bars forming an S with a purple→pink gradient (`#8c52ff`→`#f7adaf`). Used in header, footer and favicon. |
| `src/assets/images/sil.gif` | Animated logo, unused. |

The site therefore had **two inconsistent logos**. All three files are archived in
`public/brand/archive/`; `public/icons/*` is left in place so old URLs keep working.

## 5. Content inventory (preserved or migrated)

| Content | Disposition |
|---|---|
| 6 service descriptions (Product Design, Digital Marketing, Cloud Services, Web Development, Software Testing, Launching & Support) | Migrated to `src/content/services.js`; edited for clarity, substance preserved |
| IT Consulting: 10 aspects | Migrated to `src/content/company.js`; duplicate "Technology Trends" title on item 9 renamed "Tailored recommendations" |
| About: "Who we are", 5 "How we work" principles | Migrated |
| Team: Shaveta Garg (Founder), Ruma Roy (Senior Manager) | Migrated with existing photos |
| Careers link (Indeed) | Migrated |
| Address, phone, email | Migrated (`src/content/site.js`) |
| "Why us" cards | Rewritten; claims such as "expertise of twenty", "fixed fee package", "only IT partner you'll need" removed as unverified |
| Testimonials (3), "40+ clients", Clutch badge, "20+ tested projects" | **Not published.** Pending owner verification (see `CONTENT_VERIFICATION.md`) |
| "24/7" and "lifetime" support claims | **Not published.** Pending verification |
| Facebook / Twitter / Instagram links | **Removed** (pointed to platform homepages, not company profiles) |
| Hero/about/contact stock photography, service illustrations | Not used in the new design; files remain in `public/images` |

## 6. SEO baseline

- Canonical tag on the home page only (`https://sharavinfotech.com/`).
- All other pages: same title "SharavInfotech - Emerging Leader of IT Services" and
  description "…to low end business".
- `/services/[service]` rendered `null` on the server, so crawlers received no content.
- Favicon referenced with a relative path (`icons/logo.svg`), which breaks on nested routes.
- No Open Graph, Twitter Card, or structured data.

## 7. Accessibility baseline

- Navigation, social icons, carousel arrows, testimonial arrows and the form submit
  were `div`s with `onClick`, unreachable by keyboard.
- Labels not associated with inputs; errors not announced.
- Services dropdown opened on hover only.
- Missing `alt` on service images; `img` used with invalid `fill` attribute.
- No `:focus-visible` styles (`a:focus { outline: none }` removed focus entirely).

## 8. Responsive issues

- `useIsMobile` initialises to `true`, so desktop users see mobile layout on first paint
  and the footer link lists start collapsed on hydration.
- Header items rendered without keys; React warnings in development.

## 9. Dependency audit (before)

`npm audit`: **22 vulnerabilities (5 low, 3 moderate, 11 high, 3 critical)**, including
Next.js 13.4 advisories, `svgo` (via `@svgr/webpack`), `source-map-js`, and `zod`.

After the redesign: **0 vulnerabilities**, with three runtime dependencies (`next`, `react`, `react-dom`).
