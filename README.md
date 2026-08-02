# ducciomondanelli.com

Personal site. Static HTML and CSS, no build step, no framework, no dependencies. Designed to survive being ignored for a month.

## Structure

```
/
├── index.html                              About (homepage)
├── styles.css                              All styling
├── writing/
│   ├── index.html                          Writing list
│   └── quarterly-progress-reports.html     Case study 01 (DRAFT)
└── projects/
    └── index.html                          Work + Lab shelves
```

## RSS feed

`feed.xml` is generated from `writing/index.html` (entry order/blurbs) and each
post's `<meta name="date" content="YYYY-MM-DD">` tag — it is not hand-edited.

- Regenerate manually: `node scripts/build-feed.js`
- It also regenerates automatically on `git commit` whenever a `writing/`
  file is staged, via the hook in `.githooks/pre-commit`. On a fresh clone,
  enable it once with `git config core.hooksPath .githooks`.
- Adding a new post: add its `<meta name="date">` tag, add it to
  `writing/index.html`'s entry list, then commit (or run the script by hand).

## Design tokens (for consistency in future pages)

- Paper `#F6F7F5`, Ink `#1B2430`, Blueprint `#2B5BB8`, Marker `#B07A18`, Grid `#D8DCD6`, Muted `#5C6672`
- Display: Archivo 700/800. Body: Source Serif 4. Labels/metadata: IBM Plex Mono.
- Mono uppercase eyebrows label sections. Blueprint blue is the working accent; marker gold is reserved for "my layer" annotations.
