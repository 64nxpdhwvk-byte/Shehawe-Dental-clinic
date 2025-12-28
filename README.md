# Shehawy Dental Clinic Website (AR/EN)

Static, mobile-first, bilingual website for Shehawy Dental Clinic. Arabic is the default (RTL) experience with English equivalents under `/en`.

## Pages
- `/` – Home (Arabic)
- `/services/` – Services (Arabic)
- `/team/` – Team (Arabic)
- `/en/` – Home (English)
- `/en/services/` – Services (English)
- `/en/team/` – Team (English)

## Features
- Sticky header with desktop and mobile navigation, WhatsApp/Call CTAs, and language switcher that maps to the equivalent page and persists preference in `localStorage`.
- Floating social bar (WhatsApp, Call, Facebook, Instagram) on all pages.
- Responsive service and team grids (3 columns desktop, 2 tablet, 1 mobile).
- Structured data (Dentist), SEO meta tags, Open Graph tags, sitemap, and robots.
- Placeholder assets ready to be replaced with real JPEG images; favicon placeholder included.

## Editing Content
Text lives directly in the HTML files:
- Arabic: `index.html`, `services/index.html`, `team/index.html`
- English: `en/index.html`, `en/services/index.html`, `en/team/index.html`

Update CTA links, phone numbers, hours, or any copy in those files. Keep `data-language-toggle` attributes for the language switch.

## Replacing Images
All placeholders are JPEGs sized for easy swapping:
- Logo: `assets/Logos1.png` (official logo). If the image fails to load, a text logo is shown.
- Services: `assets/services/*`
- Team: `assets/team/*`

Binary assets are intentionally **not** committed. Upload your JPEGs to the same paths (see `assets/README.md`) after merging. If an image is missing, a neutral SVG placeholder is shown automatically while keeping the alt text for accessibility.

## Styles & Scripts
- Global styles: `styles/main.css`
- Interactions (menu toggle, language persistence, header shadow, logo fallback): `scripts/main.js`

## Deployment (Static Hosting)
Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages):
1. Build step: none (pure HTML/CSS/JS).
2. Publish the repository root as the site directory.
3. Ensure clean URLs are enabled so `/en/services` and similar routes resolve.

## SEO Files
- `sitemap.xml`
- `robots.txt`

## Contact Links
- WhatsApp: `https://wa.me/201225204045`
- Call (landline): `tel:+2035422527`
- Facebook: `https://www.facebook.com/SHDC2016`
- Instagram: `https://www.instagram.com/shdc2016`
