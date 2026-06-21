# Sudhir Kumar — Portfolio

A premium, interactive developer portfolio for **Sudhir Kumar** (Software Engineer II · Full Stack · AI & Agentic Systems). Built as a dark-mode-first, animation-rich single page with a configurable AI chat assistant.

## Tech stack

- **Next.js 16** (App Router, Turbopack, React Server Components) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — theme defined via `@theme` + CSS variables in `app/globals.css` (no `tailwind.config.*`)
- **Framer Motion** for animation
- **shadcn/ui** (on `@base-ui/react`) primitives
- **lucide-react** icons + inline brand SVGs (GitHub/LinkedIn) via `lib/icons.tsx`
- **cmdk** command palette, **lenis** smooth scroll
- **react-markdown** + **shiki** for chat message rendering
- **Vitest** + Testing Library

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Script              | Purpose                |
| ------------------- | ---------------------- |
| `npm run dev`       | Start the dev server   |
| `npm run build`     | Production build       |
| `npm run start`     | Serve the production build |
| `npm run lint`      | ESLint                 |
| `npm run typecheck` | `tsc --noEmit`         |
| `npm run test`      | Run Vitest unit tests  |

## Environment variables

All env vars are optional — the site runs fully (with a mock chat) out of the box. Create `.env.local` to override:

| Variable                | Default                 | Purpose |
| ----------------------- | ----------------------- | ------- |
| `NEXT_PUBLIC_CHAT_API`  | _(unset)_               | URL of the AI chat backend. When set, the chat widget POSTs to it; when unset/empty, a built-in **mock client** answers so the widget is fully demoable. |
| `NEXT_PUBLIC_SITE_URL`  | `http://localhost:3000` | Canonical/OG base URL. Set to your deployed origin (e.g. `https://sudhir.dev`) so sitemap, robots, canonical, and Open Graph tags resolve correctly. |

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CHAT_API=https://your-chat-backend/chat
```

## Editing content (data-driven)

**You never edit components to change content.** Everything lives in `data/`:

| File                    | Controls |
| ----------------------- | -------- |
| `data/hero.ts`          | Name, rotating subtitles, CTA buttons |
| `data/about.ts`         | About copy + animated stat counters |
| `data/career.ts`        | Career timeline entries |
| `data/skills.ts`        | Skill groups (no progress bars) |
| `data/experience.ts`    | Work experience cards |
| `data/projects.ts`      | Projects (filtered by `categories`) |
| `data/certifications.ts`| Certifications (unlimited) |
| `data/techUniverse.ts`  | Floating tech-node universe |
| `data/social.ts`        | Social links (icons resolved via `lib/icons.tsx`) |
| `data/navigation.ts`    | Floating dock + command palette sections |
| `data/chat.ts`          | Chat assistant suggested questions / system persona |

Adding a project / skill / cert is **only** a matter of appending an object to the relevant array — types in `types/` enforce the shape. Icons are referenced by name (string) and resolved by `getIcon()` in `lib/icons.tsx`; add a new entry there for any icon lucide-react doesn't ship.

## Replacing placeholder assets

The repo ships with clearly-marked placeholders. Replace these with the real thing:

- **Project images** — `public/projects/<project-id>.svg` (one per `id` in `data/projects.ts`). Swap in real screenshots (`.png`/`.jpg` also fine; update the `image` path in `data/projects.ts`).
- **Resume** — `public/resume.pdf` (linked from the Hero "Download Resume" CTA and the command palette). Replace with the real PDF, same filename.
- **Open Graph image** — generated at build time by `app/opengraph-image.tsx` using `next/og`. Edit that file to restyle, or replace it with a static `app/opengraph-image.png` to use a fixed image.
- **Favicon** — `app/favicon.ico`.
- **Certifications** — entries in `data/certifications.ts` are placeholders pending real credential data.
- **Project repo/demo URLs** — the `github`/`demo` fields in `data/projects.ts` are marked `// TODO real URL`.

## Wiring the real backends

### Chat assistant

The chat layer is abstracted behind a `ChatClient` interface (`lib/chat/`):

- `lib/chat/index.ts` — factory: returns `HttpChatClient` when `NEXT_PUBLIC_CHAT_API` is set, else `MockChatClient`.
- `lib/chat/http-client.ts` — **the only file to touch** to match a real backend's protocol. It already handles a streaming response body (text/SSE) and a JSON fallback (`{ reply }` or `{ content }`). It POSTs `{ messages }`. Adjust the request body or response parsing here if your HuggingFace / dedicated server uses a different contract.

To point the widget at a new server, just set `NEXT_PUBLIC_CHAT_API` — **no code changes required** for the default contract.

### Contact form

`components/sections/Contact/ContactForm.tsx` is a client-side demo form (animated validation + success state). To make it functional, wire its `handleSubmit` to your endpoint (a serverless function, Formspree, Resend, etc.) — there's a single submit handler to update.

## Architecture notes

- **Server vs client** — `app/page.tsx` and `app/layout.tsx` are Server Components. Interactive pieces are `"use client"`. Components that need `dynamic(… , { ssr: false })` are isolated in `components/ClientWidgets.tsx` (the App Router requires `ssr:false` dynamic imports to live in a client component) — used to lazy-load the chat button and the TechUniverse canvas.
- **Theme** — dark only. Tokens (`bg-background`, `bg-card`, `text-purple/indigo/cyan`) and utilities (`glass`, `text-gradient`, `noise`, `animate-shimmer/float/aurora/gradient`) are defined in `app/globals.css`.
- **SEO** — `lib/seo.ts` builds metadata (`buildMetadata()`) and the `Person` JSON-LD (`personJsonLd()`, rendered in `app/page.tsx`). `app/sitemap.ts` and `app/robots.ts` derive from `siteConfig.url`.
- **Cross-component events** — the chat widget opens via a `window` CustomEvent `"portfolio:open-chat"` (dispatched from CTAs / command palette).

## Deployment

Deploy to any Next.js host (Vercel recommended). Set `NEXT_PUBLIC_SITE_URL` (and `NEXT_PUBLIC_CHAT_API` if you have a chat backend) in the host's environment settings, then build.
