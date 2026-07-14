# ReCircuit

**Recycle your electronics the right way — San Diego.**

ReCircuit is a fast, no-login web app that helps San Diego County residents find
certified e-waste drop-off locations. Search by device or neighborhood, sort by
distance from where you are, and get one-tap directions — with a short primer on
why keeping electronics out of the landfill actually matters.

🔗 **Live:** https://shaheeralamkhan.github.io/waste-disposal/

<!-- Add a screenshot at docs-assets/hero.png and uncomment:
![ReCircuit hero](docs-assets/hero.png)
-->

---

## Why this exists

E-waste is the fastest-growing waste stream in the world, and only about a fifth
of it is recycled properly. The rest leaches lead, mercury, and cadmium into soil
and groundwater — and in California, tossing electronics in the trash is actually
illegal. Most people *want* to do the right thing; they just don't know where to
go. ReCircuit removes that friction: it answers "where do I take this, and how do
I get there?" in a couple of taps.

## Features

- **Distance-aware search** — one tap on *Use my location* sorts every site by
  real distance using the Haversine formula; results re-rank instantly.
- **Free-text search** — match on facility name, city, ZIP, or accepted device
  ("TV", "battery", "laptop"…) with live, debounce-free filtering.
- **Rich location cards** — address, hours, and accepted-item chips, plus inline
  actions: Google/Apple Maps directions, click-to-call, copy address, and website.
- **Environmental impact estimator** — pick a device and quantity to see the CO₂,
  energy, water, and recoverable precious metals your drop-off keeps in the loop.
- **"Why it matters" primer** and an animated, source-cited stats band
  (UN Global E-waste Monitor 2024).
- **Accessible by default** — semantic landmarks, a skip link, labeled controls,
  visible focus rings, `aria-live` result counts, and full keyboard support.
- **Responsive + theme-aware** — mobile-first layout that adapts cleanly to light
  and dark system themes, with `prefers-reduced-motion` respected throughout.

## Design

ReCircuit is styled as a calm, trustworthy civic-tech product rather than a
"green = neon" cliché:

- A **token-driven design system** in `globals.css` (`--brand`, `--surface`,
  `--muted-foreground`, …) wired into Tailwind v4 via `@theme inline`, so every
  component themes light/dark from one source of truth.
- A restrained **emerald + teal** palette on warm, low-chroma neutrals.
- A layered **aurora + dot-grid hero**, soft card elevation, and subtle
  micro-interactions (hover lift, count-up-on-scroll, staggered fade-ins).

## Tech stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | Next.js 15 (App Router)                            |
| UI          | React 19, TypeScript                               |
| Styling     | Tailwind CSS v4 (CSS-first `@theme`)               |
| Fonts       | Geist Sans / Geist Mono via `next/font`            |
| Hosting     | GitHub Pages (fully static export)                 |
| Deploy      | GitHub Actions → `docs/`                           |

No backend, no database, no runtime APIs — the entire app is statically exported
and served from a CDN, so it loads fast and costs nothing to run.

## Architecture notes

- **Static-export friendly.** Geolocation, directions, clipboard, and the impact
  estimator all run client-side; there are no server routes to break the export.
- **Single source of truth for data.** Every drop-off site lives in
  `src/data/locations.ts` as a typed `EWasteLocation[]`; adding a location is a
  one-object edit.
- **Small, focused components.** `SiteHeader`, `LocationCard`, `ImpactCalculator`,
  `StatsStrip`, and `EWasteIntro` each own one job and share the design tokens.

```
src/
├── app/
│   ├── layout.tsx        # metadata, fonts, theme color
│   ├── page.tsx          # state: search + geolocation, list orchestration
│   └── globals.css       # design tokens + Tailwind theme + keyframes
├── components/
│   ├── SiteHeader.tsx / SiteFooter.tsx / BrandMark.tsx
│   ├── FindNearMeButton.tsx
│   ├── LocationList.tsx  # empty state + result count
│   ├── LocationCard.tsx  # card + inline actions
│   ├── ImpactCalculator.tsx
│   ├── EWasteIntro.tsx   # "why it matters"
│   └── StatsStrip.tsx    # count-up-on-scroll stats
├── data/locations.ts     # typed location dataset
└── utils/                # distance (Haversine), device detection
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Production build (GitHub Pages)

```bash
npm run build:gh-pages
```

This runs `next build` with `output: 'export'`, `basePath: '/waste-disposal'`,
and `distDir: 'docs'`, emitting a static site into `docs/` that GitHub Pages
serves. Deployment is automated via `.github/workflows/deploy.yml` on push.

## Adding a location

Append a typed entry to `src/data/locations.ts`:

```ts
{
  id: "6",
  name: "Example Recycler",
  address: "123 Main St",
  city: "San Diego",
  state: "CA",
  zip: "92101",
  latitude: 32.7157,
  longitude: -117.1611,
  phone: "(619) 555-0100",          // optional
  website: "https://example.com",    // optional
  acceptedWaste: ["Computers", "Monitors", "Batteries"],
  hours: "Mon–Sat: 8am–5pm",         // optional
}
```

## Data & accuracy

Location details are compiled from public listings. Hours and accepted items
change often, so ReCircuit reminds users to call ahead before a trip. The impact
figures are rounded estimates drawn from published e-waste research and are meant
to illustrate scale, not certify exact outcomes.

---

Built by **Shaheer Alam Khan** as a civic-tech portfolio project.
