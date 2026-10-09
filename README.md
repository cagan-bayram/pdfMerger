# Stack PDF

A PDF merger that runs entirely in the browser. Files are never uploaded —
there is no backend to upload them to. The site builds to a static export, so
serving it costs nothing per merge and scales with CDN traffic rather than CPU.

```
app/              routes (/, /privacy, /terms, robots.txt, sitemap.xml)
components/       merger.tsx (tool state), sheet-row.tsx (one file), ad-slot.tsx
lib/merge.ts      PDF inspection + merging, pdf-lib loaded on first use
lib/site.ts       site name, canonical URL, ad publisher id
cli/pdfMerger.py  the original local script; unrelated to the site
```

Built with Next.js (App Router, static export), Tailwind, pdf-lib for the PDF
work and dnd-kit for reordering.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
```

`npm run build` writes `out/`, which any static host will serve.

`NEXT_PUBLIC_SITE_URL` sets the canonical URL, Open Graph tags, `robots.txt`
and `sitemap.xml`. Copy `.env.example` to `.env.local` to override it locally.

## How the merge works

Each file is checked by its leading bytes rather than its extension, then
opened to count pages. Merging copies every page of every document into a new
one in list order, and the result is handed back as a blob the browser
downloads. All of it happens on the main thread in the user's tab.

Worth knowing:

- Page content, text, images and vector graphics are copied exactly. Form
  fields and bookmarks are not carried over; the output is flat. Any signature
  on a source document is invalidated by merging, as it is in every tool,
  because the signed bytes change.
- Encrypted PDFs are refused with a message rather than silently skipped.
- `pdf-lib` is ~400 kB and loads on first use rather than first paint, which
  keeps it out of the initial bundle.
- Ad slots reserve their space and load no script unless an ad publisher id is
  configured, so a blocked or absent ad never shifts the layout.
- There is no file size limit beyond available memory. If very large files ever
  feel janky, moving the merge to a Web Worker is the next step.
