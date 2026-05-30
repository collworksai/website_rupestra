# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Marketing website for **Rupestra**, an iOS rock art documentation app. Static HTML/CSS/JS — no framework, no build tools, no package manager. Served as plain files.

## Development

Open `index.html` directly in a browser, or start a local server:

```bash
python3 -m http.server 8080
```

No build step, no linting, no tests. Changes are verified visually in the browser.

## Architecture

```
index.html                   ← Main landing page (single-page sections with anchor nav)
Politica_de_Privacidad.html  ← Privacy policy (legal content)
styles.css                   ← All styles, shared by both pages
i18n.js                      ← Client-side i18n engine + English translation dictionary
```

### i18n System

Spanish is the default language, hardcoded in HTML. English is applied client-side via `i18n.js`.

- **Translatable elements** use data attributes: `data-i18n` (textContent), `data-i18n-html` (innerHTML for elements with markup), `data-i18n-alt` (alt attribute), `data-i18n-aria` (aria-label attribute).
- **Language switcher** (ES/EN toggle) lives in the header of both pages.
- **Persistence**: `localStorage` key `"rupestra-lang"`. Default is `"es"`.
- **FOUC prevention**: inline `<script>` in `<head>` adds `html.lang-loading` class before CSS loads; removed after translations apply.
- **API**: `window.rupestra.setLang("en"|"es")` and `window.rupestra.getLang()`.
- **Adding a new translatable element**: add the `data-i18n*` attribute to the HTML element (Spanish text stays hardcoded), then add the English translation key to the `translations.en` object in `i18n.js`.
- **Nav toggle aria-labels** are set dynamically in inline JS at the bottom of both HTML files — these check `rupestra.getLang()` and must be updated in both pages if changed.
- The privacy page has `data-i18n-page="privacy"` on `<body>` so `i18n.js` knows which meta tags to apply.

### Design System (CSS)

Earth-tone palette defined as CSS custom properties in `:root`. Key tokens:
- Backgrounds: `--bg`, `--bg-alt`, `--surface-dark`
- Text: `--text`, `--text-muted`, `--text-soft`, `--text-on-dark`
- Accent: `--accent` (#8b5e3c), `--accent-soft` (#c8a882)
- Fonts: Inter (sans-serif body), Cormorant Garamond (serif headings)
- Section rhythm: `.section-light` / `.section-alt` / `.section-dark` alternate backgrounds

Three breakpoints: `≤640px` (mobile), `≤879px` (tablet/mobile nav), `≥880px` (desktop nav visible).

### Other Files

- `RupestraLandingPage.jsx` — React reference/backup of the landing page; not used in production.
- `CLAUDE_App.md` — guidance file for the separate iOS Swift app repository, not this website.
- `PRIVACY_POLICY.md` — Spanish source text for the privacy policy page.
- `.claude/commands/ux-review.md` — custom Claude Code slash command for UX audits.

## Conventions

- Light mode only — no dark mode. Legal/reading-heavy pages use `.section-light` backgrounds, not dark hero blocks.
- All user-visible text must exist in both languages (Spanish in HTML, English key in `i18n.js`).
- Accessibility: all images need descriptive `alt` text, interactive elements need `aria-label`, SVG icons use `aria-hidden="true"`.
- `prefers-reduced-motion` is respected (carousel auto-play disabled, animations removed).
