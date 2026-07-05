# Portfolio Web

A single‑page, dark‑mode developer portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. It ships with an animated hero, a data‑driven set of sections (about, experience, projects, skills, GitHub stats, certifications, education, contact), a 3D Spline background that follows the cursor, a floating section‑nav dock, a command palette, and a backend‑agnostic AI chat widget.

Everything you'd normally want to change — your name, projects, colors, the 3D scene, the chat backend — is **data or configuration**, not component code.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Quick start](#quick-start)
3. [Environment variables](#environment-variables)
4. [Project structure](#project-structure)
5. [How it's wired (architecture)](#how-its-wired-architecture)
6. [Customizing content](#customizing-content-the-datats-files) — the `data/*.ts` files
7. [Customizing the look (theme)](#customizing-the-look-theme)
8. [The 3D scene (robot) — change it or its behavior](#the-3d-scene-robot)
9. [The floating nav dock](#the-floating-nav-dock)
10. [Section order](#section-order)
11. [AI chat assistant](#ai-chat-assistant)
12. [Contact form](#contact-form)
13. [SEO & metadata](#seo--metadata)
14. [Accessibility & motion](#accessibility--motion)
15. [Scripts & quality gates](#scripts--quality-gates)
16. [Deployment](#deployment)

---

## Tech stack

| Area | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Server Components by default |
| UI runtime | **React 19** | Strict correctness rules enforced by ESLint |
| Styling | **Tailwind CSS v4** | **No `tailwind.config.*`** — theme lives in `app/globals.css` |
| Animation | **Framer Motion** (`motion` v12) | Gated on reduced‑motion |
| Smooth scroll | **Lenis** | `components/ui/SmoothScroll.tsx` |
| 3D scene | **Spline** (`@splinetool/react-spline` + `runtime`) | Lazy‑loaded WebGL |
| UI primitives | **shadcn** on **@base‑ui/react** | plus custom primitives in `components/ui/` |
| Icons | **lucide-react** (+ inline SVGs) | resolved by string name via `lib/icons.tsx` |
| Command palette | **cmdk** | `components/ui/CommandPalette.tsx` |
| Markdown (chat) | **react-markdown** + remark/rehype | |
| Testing | **Vitest** + Testing Library (jsdom) | tests live next to source as `*.test.ts(x)` |
| Language | **TypeScript** | `npm run typecheck` |

---

## Quick start

**Prerequisites:** Node.js 20+ and npm.

```bash
npm install          # install dependencies
cp .env.example .env.local   # optional — for chat/contact/SEO config
npm run dev          # start the dev server at http://localhost:3000
```

Then open <http://localhost:3000>.

Before considering any change "done", all four gates should pass:

```bash
npm run lint         # ESLint — 0 errors AND 0 warnings
npm run typecheck    # tsc --noEmit
npm run test         # Vitest
npm run build        # production build (prerenders every route as static)
```

---

## Environment variables

All are **optional** — the site runs fully without them. Copy `.env.example` to `.env.local` and fill what you need. Because they're prefixed `NEXT_PUBLIC_`, they're inlined into the client bundle at build time.

| Variable | Purpose | If unset |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL; used by metadata, `sitemap.xml`, `robots.txt`, and JSON‑LD. | Falls back to `http://localhost:3000` |
| `NEXT_PUBLIC_CHAT_API` | Endpoint for the AI chat widget. | Widget uses a built‑in **mock** client (fully demoable, no backend) |
| `NEXT_PUBLIC_CONTACT_API` | Contact‑form POST endpoint (Formspree‑compatible JSON). | Form shows a friendly "not configured" state |

---

## Project structure

```
portfolio_web/
├─ app/                     # Next.js App Router
│  ├─ layout.tsx            # Root layout — mounts global chrome (3D bg, dock, palette, …)
│  ├─ page.tsx              # The single page — orders all sections
│  ├─ globals.css           # ★ Theme tokens, colors, fonts, animations (Tailwind v4)
│  ├─ opengraph-image.tsx   # Build-time OG/Twitter social image (next/og)
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx         # 404 page
│
├─ data/                    # ★ ALL user-facing content lives here (edit these!)
│  ├─ hero.ts               # Name, title, availability badge, rotating subtitles, CTAs
│  ├─ about.ts              # About section
│  ├─ career.ts             # Career timeline
│  ├─ experience.ts         # Work experience
│  ├─ skills.ts             # Skill groups
│  ├─ projects.ts           # Projects + case-study modal content
│  ├─ githubStats.ts        # GitHub stats, heatmap, language bars
│  ├─ techUniverse.ts       # "Tech universe" animated canvas items
│  ├─ certifications.ts     # Certifications
│  ├─ education.ts          # Education
│  ├─ social.ts             # Social links (LinkedIn, GitHub, Email)
│  ├─ navigation.ts         # Floating dock nav items
│  ├─ chat.ts               # Chat greeting + suggested questions
│  ├─ site.ts               # Location, timezone
│  └─ mascot.ts             # (Legacy mascot data — not rendered)
│
├─ types/index.ts           # TypeScript shapes for every data file
│
├─ components/
│  ├─ sections/             # One folder per page section (Hero, About, Projects, …)
│  ├─ ui/                   # Reusable primitives + global chrome
│  │  ├─ SplineBackground.tsx  # ★ The 3D scene (robot) + cursor tracking
│  │  ├─ FloatingDock.tsx      # ★ Left vertical section-nav dock
│  │  ├─ CommandPalette.tsx, MouseGradient.tsx, NoiseOverlay.tsx, …
│  │  └─ GlassCard, GlowBorder, Spotlight, MagneticButton, TiltCard, …
│  ├─ animations/           # Framer Motion wrappers (Reveal, Parallax, TextReveal, …)
│  ├─ ai/                   # Chat widget UI (ChatButton, ChatWindow, ChatInput, …)
│  └─ ClientWidgets.tsx     # ★ All `dynamic(..., { ssr:false })` lazy mounts
│
├─ hooks/                   # useMediaQuery, useReducedMotionSafe, useActiveSection, useChat, …
│
├─ lib/
│  ├─ seo.ts                # ★ siteConfig + buildMetadata() + personJsonLd()
│  ├─ icons.tsx             # getIcon() — resolves icon strings to components
│  ├─ seeded.ts             # Deterministic randomness (no hydration mismatches)
│  ├─ utils.ts              # cn() classname helper
│  └─ chat/                 # Backend-agnostic chat client (interface + http + mock)
│
└─ public/                  # Static assets (resume.pdf, project images, favicon, …)
```

★ = the files you'll most often touch when customizing.

---

## How it's wired (architecture)

- **Single page.** `app/page.tsx` (a Server Component) renders JSON‑LD plus the ordered sections. `app/layout.tsx` mounts the persistent chrome that surrounds every route: the 3D background, mouse‑gradient glow, scroll progress bar, smooth scroll, loading screen, floating dock, command palette, noise overlay, back‑to‑top, and custom cursor.
- **Data‑driven — never edit components to change content.** Everything user‑facing is an object in `data/*.ts`, typed by `types/index.ts`. Adding a project / skill / cert is just appending an object to the relevant array; the types enforce the shape.
- **Icons by string name.** Icons are referenced as strings (e.g. `icon: 'Github'`) and resolved at render by `getIcon()` in `lib/icons.tsx`. lucide‑react v1 dropped some brand glyphs, so GitHub/LinkedIn etc. are inline SVGs there — add new entries in that file for any icon lucide doesn't ship.
- **Client vs. Server Components.** Interactive pieces are `"use client"`. Anything using `dynamic(..., { ssr:false })` **must** live in a Client Component — all such lazy mounts are centralized in `components/ClientWidgets.tsx` (`LazyChatButton`, `LazyTechUniverse`, `LazySplineScene`). Don't add `ssr:false` dynamics to Server Components.
- **React 19 correctness is enforced as ESLint errors.** No impure values (e.g. `Math.random()`) during render — use the seeded helper in `lib/seeded.ts`. Unused vars must be prefixed with `_`.

---

## Customizing content (the `data/*.ts` files)

This is where you make the site yours. Open a file, edit the objects, save — the UI updates. The TypeScript types in `types/index.ts` will tell you if a field is missing or wrong.

| Want to change… | Edit | Example |
| --- | --- | --- |
| Your name, headline, rotating taglines, "available" badge, hero buttons | `data/hero.ts` | flip `availability.show` to `false` to hide the badge |
| About / bio text | `data/about.ts` | |
| Career timeline milestones | `data/career.ts` | |
| Jobs / work history | `data/experience.ts` | |
| Skill groups & items | `data/skills.ts` | |
| Projects & their case‑study modals | `data/projects.ts` | placeholder images in `public/projects/*.svg` |
| GitHub stats, contribution heatmap, top languages | `data/githubStats.ts` | |
| "Tech universe" floating items | `data/techUniverse.ts` | |
| Certifications | `data/certifications.ts` | |
| Education | `data/education.ts` | |
| Social links (LinkedIn/GitHub/Email) | `data/social.ts` | drives hero icons, contact channels, and JSON‑LD `sameAs` |
| Which sections appear in the nav dock (and order) | `data/navigation.ts` | each item's `icon` is a lucide name |
| Chat greeting + suggested questions | `data/chat.ts` | |
| Location / timezone | `data/site.ts` | |

> **Placeholders to replace:** `public/resume.pdf`, `public/projects/*.svg`, and any field marked `// TODO real URL` in `data/projects.ts`, `data/certifications.ts`, and `data/social.ts`.

---

## Customizing the look (theme)

**There is no `tailwind.config.js`.** In Tailwind v4 the entire theme is defined in **`app/globals.css`** using `@theme inline` plus CSS custom properties. Add or change design tokens there — not in a JS config.

### Brand colors
The three accent colors are CSS variables (defined in both `:root` and `.dark`):

```css
/* app/globals.css */
--accent-purple: #a855f7;
--accent-indigo: #8b5cf6;   /* holds a violet, intentionally not blue */
--accent-cyan:   #22d3ee;
```

Change these three and the gradients, buttons, dock highlight, glows, and text‑gradient all update. Use them in classes as `text-purple` / `bg-purple` / etc., or as `var(--accent-purple)` in inline styles.

### Other tokens

| Token(s) | Controls |
| --- | --- |
| `--background`, `--foreground`, `--card`, `--border`, … (in `.dark`) | Dark‑theme surface & text colors |
| `--radius` | Global corner rounding (`--radius-sm/md/lg/xl/…` derive from it) |
| `--font-sans`, `--font-mono` | Fonts (Geist, wired in `app/layout.tsx`) |
| `--animate-shimmer / float / aurora / gradient` | Named animations — use as `animate-shimmer`, etc. |
| Utilities `glass`, `text-gradient`, `noise` | Frosted‑glass card, gradient text, grain overlay |

> The site is **dark‑mode only** (`<html class="dark">` in `app/layout.tsx`). The `:root` light values exist for completeness but aren't used.

---

## The 3D scene (robot)

The floating 3D robot is a **Spline** scene rendered full‑viewport behind all content and mounted once in the root layout. Everything about it lives in **`components/ui/SplineBackground.tsx`**.

### Change the model (a different robot / object)

The scene is a single URL near the top of the file:

```ts
// components/ui/SplineBackground.tsx
const SPLINE_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";
```

> ⚠️ This is a **placeholder demo scene** (see the `// TODO real URL` note). Replace it.

To swap it:

1. Get a scene from [spline.design](https://spline.design) — browse the community or build/edit your own in the free editor.
2. **Export → Public URL**, or **Download** the `scene.splinecode`.
3. Either paste the new public URL into `SPLINE_SCENE`, **or** (recommended) put the downloaded file in `public/` and use a local path:
   ```ts
   const SPLINE_SCENE = "/scene.splinecode";
   ```
   Self‑hosting avoids depending on someone else's `prod.spline.design` URL, which can change or disappear.

### Change how it behaves (from code)

These knobs are all in `SplineBackground.tsx` — no Spline account needed:

| Want | How |
| --- | --- |
| **Dimmer / brighter** | change `opacity-60` on the wrapper `<div>` |
| **Reposition** (e.g. a corner instead of full‑bleed) | change `fixed inset-0` → e.g. `fixed bottom-0 right-0 h-[60vh] w-[40vw]` |
| **Layer order** | change `z-0` (content sits at `z-10`) |
| **Let users click/drag it** | remove `pointer-events-none` (⚠️ it will then intercept clicks over your content) |
| **Turn cursor‑following off** | delete the `useEffect` block that forwards pointer events |
| **Change when it's active** | it's gated to desktop by `useMediaQuery("(min-width: 768px) and (pointer: fine)")` and disabled under reduced motion; adjust or remove those guards |

**Why the cursor‑forwarding exists:** the layer is `pointer-events-none` so it never blocks clicks, but this scene tracks the mouse via *canvas‑scoped* pointer events — which a click‑through canvas would never receive. So the effect listens on `window` and re‑dispatches synthetic `pointermove` events (with `clientX/clientY`, `pointerType:"mouse"`) onto the canvas, rAF‑throttled. If you swap in a scene that tracks the mouse differently, this is the spot to adjust.

### Change the model's *own* animations
The robot's built‑in actions (idle bob, look‑at‑cursor, click reactions, lighting, camera) are baked into the `.splinecode` file itself. Those are edited in the **Spline editor** and re‑published — they can't be changed from React.

### Remove the 3D scene entirely
Delete the `<SplineBackground />` line in `app/layout.tsx` (and, if you like, the component + its `LazySplineScene` export in `components/ClientWidgets.tsx`).

---

## The floating nav dock

`components/ui/FloatingDock.tsx` renders the section‑navigation dock. It is **fixed to the left, vertical, and centered**, magnifies icons based on the cursor's vertical position, highlights the active section, and smooth‑scrolls on click. Tooltips appear to the right of each icon on hover.

| Want | How |
| --- | --- |
| Which items show / their order | edit `data/navigation.ts` |
| An item's icon | set its `icon` to a lucide name (e.g. `'Briefcase'`) |
| Reposition (e.g. back to bottom‑center, horizontal) | `fixed left-4 top-1/2 -translate-y-1/2` → `fixed bottom-6 left-1/2 -translate-x-1/2`, and flip the inner `flex flex-col` to `flex items-end`, and track `mouseX`/`clientX` instead of `mouseY`/`clientY` |
| Magnification strength / spread | `MAX_SCALE` and `SPREAD` constants |
| Icon size | `ICON_SIZE` constant |

---

## Section order

The order sections render is the JSX in **`app/page.tsx`**. Reorder, add, or remove sections there:

```
Hero → About → CareerTimeline → Skills → Experience → Projects
     → GithubStats → TechUniverse → Certifications → Education → Contact
```

Sections flow directly into one another (no divider motif) for a continuous one‑page feel; each section supplies its own vertical padding. If you add a section, also add a matching entry to `data/navigation.ts` (matching the section's `id`) so it appears in the dock.

---

## AI chat assistant

The chat widget is **backend‑agnostic**. `lib/chat/` defines a `ChatClient` interface, and `lib/chat/index.ts` is a factory:

- **`NEXT_PUBLIC_CHAT_API` set** → uses `HttpChatClient` (POSTs `{ messages }`; handles a streaming body or JSON `{ reply }` / `{ content }`).
- **unset** → uses `MockChatClient`, so the widget is fully demoable with no backend.

To point at a real backend that follows the default contract, **just set the env var — no code changes.** For a different protocol, `lib/chat/http-client.ts` is the only file to edit. Greeting text and the suggested‑question chips come from `data/chat.ts`. The widget can be opened from anywhere by dispatching the `window` CustomEvent `"portfolio:open-chat"`.

---

## Contact form

`components/sections/Contact/` renders a centered contact card with a message form and your social channels (from `data/social.ts`). Set **`NEXT_PUBLIC_CONTACT_API`** to a Formspree‑compatible endpoint (accepts a JSON POST) to receive submissions. If unset, the form shows a friendly "not configured" state.

---

## SEO & metadata

Centralized in **`lib/seo.ts`**:

- `siteConfig` — your name, job title, page title, description, and URL (from `NEXT_PUBLIC_SITE_URL`).
- `buildMetadata()` — builds the Next.js `Metadata` (title template, Open Graph, Twitter, robots, canonical). Wired in `app/layout.tsx`.
- `personJsonLd()` — the Person structured‑data schema (its `sameAs` is derived from your `data/social.ts` links). Injected in `app/page.tsx`.

The social share image is generated at build time by **`app/opengraph-image.tsx`** (`next/og`) — it's the single source for the OG/Twitter image, so don't hardcode image URLs in `seo.ts`. `sitemap.ts` and `robots.ts` derive from `siteConfig.url`.

---

## Accessibility & motion

- **Reduced motion is respected everywhere.** Animations are gated on `useReducedMotionSafe()`; the 3D scene, particles, and heavy effects switch off when a visitor prefers reduced motion.
- **Touch / coarse pointers** are detected via `useMediaQuery()` (built on `useSyncExternalStore`, SSR‑safe). Cursor‑driven effects (the 3D tracking, custom cursor) are desktop‑only.
- Interactive elements carry `aria-label`s and visible focus rings.

---

## Scripts & quality gates

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) at <http://localhost:3000> |
| `npm run build` | Production build — prerenders all routes as static |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint — must be **0 errors and 0 warnings** |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest (run mode) |

Run a single test file: `npx vitest run lib/chat/mock-client.test.ts`. Watch a file: `npx vitest hooks/useChat.test.ts`. Tests live next to their source as `*.test.ts(x)`; setup is `vitest.setup.ts` (jsdom + jest‑dom).

**All four gates (`lint`, `typecheck`, `test`, `build`) should pass before shipping a change.**

---

## Deployment

The build output is fully static (every route prerenders), so it deploys anywhere that runs a Next.js app — **Vercel** is the zero‑config path. Set your environment variables (at minimum `NEXT_PUBLIC_SITE_URL`) in the host's dashboard, then build with `npm run build`.
