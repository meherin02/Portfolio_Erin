# Developer portfolio — Meherin Jahan

**Live portfolio** · [portfoliomeherin.vercel.app](https://portfoliomeherin.vercel.app/)

A personal portfolio for a full-stack MERN developer. React and Vite render the
site; Express serves the production build and can store contact messages in
MongoDB when self-hosted.

## Features

- Fully responsive single-page portfolio (hero, about, skills, projects, background, contact)
- Light/dark theme with system preference detection, remembered across visits
- Project showcase with category filtering and an accessible detail modal
  (focus trapping, Escape to close, back-click safe)
- Deep links: `/projects/<slug>` opens that project's detail modal directly
- Contact form with inline validation. With no backend configured it hands the
  message to the visitor's email client via a pre-filled `mailto:` link
- Scroll-reveal animations that respect `prefers-reduced-motion`
- Active-section navigation highlighting, mobile menu, back-to-top button
- SEO: metadata, Open Graph + Twitter cards, JSON-LD (Person), sitemap, robots.txt

## Run locally

Use Node.js 22 or newer. From this folder:

    npm install
    npm run dev

Open the URL printed by Vite. To run the contact API during development, run
`npm run api` in a second terminal — Vite forwards `/api` requests to port 3001.

For production: `npm run build`, then `npm start` and open http://localhost:3001.

## Project structure

    index.html            entry point, metadata, JSON-LD
    src/main.jsx          React bootstrap
    src/App.jsx           routing shell (home + 404), active-section logic
    src/data/content.js   ALL site content — profile, skills, projects
    src/components/       one component per section + shared UI
    src/hooks/            useActiveSection (nav highlighting)
    src/styles/           design tokens, base styles, component styles
    server.js             Express server (static + contact API)
    public/               portrait, screenshots, favicon, og-image, robots, sitemap

## Update the portfolio

Everything editable lives in `src/data/content.js`:

- **Profile** — name, role, intro, about paragraphs, email, socials, portrait.
- **Skills** — the `skillGroups` array. Icons are matched by label in
  `src/components/icons.jsx`; add the label to `skillIconMap` for a new icon.
- **Projects** — the `projects` array. Keep slugs unique; `category` must be
  one of the values in `projectCategories`. Each project supports `image`,
  `imageAlt`, `summary`, `problem`, `approach`, `features`, `stack`, `live`,
  and `source`.
- **Portrait** — replace `public/meherin-jahan.jpg` (square works best; the crop
  is 4:5, adjustable via `portrait.position`).

## Resume

Put a PDF in `public/` (for example `meherin-jahan-resume.pdf`) and set
`profile.resume` in `src/data/content.js` to `/meherin-jahan-resume.pdf`.
Download buttons then appear automatically in the navigation, hero, and
background section. Until then, the background section offers a
"request by email" link instead — no dead buttons.

## Contact form

Two modes, controlled by `profile.contactForm` in `src/data/content.js`:

- **`false` (default)** — no backend is expected. Submitting opens the
  visitor's own email client with the message pre-filled (`mailto:`). Nothing
  is faked; the form says exactly what it does.
- **`true`** — the form POSTs to `/api/contact`. Set `MONGODB_URI` in `.env`
  (see `.env.example`) and run the site behind `server.js` (e.g. `npm start`).
  Messages land in the `messages` collection of the database named in the URI.
  The API rate-limits 5 submissions per IP per 15 minutes.

Static hosts such as Vercel serve only the frontend build, so keep
`contactForm` at `false` there.

## Deployment

- **Vercel (current)** — imports the repo, builds with `npm run build`, and
  serves `dist/` at the root with SPA fallback.
- **Self-hosted** — `npm run build && npm start` serves `dist/` and the contact
  API on port 3001 (override with `PORT`).

## Contact

Email: meherjan0201@gmail.com · GitHub: [@meherin02](https://github.com/meherin02)
