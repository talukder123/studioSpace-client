<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Next.js 16.4.5 (App Router, Turbopack) + React 19.3 + Tailwind CSS v4 + shadcn/ui, single package (no monorepo), npm (`package-lock.json` — don't introduce another lockfile). Swiper 14 drives the home hero carousel. `README.md` is stock create-next-app boilerplate and stale (paths omit `src/`); trust the code.

## Commands

- `npm run dev` — Turbopack dev server. One per directory: a second instance exits with "Another next dev server is already running." plus the running server's URL and PID (lockfile in `.next/dev/lock`).
- `npm run build` — compile, then TypeScript check, then static prerender (in that order).
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`); append `-- <path>` to lint one file (e.g. `npm run lint -- src/app/page.tsx`).
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script.
- No tests, no formatter, no CI. Verification loop: `npm run lint` + `npx tsc --noEmit`, then `npm run build` before finishing.
- Fresh clone: run `npm run dev` or `npm run build` once before `tsc`. `layout.tsx` uses the generated global `LayoutProps<"/">` (declared in `.next/types/routes.d.ts`, pulled in by the gitignored `next-env.d.ts`); without it, tsc fails with "Cannot find name 'LayoutProps'".

## Red checks: known pre-existing failures

Seen before any of your changes — don't chase them:

- `npm run lint` fails with 2 `react-hooks/set-state-in-effect` errors in shadcn-generated code: `src/components/ui/carousel.tsx:98` and `src/hooks/use-mobile.ts:14`.
- `npm run build` fails during prerender: `src/components/footer.tsx:144` calls `new Date().getFullYear()`, which `cacheComponents: true` rejects as an unstable value in static output (first error surfaces on `/_not-found`, build exits). The compile and TypeScript phases pass.
- `npx tsc --noEmit` passes — treat any new type error as yours.

## Casing: `src/components` and component files

- On disk and in every import specifier the folder is lowercase `src/components/` (renamed from `Components` during development) — keep it that way.
- `git` still records the tracked files as `src/Components/navbar.tsx` and `src/Components/footer.tsx`, and `core.ignorecase=true` hides this mismatch from `git status`. On a case-sensitive checkout (Linux CI, Vercel) those files land in `src/Components/` while `layout.tsx` imports `@/components/navbar` → module not found.
- Before committing, run `git ls-files src`: if it still lists `src/Components/...`, force the index to the lowercase path (two-step `git mv` via a temp name, then `git add`). Don't rewrite imports back to capital — lowercase is the correct side.
- File-name casing is mixed and import specifiers must match exactly: `navbar.tsx`, `footer.tsx`, and `homeCompo/banner.tsx` are lowercase, while `homeCompo/HeroSlider.tsx` is PascalCase (imported as `./HeroSlider`). Windows hides mismatches that break case-sensitive builds.

## Structure

- `src/app/` — routes only: `layout.tsx` (root layout wraps every page in Navbar + Footer; loads Google Sans Flex + Geist fonts) and `page.tsx` (renders `<BannerSection />`). No API routes, no env vars.
- `src/components/homeCompo/` — home-page sections: `banner.tsx` (default export `BannerSection`, not `Banner`) defines the three hero slides and renders `HeroSlider`; `HeroSlider.tsx` is the `"use client"` Swiper carousel (autoplay, nav, pagination) and imports its images from `src/assets/hero/`.
- `src/components/` — layout chrome (`navbar.tsx`, `footer.tsx`) plus `ui/` (63 generated shadcn components). No app component imports `ui/` yet — treat the kit as installed inventory, not a design system in use.
- `src/assets/` — imported as Next static images via `@/assets/...`; one filename contains a space (`hero/seminar hall.png`), so keep its import specifier quoted and exact.
- `src/lib/` — `utils.ts` re-exports `cn` from the `cn` package (app code imports `cn` from `@/lib/utils`, shadcn files import from `"cn"` directly — same object). `highlighter.tsx` is a lazy-loaded shiki core: code only highlights if its language is listed in the `languages` map there (returns null otherwise).
- `src/hooks/` — `use-mobile` (used only by `ui/sidebar`), `use-highlighted-code` (not called anywhere yet).
- shadcn style is `base-nova`: primitives come from `@base-ui/react` (not Radix), icons from lucide. Add components via the shadcn CLI (`components.json`), not by hand.

## Toolchain

- React Compiler is enabled (`reactCompiler: true` + `babel-plugin-react-compiler` in devDeps) — write compiler-compatible code; lint enforces react-hooks rules.
- Next 16 deprecated `next/image`'s `priority` prop in favor of `preload` (see `HeroSlider.tsx`); use `preload` for above-the-fold images.
- `next.config.ts` also sets `cacheComponents: true` and `partialPrefetching: true` — Next 16 caching/async-page semantics differ from older defaults (the footer `new Date()` failure above is one of them); consult `node_modules/next/dist/docs/` before assuming.
- Tailwind v4 is CSS-first: no `tailwind.config.*` — theme/tokens live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme`), compiled via the `@tailwindcss/turbopack` rule in `next.config.ts`.
- `next build` prints a non-fatal warning about missing fallback values for font `Google Sans Flex` (skips fallback font generation); ignore it.
