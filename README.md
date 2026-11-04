# Renew Counseling website

A static website (plain HTML, CSS and a little JavaScript) for Renew Counseling. There's no build step: open `index.html` in a browser to preview it.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `therapies.html` | Focused Therapies |
| `about.html` | About Me (bio, approach, credentials) |
| `fees.html` | Fees & Insurance (rates, insurance, payment, cancellation policy, Good Faith Estimate notice) |
| `contact.html` | Hours, location, office details (parking, accessibility), map and contact form |
| `privacy.html` | Website privacy policy and Notice of Privacy Practices (Elisa should review; add her NPP PDF) |
| `404.html` | "Page not found" page (GitHub Pages shows it automatically) |

The header, footer and phone-only Call/Message bar are repeated in each page, so an address or phone number change needs to be made in all five files. Search for `102 Wheatfield`, `(570) 734-7798` and so on.

## Filling in placeholders

Anything shown with a **yellow highlight** on the site (`<span class="tbd">…</span>` in the HTML) is placeholder text. Search the files for `[` and `tbd` to find every spot. Once a spot has real content, remove the `<span class="tbd">` wrapper.

## Photos

Replace the files in `images/` with real photos **using the same filenames**, and they'll show up automatically:

| File | Where it's used | Suggested shape |
|---|---|---|
| `hero-forest.jpg` | Home, top banner | Wide, 1920×1100+ |
| `elisa-yost.jpg` | Home intro (arched frame), About page (top) and Contact form (small circle) | Portrait, 4:5. The current file is 320×400; a larger original (at least 1000×1250) would look sharper |
| `headshot-3.jpg` | About page, "My approach" (Elisa in her office) | 4:3 |
| `office-plants.jpg` | Home, "Three simple steps" | 4:3 |
| `therapy-1.jpg` … `therapy-4.jpg` | Therapies page | Square |
| `banner-ferns.jpg`, `banner-canopy.jpg`, `banner-path.jpg` | Banners on the Therapies, About and Contact pages | Wide |
| `cta-leaves.jpg` | "Get in touch" bands | Wide |
| `logo.svg` | Header, footer, browser tab | Replace with the final fig tree logo |

Good free sources: [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com). Resize large photos to roughly 2000px wide (or smaller) before adding them so pages load quickly.

## Icons and link previews

`images/favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png` and `icon-512.png` are made from `logo.svg`. `images/og-image.jpg` (1200×630) is the preview image shown when someone shares a link by text or social media. Re-create these once the final logo is ready.

## Colors

All colors are defined at the top of `css/styles.css` (`--fig-leaf`, `--sage`, `--plum`, and so on). Changing them there updates the whole site.

## Contact form setup (Formspree)

1. Create a free account at <https://formspree.io> using the email address where messages should arrive.
2. Create a new form and copy its ID (the part after `/f/`).
3. In `contact.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"`.

The free plan includes 50 submissions a month and spam filtering. **Note:** Formspree is not HIPAA-compliant, so the form asks visitors not to include detailed health information.

## Google Map

On Google Maps, search the office address, then choose **Share → Embed a map → Copy HTML**. Copy only the `src="…"` URL into the `<iframe>` in `contact.html`. No API key is needed.

## Domain name

The site assumes **https://www.renewcounselingpa.com/**. If the domain is different, find and replace that address in every `.html` file, `sitemap.xml` and `robots.txt`. When the domain is connected, GitHub creates a `CNAME` file automatically. Don't add one by hand before the DNS is set up, or the site will stop loading.

## Going live (GitHub Pages)

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**, set Source to *Deploy from a branch*, and choose the main branch and the `/ (root)` folder.
3. To use a custom domain (e.g. `renewcounselingpa.com`), enter it under **Custom domain**, then add the DNS records GitHub shows you at your domain registrar. Turn on **Enforce HTTPS**.
4. Update the `url` in the structured-data block at the top of `index.html` if the domain differs.
