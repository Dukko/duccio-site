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

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Select the repo.
4. Build settings:
   - Framework preset: **None**
   - Build command: leave **empty**
   - Build output directory: `/`
5. Deploy. You get a `*.pages.dev` URL immediately.
6. Custom domain: Pages project > Custom domains > add `ducciomondanelli.com` (and `www`). If the domain's DNS is on Cloudflare, records are created automatically.

Every push to `main` auto-deploys. That's the whole pipeline.

## Adding a post

1. Copy `writing/quarterly-progress-reports.html` to a new file in `writing/`.
2. Replace title, meta description, byline, and body.
3. Add an entry to the list in `writing/index.html`.
4. Push.

No cadence. Posts ship when they ship.

## Before publishing anything work-adjacent

- [ ] Check UMN's outside-activity / conflict-of-interest policy and IP policy.
- [ ] Confirm nothing is program-internal, grant-restricted, or identifies candidates, mentors, or districts.
- [ ] Keep descriptions generic: concepts and design principles, not internal documents.
- [ ] The footer disclaimer ("views are my own") stays on every page.

The first case study still has a DRAFT banner and a placeholder outcomes section. Fill those in, get comfortable with the policy check above, then delete the banner.

## Design tokens (for consistency in future pages)

- Paper `#F6F7F5`, Ink `#1B2430`, Blueprint `#2B5BB8`, Marker `#B07A18`, Grid `#D8DCD6`, Muted `#5C6672`
- Display: Archivo 700/800. Body: Source Serif 4. Labels/metadata: IBM Plex Mono.
- Mono uppercase eyebrows label sections. Blueprint blue is the working accent; marker gold is reserved for "my layer" annotations.
