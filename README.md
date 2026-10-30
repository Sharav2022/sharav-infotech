# Sharav Infotech website

Marketing site for [Sharav Infotech](https://sharavinfotech.com), built with
Next.js 16 (Pages Router), React 19 and Three.js. Hosted on Vercel.
See docs/DESIGN_SYSTEM.md for the 3D pipeline (`npm run render:3d`).

## Development

```bash
npm install
cp .env.example .env.local   # add SendGrid credentials to test the contact form
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

Requires Node.js 20.9 or later.

## Structure

```
pages/                Routes (static pages, /api/contact, sitemap.xml, robots.txt)
src/content/          All site copy and company facts. Edit text here.
src/components/       brand/ layout/ ui/ home/ contact/
src/styles/           tokens.css (design tokens), globals.css, page CSS modules
src/lib/              Contact validation (shared client/server), SendGrid mail
public/brand/         Logo, favicon, social assets; archive/ holds the original logos
src/three/            Shared 3D studio and the live hero scene (Three.js)
scripts/              build-brand-assets.mjs, render-3d/ (offline 3D render pipeline)
docs/                 Audit, architecture decisions, design system, plan, content checklist
```

## Environment variables

| Name | Purpose |
|---|---|
| `SENDGRID_API_KEY` | SendGrid key with Mail Send permission |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | SendGrid-verified sender |

Never commit real values.

## Documentation

- [Existing site audit](docs/EXISTING_SITE_AUDIT.md)
- [Architecture decisions](docs/ARCHITECTURE_DECISIONS.md)
- [Design system, typography and logo](docs/DESIGN_SYSTEM.md)
- [Implementation plan and launch checklist](docs/REDESIGN_IMPLEMENTATION_PLAN.md)
- [Content verification checklist](docs/CONTENT_VERIFICATION.md)
