# Ali Raza Portfolio

Official portfolio of Ali Raza showcasing software engineering projects, technical blogs, and development journey.

**Author:** Ali Raza  
**Website:** https://ali-raza-py.me

## Overview

This is a professional developer portfolio built with Next.js 16, Tailwind CSS, and a markdown-driven content system. It features:

- **Fast & Static:** Deployed to GitHub Pages with static export
- **Markdown Content:** Projects and blog articles managed as markdown files
- **Dark/Light Theme:** Smooth theme switching with localStorage persistence
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **SEO Optimized:** Automatic sitemap, robots.txt, and RSS generation

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Building

Create an optimized production build:

```bash
npm run build
```

The static site is generated in the `out/` directory, ready for deployment.

## Deployment

This portfolio is configured for **GitHub Pages** using a static export and GitHub Actions workflow.

See [.github/workflows/pages.yml](.github/workflows/pages.yml) for deployment configuration.

## Structure

```
app/                    # Next.js app directory
├── page.tsx            # Homepage
├── blog/               # Blog routes
├── projects/           # Projects routes
└── layout.tsx          # Root layout with theme detection

components/             # React components
├── portfolio/          # Homepage sections (hero, education, etc.)
├── content/            # Blog & projects browsers
└── ui/                 # Reusable UI components

content/                # Markdown content
├── blog/               # Blog articles
└── projects/           # Project case studies

lib/                    # Utilities & helpers
public/                 # Static assets

scripts/                # Build scripts (SEO generation)
```

## Features

- **Theme System:** Light mode by default, dark mode available with localStorage persistence
- **Empty States:** Graceful "Coming Soon" states when no blog/project content exists
- **Markdown Engine:** Gray-matter for frontmatter, React Markdown with remark/rehype plugins
- **Reading Time:** Automatic calculation for blog articles
- **Smooth Animations:** Framer Motion for polished transitions
- **Type Safe:** Full TypeScript support

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Content:** Gray-matter, React Markdown
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages (Static Export)

## License

Personal portfolio of Ali Raza. All rights reserved.
