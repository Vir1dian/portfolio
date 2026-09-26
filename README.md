# Gavin Torrecampo · Portfolio

Personal portfolio of Gavin Torrecampo, a UCLA Computer Science senior (graduating June 2027) working toward game production, technical design, and gameplay/tools engineering.

**Live site:** https://vir1dian.github.io/portfolio/

## Stack

- Vue 3 + TypeScript, built with Vite
- Deployed to GitHub Pages by GitHub Actions on every push to `main` (`.github/workflows/jekyll-gh-pages.yml`; despite the file name, it runs a Vite build)
- Contact form sends through Formspree

## Running locally

```bash
npm ci          # install exact dependency versions
npm run dev     # local dev server
npm run build   # type-check + production build (same as CI; run before pushing)
```

## Editing content

All site text lives in `src/data/content.ts`. Components only render it.

| Export | What it controls |
| --- | --- |
| `SITE` | Name, navbar tagline, and hero sentence |
| `FEATURED` | Large case-study cards at the top of Projects (stats strip, highlights, thumbnail) |
| `PROJECTS` | Project cards. `category: 'game'` goes under Game Projects, anything else under Other Projects. `layout: 'top'` puts the thumbnail above the text (wide images, long entries); the default `'side'` puts it beside the text. |
| `EXPERIENCE`, `ACADEMICS` | About section cards |
| `SKILLS` | Skill chips and the Technical Skills table. Only entries with a `group` appear in the table; ungrouped skills can still be used as chips on cards. |
| `CONTACTS` | Account shortcuts in the Contact section |

Formatting in content fields:

- `\n` inside `content_text` renders as a line break.
- `highlights: [...]` renders as a bullet list.

Images:

- Thumbnails go in `src/assets/` and are referenced by file name (e.g. `thumbnail: "terrarium.png"`).
- Icons go in `src/assets/icons/`.
- Keep thumbnails reasonably small (a few hundred KB), since every image ships with the page.

## Gotchas

- **Page title:** `index.html` has a static `<title>` that crawlers and link previews read. Update it whenever `SITE.name` or `SITE.tagline` changes.
- **Base path:** `vite.config.ts` sets `base: "/portfolio/"`. If the repository is renamed, change this to match or every asset will 404.
- **Build before pushing:** `npm run build` runs strict TypeScript checks. A type error that `npm run dev` tolerates will still fail the deploy.

## Credits

- Unity, C#, Three.js, Git, and Trello icons from [Devicon](https://devicon.dev) (MIT).
- Aseprite and itch.io icons from [Simple Icons](https://simpleicons.org) (CC0).
- All brand names and logos are trademarks of their respective owners.
