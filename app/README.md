# PrepSpace Application

The PrepSpace frontend is a static React application built with Vite. Its topic registry points to Markdown files under `public/content/`; each topic uses the same safe, reusable Markdown reader.

## Requirements and Dependencies

Use Node.js 22 or newer. The app uses React, Vite, Tailwind CSS, Framer Motion, React Router (hash routing), Lucide React, Fuse.js, `react-markdown`, remark-gfm, and rehype plugins for sanitized HTML, heading IDs, autolinks, and syntax highlighting. ESLint, Node's test runner, and Playwright cover code quality and behavior.

No backend, authentication, database, or external data service is required. Preferences, bookmarks, and recently viewed topics use browser LocalStorage.

## Commands

Run from this directory:

```sh
npm ci
npm run dev
npm run lint
npm test
npm run test:e2e
npm run check:content
npm run build
npm run preview
```

`npm run test:e2e` starts a local Vite server and runs Playwright. Install its browser once on a new machine with `npx playwright install chromium`.

## Markdown Content

Published Markdown lives only in `public/content/`, organized by category. Keep source text, examples, tables, HTML disclosure elements, and relative links intact. Raw HTML is sanitized at render time.

To add one guide, copy it into its category folder, then add a single entry to `src/config/topics.js`:

```js
{
  id: 'database',
  title: 'Database',
  description: 'Database interview preparation and reference.',
  category: 'Databases',
  icon: 'Database',
  file: '/content/databases/database.md',
}
```

IDs must be unique, and `file` must point to an existing Markdown file under `public/content/`. The registry generates navigation, home cards, category filters, search, topic counts, and adjacent-topic links. `npm run check:content` validates metadata, IDs, files, unique headings, and local Markdown links.

## Static Asset Paths and GitHub Pages

Vite's `base` is `/` in local development and automatically becomes `/<repository>/` for GitHub Actions project-site builds; the special `<owner>.github.io` repository uses `/`. `contentUrl()` prefixes Markdown requests with Vite's `BASE_URL`, and `index.html` uses `%BASE_URL%` for the favicon. Imported assets such as the local font files and workspace image are emitted by Vite with base-aware URLs.

The application uses `HashRouter`, so a topic URL is served from the same static `index.html` and remains refresh-safe on GitHub Pages. Markdown cross-topic links resolve against the source file first, then the content root to preserve the Linux index's existing relative links.

The GitHub Actions workflow installs with `npm ci`, runs lint, unit tests, and content validation, builds `dist/`, and deploys that directory to Pages.
