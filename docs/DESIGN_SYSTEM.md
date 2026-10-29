# Sharav Infotech Design System

**Direction:** Precision engineering · modern digital architecture.
The visual language borrows from engineering drawings: blueprint grids, indexed
annotations (`§ 02`, `P.01`), mono labels, ruled lists and a single restrained accent
for "live" states. Depth comes from typography and structure rather than gradients,
stock imagery or glow.

Source of truth: `src/styles/tokens.css`.

---

## 1. Colour

### Primitives

| Family | Tokens | Role |
|---|---|---|
| Ink | `--ink-1000` … `--ink-700` (`#050810` → `#243050`) | Dark foundations, hero, footer |
| Graphite | `--graphite-600` … `--graphite-100` | Supporting text and surfaces |
| Paper | `--paper-50` `#f5f7fa`, `--paper-0` `#ffffff` | Cool-white content surfaces |
| **Sharav Indigo** | `--indigo-700` … `--indigo-100`; core `--indigo-500` `#4b50e6` | Brand and primary action. Refined from the original logo blue (`#4a4ff0`) to retain recognition |
| Signal | `--signal-500` `#2fc8a8`, `--signal-400` `#5fdcc0` | Live states, active nodes, technical annotations on dark. Use sparingly |
| Feedback | `--danger-*`, `--success-*` | Form states only |

### Semantic tokens (use these in components)

`--surface-page | raised | sunken | inverse`, `--text-strong | body | muted | accent`,
`--border-subtle | default | strong`, `--grid-line`, `--action-primary(-hover)`, `--focus-ring`.

Wrap any section in `.theme-inverse` to re-map these for dark surfaces; components need no dark variants.

### Contrast (WCAG 2.2)

| Pair | Ratio | Use |
|---|---|---|
| `--text-strong` on paper | 18.2:1 | Headings |
| `--text-body` `#2c3446` on paper | 11.6:1 | Body |
| `--text-muted` `#5e677c` on paper / sunken | 5.3:1 / 4.8:1 | Secondary text (AA) |
| `--text-accent` `#3b3fd0` on paper | 7.0:1 | Links, indices |
| White on `--indigo-500` | 5.9:1 | Primary buttons (AA) |
| `--text-inverse-body` on ink-950 | 11.8:1 | Body on dark |
| `--text-inverse-muted` `#8590a8` on ink-950 / ink-900 | 6.1:1 / 5.8:1 | Secondary on dark |
| `--signal-400` on ink-950 | 11.6:1 | Labels on dark only; never on paper |

## 2. Typography

### Selected families

| Role | Family | Settings | Source / licence |
|---|---|---|---|
| Display | **Archivo** (variable) | `wdth` 112–112.5 (semi-expanded), weight 600, tracking −0.025 to −0.035em | Google Fonts, SIL OFL 1.1 |
| Body | **IBM Plex Sans** | 400 / 500 / 600 | Google Fonts, SIL OFL 1.1 |
| Technical | **IBM Plex Mono** | 400 / 500, uppercase labels at +0.12em | Google Fonts, SIL OFL 1.1 |

All three are self-hosted at build time by `next/font` (no request to Google from the
visitor's browser), use `font-display: swap`, and ship Latin subsets only. Total:
one variable display file plus five static weights.

### Reference-site check

Fonts were extracted from the live CSS of each reference site on 28 Oct 2026:

| Site | Fonts in use |
|---|---|
| vaylentra.com | Zodiak (display serif), Satoshi (geometric sans), Geist Mono |
| daalcheeni.in | Cormorant Garamond, Bodoni Moda, Manrope |
| shubhshastra.com | Cormorant Garamond, Manrope |
| sharavinfotech.com (old) | Manrope |

### Why this combination is distinct

- **No overlap.** None of Archivo, IBM Plex Sans or IBM Plex Mono is used by any reference
  site. Manrope, Sharav's previous font, is shared with two reference sites, so it was dropped.
- **Different classification.** The references pair high-contrast serifs (Zodiak,
  Cormorant, Bodoni) with geometric or rounded grotesques (Satoshi, Manrope). Sharav
  uses no serif at all, and its display face is an **expanded grotesque**. The
  width axis gives wide, engineered letterforms that read as industrial and precise,
  unlike the narrow, editorial serifs of the references.
- **Different mono.** Plex Mono has slab serifs and IBM's engineering heritage; Geist Mono
  (Vaylentra) is a neo-grotesque mono. Their texture is visibly different.
- **Fit to the brand.** Plex was designed for an engineering company and reads well at
  small sizes in dense technical copy. Archivo's width axis lets one family carry
  everything from 80px headlines to the logo wordmark.

Candidates considered and rejected: *Space Grotesk* (overused in SaaS templates);
*Syne* (too expressive for enterprise trust); *Public Sans* (too neutral for display).

### Scale (fluid, 360 → 1440px)

| Token | Range | Use |
|---|---|---|
| `--text-4xl` | 40 → 80px | Hero and page titles |
| `--text-3xl` | 34 → 60px | Section titles |
| `--text-2xl` | 28 → 42px | Sub-sections, panel titles |
| `--text-xl` | 23 → 31px | Group titles |
| `--text-lg` | 19 → 23px | Item headings, ledes |
| `--text-md` | 17 → 19px | Long-form body |
| `--text-base` | 16px | Body |
| `--text-sm` / `--text-xs` | 14 / 12px | Meta, labels |

## 3. Spacing, layout, radii, elevation, motion

- **Spacing:** 4px base (`--space-1` … `--space-24`), fluid `--space-section` (72 → 144px), fluid `--gutter`.
- **Widths:** `--width-prose` 40rem, `--width-content` 76rem, `--width-wide` 88rem.
- **Breakpoints:** 640 · 768 · 1024 · 1280 (documented in tokens; CSS cannot read custom properties in media queries).
- **Radii:** 2 / 4 / 8 / 14px. Square-ish corners keep it precise; pills only for status.
- **Elevation:** three levels; used for floating panels and the form only.
- **Motion:** `--ease-standard`, `--ease-emphasis`; 140 / 240 / 520 / 760ms. All durations collapse to 0 under `prefers-reduced-motion`; reveal animations never hide content without JavaScript.

## 4. Components

| Component | Path | Notes |
|---|---|---|
| `Logo`, `LogoMark` | `src/components/brand/Logo.js` | Mark + live-text wordmark |
| `Button` | `src/components/ui/Button.js` | primary / secondary / inverse / text; sm / md / lg; renders Link, a or button |
| `Icon` | `src/components/ui/Icon.js` | 24px grid, 1.5px stroke |
| `Reveal` | `src/components/ui/Reveal.js` | One-time scroll fade |
| `SectionHeading` | `src/components/ui/SectionHeading.js` | Indexed label + title + lede |
| `PageHero`, `CtaBand`, `Seo` | `src/components/layout/` | Interior page scaffolding |
| `SiteHeader`, `SiteFooter` | `src/components/layout/` | Accessible services menu, mobile panel |
| `SystemDiagram` | `src/components/home/` | Hero architecture visual, tablist-driven |
| `ProcessExplorer` | `src/components/home/` | Discover → Evolve tablist |
| `ContactForm` | `src/components/contact/` | Shared validation, honeypot |

Interaction states: hover moves arrows 3–4px; focus is a 2px indigo ring (signal on dark);
disabled is 55% opacity; selected tabs carry a border plus a filled node.

## 5. Logo

### Concept A, "Precision Geometry" (primary, in use)

Two identical modules, rotated 180° about the centre, form an S. A diagonal slit of
negative space separates them, expressing systems built from well-defined parts.
The mark is drawn on a 48-unit grid with a constant 8-unit stroke and two 10-unit
outer radii. It holds up at 16px.

- Upper module: Sharav Indigo. Lower module: ink (light backgrounds) or white (dark).
- Wordmark: "Sharav" Archivo SemiExpanded SemiBold + "Infotech" Regular in a muted tone.
- Retains the original indigo and a modular "S", which echoes the bar-built S of the previous SVG mark.

### Concept B, "Technology Monogram" (alternate)

`public/brand/concept-b-monogram.svg`: the S drawn as one routed pathway with chamfered
turns and terminal nodes, inside a round indigo badge that keeps the silhouette of the
original circular logo. Offered for comparison; not used on the site.

### Files (`public/brand/`)

| File | Use |
|---|---|
| `sharav-logo-horizontal-{light,dark,mono,mono-white}.svg` | Primary lockup; text outlined to paths, so no font is needed |
| `sharav-logo-stacked-{…}.svg` | Compact / square placements |
| `sharav-mark-{…}.svg` | Symbol only |
| `favicon.svg` | Adapts to browser light/dark scheme |
| `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Generated |
| `og-image.png` | 1200×630 social card |
| `source/*.svg` | Raster sources; regenerate PNGs with `npm run brand:assets` |
| `archive/` | Original logos, retained unchanged |

**Clear space:** at least the height of one module stroke (⅙ of mark height) on all sides.
**Minimum size:** mark 16px; horizontal lockup 96px wide.
**Don't:** recolour modules independently of the palettes above, add effects, or set the
wordmark in another typeface.

Both concepts are original drawings. A professional trademark search is recommended
before registering either mark.
