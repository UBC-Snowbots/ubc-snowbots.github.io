# UBC Rover — team website

A rebuild of the UBC Rover site, styled after Relativity Space, Anduril and UBC
Formula Electric: a cinematic home page whose sections are full-bleed panels you
click into.

Static export — it deploys to GitHub Pages exactly like the current
`ubcrover.github.io` repo, or to Vercel/Netlify with no changes.

---

## Quick start

```bash
bun install
bun run dev          # http://localhost:3000
```

| Script                   | What it does                                               |
| ------------------------ | ---------------------------------------------------------- |
| `bun run dev`            | Dev server with hot reload                                 |
| `bun run build`          | Static export into `out/`                                  |
| `bun run start`          | Serve the built `out/` to check the real production output |
| `bun run lint`           | ESLint                                                     |
| `bun run typecheck`      | `tsc --noEmit`                                             |
| `bun run format`         | Prettier write (Tailwind class sorting included)           |
| `bun run check`          | format check + lint + typecheck + build, in one go         |
| `bun run optimize:media` | Image compression report (see **Media** below)             |

---

## Editing content

**Almost everything lives in [`lib/content.ts`](lib/content.ts).** Member counts,
lead names and roles, sub-team charters, competitions, sponsor tiers, navigation
and the recruitment flag are all there. Change that file and every page follows —
you should rarely need to touch a `page.tsx` to update facts.

**Every factual claim on the site traces back to the old site or the flyer.**
Sponsor tier membership, lead names and roles, sub-team charters, the member
count and the competition descriptions are copied, not paraphrased. In
particular there is deliberately **no** claim about experience requirements,
training, or tiered sponsor benefits — the source says nothing about any of
those, and promising them would commit the team to a policy it never wrote.
Keep that bar when you add copy.

The contact form posts to the same Formspree endpoint (`mojkoall`) the previous
site used, so submissions keep arriving in the existing inbox.

Two things worth knowing:

- `RECRUITMENT.open` is the single flag that flips the Join page status. Set it to
  `true` in September.
- `SECTIONS[].span` is `"wide"` or `"narrow"` and controls the home page mosaic.
  With five tiles the working pattern is **one wide, then two rows of two
  narrow** — a second wide tile strands one tile beside an empty cell.

---

## Design system

The palette is sampled directly from the team recruitment flyer, not invented:

| Token        | Hex       | Source on the flyer            |
| ------------ | --------- | ------------------------------ |
| `navy-850`   | `#0F2141` | the top field                  |
| `navy-950`   | `#070D1B` | deepened, for the site ground  |
| `indigo-600` | `#37447D` | the lower field                |
| `indigo-400` | `#47548E` | lower field, gradient end      |
| `amber-500`  | `#DA9C3E` | the diagonal rule — the accent |
| `rust-500`   | `#93331D` | the second diagonal rule       |
| `sand-400`   | `#B7A99C` | the desert ground in the photo |

The flyer's angled multi-stripe rule is reproduced as a pure CSS gradient
(`.stripe-rule` in `app/globals.css`) — no image request, and it re-colours with
the tokens.

Type: **Archivo** display, **Inter** body, **JetBrains Mono** for the tracked
uppercase micro-labels. All self-hosted by `next/font` at build time, so the
static export makes zero requests to Google.

### Where each reference site shows up

- **Anduril** — the black-ground clickable media grid, hairline borders, uppercase
  mono micro-labels, index numbers on tiles.
- **Relativity Space** — the full-bleed cinematic hero, letterspaced eyebrows,
  generous vertical air between sections.
- **UBC Formula Electric** — UBC navy, the oversized wordmark locked over a photo,
  the marquee ticker, alternating split panels on interior pages.

---

## Motion

All animation is CSS on `transform`/`opacity` only, so it stays on the compositor
and never repaints during scroll. There is no animation library.

- `components/Reveal.tsx` shares **one** `IntersectionObserver` across every
  revealing element on the page and unobserves each one after it fires.
- `components/Header.tsx` switches to its opaque state via a 1px sentinel and an
  observer — deliberately **not** a scroll listener.
- `prefers-reduced-motion: reduce` disables movement while keeping all content
  visible, and a `<noscript>` rule in `app/layout.tsx` reveals everything if
  scripting is unavailable.

---

## Media

`public/media/` holds the **original, uncompressed** photos carried over from
`ubcrover.github.io` — a deliberate team decision. That means roughly 50 MB of
images, with several single files in the 4–7 MB range, and the homepage hero is
one of them.

When that starts to hurt:

```bash
bun run optimize:media              # dry run — prints before/after sizes
bun run optimize:media -- --apply   # rewrites public/media in place
```

`--apply` copies every original into `assets-src/` (gitignored) before touching
anything, so the full-resolution files are never lost. It uses stock ImageMagick.

> **Note:** the ubcrover repo contains **no video** — not in the working tree and
> not anywhere in its git history. Every asset here is a still image.

---

## Deploying

`bun run build` writes a complete static site to `out/`.

`public/.nojekyll` stops GitHub Pages from stripping the `_next/` directory and
is copied into `out/` on build.

**Pages must be set to "GitHub Actions"** (Settings -> Pages -> Source). On the
default "Deploy from a branch" setting Pages runs Jekyll over the repository
source, finds no `index.html` at the root, and renders `README.md` instead of
the site.

There is deliberately **no `public/CNAME`**. Add one only when you know which
custom domain this deployment should own — a Pages site claims that domain
exclusively, so committing the wrong one takes the domain away from whichever
repo currently serves it.

> **Custom domains:** a domain can only be claimed by one Pages site at a time.
> `www.ubcrover.com` is served by `ubcrover/ubcrover.github.io`; `snowbots.ca`
> was served from the root `CNAME` of this repo's previous contents. Whichever
> you want here, add it as `public/CNAME` and set it under Settings -> Pages.
