# Sharav Infotech Design System

**Direction: "Vibrant Digital Innovation: where engineering meets imagination."**

Light-first, luminous and spatial. Original 3D renders carry the storytelling.
Royal-to-violet gradients mark action and emphasis, glass surfaces float above
soft ice and lavender backgrounds, and dimensional orbs and tilting modules give
every section depth. **No black or near-black value appears anywhere**: text,
shadows, logo and 3D assets all use deep indigo or blue-tinted values instead.

Source of truth: `src/styles/tokens.css`. 3D source: `src/three/` and `scripts/render-3d/`.

---

## 1. Colour

### Palette

| Role | Token | Value |
|---|---|---|
| Royal Blue (primary) | `--royal-500` | `#3457FF` |
| Vibrant Violet | `--violet-500` | `#8056F7` |
| Electric Cyan | `--cyan-500` | `#00C8E8` |
| Bright Teal | `--teal-500` | `#18C9AD` |
| Soft Lavender | `--lavender-100` | `#F1EBFF` |
| Ice Blue | `--ice-100` | `#EDF7FF` |
| White | `--white` | `#FFFFFF` |
| Slate Blue (body text) | `--slate-600` | `#405777` |
| Midnight Indigo (headings) | `--midnight` | `#1D2B78` (the deepest colour in the system; a saturated indigo, not black) |

Deeper steps (`--royal-600/700`, `--violet-600/700`) exist for text and for gradients that carry white text.

### Gradients

| Token | Use |
|---|---|
| `--gradient-brand` | Primary buttons, icon chips, checks |
| `--gradient-vivid` | CTA bands and highlight cards (`.theme-vivid`), white text |
| `--gradient-text` | Gradient headline words (`.gradient-text`) |
| `--gradient-spectrum` | Rails, label ticks, progress |
| `--gradient-luminous` | Hero and page-hero backgrounds |
| `--gradient-soft` | Alternate section backgrounds, footer |

Gradients are used for emphasis, never as body backgrounds behind long text.

### Contrast rules (WCAG 2.2 AA, computed)

| Pair | Ratio |
|---|---|
| Midnight `#1d2b78` on white / lavender | 12.6 / 10.8 |
| Slate `#405777` on white / lavender / ice | 7.4 / 6.3 / 6.8 |
| Muted `#56688a` on lavender | 4.8 |
| Accent text `#2e4bf0` on white | 6.2 |
| White on `#3457ff` → `#6d45ec` (primary button) | 5.3 to 5.7 |
| White on vivid gradient `#2f4be8` → `#5b3fe0` | 6.4 to 6.5 |
| `#e3e8ff` secondary text on vivid gradient | ≥ 4.6 |

Cyan and teal are **decorative only**: never carry white text on them, since white on
`#18c9ad` is only 2.1:1. When text must sit on them, use Midnight (6.0:1).

### Shadows

All elevation is blue- or violet-tinted (`--shadow-1/2/3`, `--shadow-glow`). The 3D contact
shadows are tinted royal→violet in `studio.js`.

## 2. Typography

| Role | Family | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (variable, optical size) | Weights 600 to 700, tight tracking (−0.035 to −0.05em). Optical sizing gives large headlines their distinctive ink traps and contrast. |
| Body | **IBM Plex Sans** | 400 / 500 / 600 |
| Technical | **IBM Plex Mono** | 400 / 500; uppercase labels at +0.14em |

All are SIL OFL fonts, self-hosted by `next/font`, with Latin subsets only.

**Why it is distinct from the reference sites.** Fonts were read from each site's live CSS:
Vaylentra uses Zodiak, Satoshi and Geist Mono; DaalCheeni uses Cormorant Garamond, Bodoni Moda and Manrope;
ShubhShastra uses Cormorant Garamond and Manrope. Sharav uses none of them and no serif at all.
Bricolage Grotesque is a quirky, characterful grotesque with optical-size contrast, unlike
Satoshi's neutral geometry or Manrope's rounded forms, and Plex Mono's slab serifs are
visibly different from Geist Mono. The previous display face (Archivo) was replaced because
it read as industrial rather than premium.

Fluid scale: `--text-4xl` 44 → 92px (hero), `--text-3xl` 36 → 64px (sections), down to 12px labels.

## 3. 3D visual language

All 3D imagery is **original**, built in Three.js from one shared studio
(`src/three/studio.js`), so every visual uses the same materials, lighting and palette.

| Material | Look |
|---|---|
| `satin(stops)` | Lacquered colour with a vertical palette gradient and clearcoat |
| `glass()` | Refractive, iridescent glass, tinted lavender |
| `crystal()` | Faceted reflective crystal (hero core); no transmission, so it renders cleanly over transparency |
| `frost()` | Translucent frosted panels |
| `porcelain()` | Soft white structural parts |
| `glow()` | Self-lit signals and connections |

Lighting: a studio environment, a white key light, a violet rim on the left, a cyan rim on the
right, and a blue-tinted contact shadow. Neutral tone mapping preserves saturation.

| Asset | Concept |
|---|---|
| Hero (live) | "Glass Core": a faceted crystal around a luminous core, with application modules on orbits wired to it |
| Product Design | Floating interface frames, colour chips, glass panel |
| Web Development | Glass app window with extruded code bars and connected modules |
| Cloud Services | Glass cloud over a field of server towers with uplinks |
| IT Consulting | Stacked architecture layers with cross-layer integrations |
| Software Testing | Glass hex prism holding an extruded check mark, with validation rings |
| Launch & Support | Ascending platforms with an orbiting sphere |
| Digital Marketing | 3D bar chart, rising trend line and floating donut |
| Brand | The Sharav mark, extruded |
| Contact / CTA | Interlocked rings: partnership |

### Runtime strategy

- **Hero:** a WebP poster of the exact same scene renders first (`priority`, no layout shift,
  fixed 6:5 frame). After the browser is idle, capable devices lazy-load Three.js (182 KB gzip,
  never in the initial bundle) and cross-fade to the live scene. It has pointer parallax, pauses
  off-screen, and caps pixel ratio at 1.75.
- **Fallback** (static poster only): `prefers-reduced-motion`, Save-Data, low-power devices
  (≤ 4 cores and ≤ 4 GB), or no WebGL2.
- **Everything else** uses pre-rendered transparent WebP (100 to 200 KB each, served as AVIF
  by `next/image` at the right size). This is real 3D, without the runtime cost.

### Regenerating renders

```bash
npm run render:3d                 # serves http://localhost:3200/scripts/render-3d/
# open the page, click a scene to download a 2400×2000 transparent PNG
npm run render:3d:optimize -- <folder-with-pngs>   # writes public/images/3d/*.webp
npm run brand:assets              # rebuilds icons and the OG image (uses hero.webp)
```

## 4. Spacing, layout, radii, motion

- 4px spacing base, fluid section padding (72 → 152px) and gutters.
- Radii: 8 / 14 / 22 / 32px plus pills. Generous rounding suits the glass and 3D language.
- Motion: `--ease-emphasis` reveals (900ms rise and scale), gentle float loops on renders and
  chips, pointer tilt on cards (`Tilt` component, max 4 to 6°), button lift and glow.
  **All durations collapse to zero** and float/tilt are disabled under `prefers-reduced-motion`.

## 5. Components

| Component | Notes |
|---|---|
| `Logo` / `LogoMark` | Gradient mark (cyan→royal, violet→royal); `tone="white"` for vivid surfaces |
| `Button` | primary (gradient pill and glow), secondary (glass), inverse (white on vivid), text |
| `Tilt` | Pointer-driven 3D tilt and moving highlight |
| `Reveal` | One-time rise-in on scroll |
| `Hero3D` | Poster → live Three.js scene |
| `ProcessExplorer` | Glossy dimensional nodes on a spectrum rail, glass detail panel |
| `PageHero` | Luminous interior hero with an optional 3D render |
| `CtaBand` | Vivid gradient band with the interlocked-rings render |
| `SiteHeader` | Floating glass pill; services menu with 3D thumbnails |
| `SiteFooter` | Soft gradient, statement headline, full information architecture |

CSS orbs (`.orb.royal | violet | cyan | teal` in `Home.module.css`) are radial-gradient spheres
used for numbered steps and module icons.

## 6. Logo

**Concept A, "Precision Geometry"** (in use): two identical modules, rotated 180°, form an S
separated by a diagonal slit of negative space. It now carries two gradients (cyan→royal on the
upper module, violet→royal on the lower) and appears in 3D on the About page.

| File (`public/brand/`) | Use |
|---|---|
| `sharav-logo-horizontal-color.svg` | Primary lockup on light surfaces |
| `sharav-logo-horizontal-white.svg` | On gradient or colour surfaces |
| `sharav-logo-horizontal-midnight.svg` | Single-colour (print, embossing); Midnight Indigo, not black |
| `sharav-logo-stacked-*.svg`, `sharav-mark-*.svg` | Compact placements |
| `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png` | Icons (gradient tile) |
| `og-image.png` | Social card with the 3D hero |
| `concept-b-monogram.svg` | Alternate concept |
| `archive/` | Original logos, unchanged |

All wordmarks are outlined paths set in Bricolage Grotesque. **Minimum size:** mark 16px;
lockup 96px wide. Do not place the colour mark on the vivid gradient; use the white version.
