# Higgsfield Art Brief — Market Steward Luxury Theme

The site is wired for Higgsfield art. No API key needed for generation:
connect via **https://mcp.higgsfield.ai/mcp** (see workspace `.mcp.json`),
generate, download, and drop files into `react-app/public/art/`.

## Slots (all optional — the theme works without them)

| Slot | File | Used in | Size hint |
|------|------|---------|-----------|
| `hero-plate` | `public/art/hero-noir.jpg` | `.hero__plate` (homepage hero backdrop, 20% opacity, graded) | 2400×1350 landscape |
| `community-room` | `public/art/community-room.jpg` | Community page header plate | 2400×1200 |
| `dealing-room` | `public/art/dealing-room.jpg` | Insights page header plate | 2400×1200 |
| `mentor portraits` | `public/art/mentor-*.jpg` | About page team cards | 800×1000 portrait |

## Global style lock (paste into every Higgsfield prompt)

> deep forest-green cinematic interior, muted olive-green accents and soft sage
> highlights on dark slate, warm ivory highlights on stone, faint green candlestick
> chart etched in dark glass, soft volumetric key light from upper right, shallow
> depth of field, film grain, ultra-premium private members-club atmosphere,
> no people faces in close-up (silhouettes at distance only), no text, no logos,
> no stock-chart clichés, aspect as specified

## Copy-paste prompts

### 1. Hero plate
```
Deep noir private trading lounge at night, long dark walnut table with closed
leather journals and a single lamp glowing warm ivory, floor-to-ceiling
windows with blurred city lights, faint green candlestick chart etched on dark glass, out of focus, volumetric light shafts, cinematic wide shot,
luxury members club mood, no people, no text, 16:9
```
Negative: `people faces, text, logos, neon, bright daylight, cluttered desk, stock photo`

### 2. Community room plate
```
Elegant dark library room with twelve leather chairs in a circle around a low
table, warm brass reading lamps, tall bookshelves fading into shadow, a brass
compass rose inlaid in the dark wood floor, intimate and quiet, cinematic,
no people faces, no text, 21:9
```

### 3. Dealing room plate
```
Dark sophisticated market study room, large dim wall display showing a soft green
line chart glowing faintly, dark marble console with a notebook and fountain pen,
sage green rim light, shallow depth of field, premium and calm, no people, no text, 21:9
```

### 4. Mentor portraits (×4, same seed / style)
```
Editorial portrait, distinguished Filipino mentor in dark tailored blazer,
seated in noir lounge with warm champagne rim light, dark background with soft
gold bokeh, confident calm expression, luxury magazine photography, shallow
depth of field, vertical 4:5, no text
```
Vary: `man in his 40s` / `woman in her 30s` / etc. Keep the same style suffix.

## Wiring (after download)

Homepage hero already has the slot:
```jsx
<div className="hero__plate" data-higgsfield-slot="hero-plate" aria-hidden="true" />
```
Add the image with an inline style or a page-specific rule:
```css
.hero__plate { background-image: url('/art/hero-noir.jpg'); }
```
Keep `.hero__plate` opacity at or below 0.24 — the noir gradient must stay dominant
so ivory type keeps 7:1+ contrast.

## Guardrails
- Generations spend Higgsfield credits at standard rates; unlimited/free only on higgsfield.ai web.
- Prefer photography over illustration; the theme is "old money trading house", not fintech neon.
- If a plate looks busy at 20% opacity, it is too busy — regenerate with "minimal, dark, negative space".
- Mentor portraits: keep lighting identical across all four (same prompt suffix + seed if Higgsfield offers one).
