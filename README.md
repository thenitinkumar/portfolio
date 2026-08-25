# nitinkumar.dev

Personal portfolio of Nitin Kumar R — Backend Engineer at Deloitte.

## Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v4 + shadcn/ui
- **Fonts** — Geist / Geist Mono
- **Theme** — next-themes (light / dark / system)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata, fonts
│   ├── page.tsx         # Home page
│   ├── globals.css      # Global styles, design tokens
│   ├── robots.ts        # robots.txt
│   └── sitemap.ts       # sitemap.xml
├── components/
│   ├── ui/              # shadcn primitives (button, badge…)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ContribGraph.tsx # GitHub contribution graph
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Connect.tsx
│   ├── Footer.tsx
│   ├── Intro.tsx        # First-visit language animation
│   ├── RoleCycler.tsx
│   ├── Reveal.tsx       # Scroll-reveal wrapper
│   └── ThemeProvider.tsx
├── data/
│   ├── projects.ts      # Project list — edit content here
│   ├── experience.ts    # Work history — edit content here
│   └── skills.ts        # Skill groups — edit content here
└── lib/
    ├── utils.ts
    └── tech-links.ts    # Tech name → official docs URL
```

## Development

```bash
npm install
npm run dev
```

## Before deploying

1. Drop your `resume.pdf` into `public/`
2. Add an `og.png` (1200×630) into `public/` for social previews
3. Update `BASE_URL` in `src/app/layout.tsx` to your actual domain
4. Update the URL in `src/app/robots.ts` and `src/app/sitemap.ts`
