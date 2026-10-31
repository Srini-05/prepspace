# PrepSpace

**Your knowledge. Your preparation. Your next breakthrough.**

PrepSpace is a static, searchable interview-preparation library. It brings 14 Markdown guides into one responsive React experience with a shared reader, table of contents, bookmarks, reading progress, code copying, and quick revision.

## Topics

Algorithms, Java Backend, Spring Boot, Frontend React, Database, Microservices, Distributed Systems, System Design, OOPS, Linux, Networking, Cybersecurity, Ruby on Rails, and AI + Software Engineering.

## Repository Layout

```text
prepspace/
├── .github/workflows/deploy.yml
├── .gitignore
├── README.md
├── docs/development/copilot-prompt.md
└── app/
    ├── public/content/       # Published Markdown, organized by topic
    ├── scripts/              # Content validation
    ├── src/                  # React application
    ├── tests/                # Unit and Playwright tests
    ├── package.json
    └── vite.config.js
```

## Local Development

Use Node.js 22 or newer:

```sh
cd app
npm ci
npm run dev
```

For checks and a production build:

```sh
npm run lint
npm test
npm run check:content
npm run build
npm run preview
```

See [app/README.md](app/README.md) for the application architecture, content workflow, dependencies, and commands.

## Add a Topic

1. Copy the complete Markdown file into the appropriate `app/public/content/` category. Preserve its relative links and original content.
2. Add one entry to `app/src/config/topics.js` with a unique ID and the `/content/...` file path.
3. Run `npm run check:content`, `npm test`, `npm run lint`, and `npm run build` from `app/`.

The central registry drives the sidebar, home page, categories, search, topic navigation, and counts. All topics use the same Markdown reader.

## GitHub Pages Deployment

The GitHub Actions workflow at `.github/workflows/deploy.yml` runs on pushes to `main` and can also be started manually with **Actions → Deploy PrepSpace → Run workflow**. It installs from the committed app lockfile, validates content, lints, tests, builds `app/dist/`, uploads the Pages artifact, and deploys it. No access token or separate hosting service is needed.

For the first deployment, create the GitHub repository, push this project to `main`, and set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. Later pushes to `main` deploy automatically.

A project-site URL has this form; replace the placeholders with the repository owner and repository name:

```text
https://<OWNER>.github.io/<REPOSITORY>/
```

Vite derives the Pages base path from GitHub Actions environment variables. Hash-based routes support direct topic links and refreshes without a separate Pages fallback file.

## Publish to GitHub

After creating an empty repository on GitHub, run from this directory:

```sh
git init
git add .
git commit -m "Prepare PrepSpace for GitHub Pages"
git branch -M main
git remote add origin https://github.com/<OWNER>/<REPOSITORY>.git
git push -u origin main
```

The workflow performs the build and deployment after the push. Do not commit credentials, `node_modules/`, build output, or test artifacts.
