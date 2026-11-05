# Renew Counseling website

The website for **Renew Counseling**, the private counseling practice of Elisa D. Yost, MS, LPC, in Milford, PA. The business is registered as Elisa D Yost LLC.

It's a plain static site: HTML pages, one stylesheet and one small JavaScript file. There's no build step, framework or package manager. To preview it, open `index.html` in a browser.

- **Live site (for now):** <http://griffinansel.com/renewcounselingpa/>. GitHub Pages serves it from the `main` branch.
- **Intended domain:** `https://www.renewcounselingpa.com/`. This domain is **not registered yet** (see the TODO list).

---

## Contents

1. [TODO before launch](#todo-before-launch)
2. [Quick start](#quick-start)
3. [Project structure](#project-structure)
4. [Pages](#pages)
5. [Shared page parts](#shared-page-parts)
6. [Common edits](#common-edits)
7. [Placeholders](#placeholders)
8. [Photos and images](#photos-and-images)
9. [Styling](#styling)
10. [JavaScript](#javascript)
11. [Contact form (Formspree)](#contact-form-formspree)
12. [Google Map](#google-map)
13. [SEO, link previews and search engines](#seo-link-previews-and-search-engines)
14. [Accessibility](#accessibility)
15. [Privacy and compliance notes](#privacy-and-compliance-notes)
16. [Domain name](#domain-name)
17. [Hosting and deploying (GitHub Pages)](#hosting-and-deploying-github-pages)
18. [Testing checklist](#testing-checklist)
19. [Sources for site content](#sources-for-site-content)

---

## TODO before launch

### Urgent: messages from the site currently go nowhere

- [ ] **Get a working email address.** The domain `renewcounselingpa.com` isn't registered, so `elisa@renewcounselingpa.com` can't receive mail. Anything sent to it bounces. That address appears on every page and in the contact form's backup option (`js/main.js`). Choose one fix:
  - Register `renewcounselingpa.com` and set up email on it, for example with Google Workspace or the registrar's email service. Then follow [Domain name](#domain-name).
  - **Or** use an address Elisa already has for now: find and replace `elisa@renewcounselingpa.com` in every `.html` file and in `js/main.js`.
- [ ] **Connect the contact form.** It still uses the placeholder `YOUR_FORM_ID`, so pressing **Send message** doesn't send anything; it only offers buttons to email the message instead. Follow [Contact form (Formspree)](#contact-form-formspree). This requires a working email address first.
- [ ] **Confirm which phone number clients should call.** The site and Psychology Today use **(570) 734-7798**. The federal NPI registry lists the practice phone as **(570) 832-0833**. Insurers and directories copy their listings from the NPI registry, so update whichever one is wrong. The NPI record can be edited at <https://nppes.cms.hhs.gov>.

### Content Elisa needs to provide or confirm

- [x] **Cancellation policy** (`fees.html`): $50 fee for cancellations within 24 hours of the appointment.
- [ ] **Notice of Privacy Practices** (`privacy.html`): add her NPP as a PDF (for example `docs/notice-of-privacy-practices.pdf`) and link it where the placeholder is.
- [ ] **Privacy page review** (`privacy.html`): Elisa should review the whole page and set the "Last updated" date. It's a plain-language starting point, not legal advice.
- [ ] **Photo of Elisa in her office** (`images/headshot-3.jpg`, About page): it's currently a stock photo of plants. When it's replaced, update its `alt` text in `about.html`.
- [ ] **Larger portrait** (`images/elisa-yost.jpg`): the current file is only 320×400. A larger original (at least 1000×1250) would look sharper.
- [ ] **Final logo** (`images/logo.svg`): replace it with the final fig-tree logo, then recreate the icons and the link-preview image (see [Photos and images](#photos-and-images)).

### Domain and launch

- [ ] Register the domain (see above), connect it to GitHub Pages and turn on HTTPS. See [Hosting and deploying](#hosting-and-deploying-github-pages).
- [ ] If the domain ends up being something other than `www.renewcounselingpa.com`, replace that address everywhere (see [Domain name](#domain-name)).
- [ ] After launch, submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console). Also create or claim a Google Business Profile for the office so it appears on Google Maps.
- [ ] Update Elisa's Psychology Today profile: add the website link, and change the payment methods to match the site ("Card" instead of "Visa").
- [ ] Run through the [testing checklist](#testing-checklist) on the live domain.

---

## Quick start

```bash
git clone https://github.com/gansel51/renewcounselingpa.git
cd renewcounselingpa
open index.html            # macOS; or double-click the file
```

Most things work when the page is opened straight from disk. To preview it exactly as it will run online (for example, to test the form), run a tiny local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

To publish a change, commit it and push to `main`. GitHub Pages updates the live site within a minute or two.

---

## Project structure

```
.
├── index.html          Home
├── therapies.html      Focused Therapies
├── about.html          About Me
├── fees.html           Fees & Insurance
├── contact.html        Contact, hours, location, map, contact form
├── privacy.html        Website privacy policy / Notice of Privacy Practices
├── 404.html            "Page not found" (GitHub Pages serves it automatically)
├── css/
│   └── styles.css      All styling for every page
├── js/
│   └── main.js         Mobile menu, mobile call bar, footer year, contact form
├── images/             Photos, logo, icons, link-preview image
├── fonts/              Site fonts (.woff2) and their licenses
├── sitemap.xml         Page list for search engines
├── robots.txt          Tells search engines they may crawl everything
├── .nojekyll           Tells GitHub Pages to serve files as-is (no Jekyll processing)
└── README.md           This file
```

---

## Pages

| File | Page | What's on it |
|---|---|---|
| `index.html` | Home | Hero banner, intro to Elisa, the four focus areas, fees at a glance, "Three simple steps", call-to-action band. Also holds the site's structured data (see [SEO](#seo-link-previews-and-search-engines)). |
| `therapies.html` | Focused Therapies | Anxiety, Depression, Trauma & PTSD, Couples & Families; other areas of expertise; methods used (CBT, Trauma-Focused CBT, DBT, ACT, Narrative Therapy, Christian Counseling). |
| `about.html` | About Me | Bio, approach, credentials and license numbers, links to verify the PA license and to Psychology Today, colleague endorsement. |
| `fees.html` | Fees & Insurance | Session rates, insurance (Medicare), payment methods, sliding scale, cancellation policy, Good Faith Estimate notice (No Surprises Act). |
| `contact.html` | Contact | Address and directions, "Getting here" details (parking, entrance, accessibility, waiting room), phone, email, hours, Google Map, contact form. |
| `privacy.html` | Privacy | How the website handles information, the third-party services it uses, and the Notice of Privacy Practices (still to be added). |
| `404.html` | Page not found | Shown for broken links. |

---

## Shared page parts

There are no templates, so these parts are **copied into every page**. A change to any of them has to be made in all seven `.html` files:

- **Header:** logo, navigation, "Request a free consultation" button.
- **Crisis bar:** the 988 / 911 notice above the footer.
- **Footer:** address, phone, email, license number, page links.
- **Mobile Call/Message bar:** the sticky bar shown on phones.
- **`<head>`:** font preloads, icons, stylesheet and link-preview tags. Each page has its own title and description.

The quickest way to make a site-wide change is your editor's "find in files" / "replace in files" (in VS Code: <kbd>Cmd/Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd>).

---

## Common edits

### Contact details and other facts that appear in several places

| Detail | Where it appears |
|---|---|
| Phone `(570) 734-7798` and `tel:+15707347798` | Every `.html` file and `js/main.js` (the form's messages). Update **both** spellings. |
| Email `elisa@renewcounselingpa.com` | Every `.html` file (including the structured data in `index.html`) and `js/main.js` |
| Address `102 Wheatfield Drive, Suite B` | Every `.html` file, the Google Maps links in `contact.html`, and the structured data in `index.html` |
| PA license `PC020602` | Footer of every page and `about.html` |
| NJ license `37PC01265200` | `about.html` |
| Fees (`$130`, `$150`) | `fees.html`, `index.html` (fees at a glance), and `"priceRange"` in the structured data in `index.html` |
| Insurance (Medicare) | `fees.html`, `index.html` |
| Years in practice ("7 years") | `index.html`, `about.html`. **Update it each year**, along with Psychology Today. |
| Areas served | `contact.html` ("Getting here") and `"areaServed"` in `index.html` |
| Domain `www.renewcounselingpa.com` | `<head>` of each page, `index.html` structured data, `sitemap.xml`, `robots.txt` |

### Turning off "Accepting new clients"

The green "Now accepting new clients" note is in `contact.html` (on the form), and "Accepting new clients" is in the hero of `index.html`. Edit or remove both.

### Adding a new page

1. Copy an existing page, e.g. `privacy.html`, so you start with the shared header and footer.
2. Change `<title>`, `<meta name="description">`, `<link rel="canonical">` and the `og:` tags.
3. Replace the content inside `<main id="main">`.
4. Add a link to the navigation (and footer, if wanted) in **every** page. Mark the current page's nav link with `aria-current="page"`.
5. Add the page to `sitemap.xml`.

### Writing style

The site speaks in Elisa's voice, in the first person ("I", "my"). Bio wording, methods and payment options follow her [Psychology Today profile](https://www.psychologytoday.com/us/therapists/elisa-d-yost-milford-pa/1815786), so keep the two in sync. Don't list services, methods or credentials she hasn't confirmed.

---

## Placeholders

Text that still needs real content is wrapped like this:

```html
<span class="tbd">[date]</span>
```

On the site it shows with a **yellow highlight** (the `.tbd` style in `css/styles.css`) so it's easy to spot. To find every one, search the project for `class="tbd"`, and search for `TODO` to find notes left in the HTML. When real content goes in, remove the `<span class="tbd">` wrapper and the square brackets.

---

## Photos and images

To swap a photo, replace the file in `images/` **using the same filename**. The pages pick it up automatically.

| File | Where it's used | Shape / size |
|---|---|---|
| `hero-forest.jpg` | Home, top banner (set in `css/styles.css`) | Wide, 1920×1100 |
| `elisa-yost.jpg` | Home intro (arched frame), About page (top), Contact form (small circle) | Portrait 4:5, ideally 1000×1250+ |
| `headshot-3.jpg` | About, "My approach" | 4:3, 1200×900 |
| `office-plants.jpg` | Home, "Three simple steps" | 4:3, 1200×900 |
| `therapy-1.jpg` … `therapy-4.jpg` | Therapies page (Anxiety, Depression, Trauma, Couples & Families) | Square, 800×800 |
| `banner-ferns.jpg` | Therapies page banner | Wide, 1920×700 |
| `banner-canopy.jpg` | About and Fees page banners | Wide, 1920×700 |
| `banner-path.jpg` | Contact and Privacy page banners | Wide, 1920×700 |
| `cta-leaves.jpg` | "Get in touch" bands (set in `css/styles.css`) | Wide, 1920×900 |
| `logo.svg` | Header, footer, 404 page, browser tab | Vector |
| `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-512.png` | Browser tab and phone home-screen icons | Made from `logo.svg` |
| `og-image.jpg` | Preview image when a link is shared by text or social media | 1200×630 |

**Tips**
- Resize photos before adding them, to about 2000px wide or less (the sizes above are ideal), and save as JPEG at roughly 75–80% quality. The whole `images/` folder is currently about 2.3 MB.
- Banners and "Get in touch" bands have text over them, so pick photos that are calm and not too busy, and check that the text is readable.
- When you change what a photo shows, update its `alt` text in the HTML (see [Accessibility](#accessibility)). Background images set in CSS (the hero, banners and CTA bands) are decorative and have no `alt`.
- When the logo changes, recreate the four icon PNGs and `og-image.jpg` from it.

**Where the current photos come from:** the nature and room photos are free public-domain (CC0) photos from Unsplash, downloaded via [Wikimedia Commons](https://commons.wikimedia.org). No photo credit is required. Good sources for more: [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com). Avoid stock photos of people, so visitors aren't misled about who they'll be seeing.

---

## Styling

All styling is in `css/styles.css`.

**Colors** are defined once at the top of the file. Change them there and the whole site updates:

| Variable | Color | Used for |
|---|---|---|
| `--fig-leaf` | `#2f4a3a` deep green | Headings, header, footer |
| `--moss` | `#4f6b55` mid green | Accents, CTA band background |
| `--sage` / `--sage-light` | soft greens | Accents, tinted section backgrounds |
| `--cream` | `#f6f3ec` | Page background |
| `--paper` | `#fffdf8` | Cards |
| `--plum` | `#6b3e5a` fig-fruit purple | Buttons and links |
| `--ink` / `--ink-soft` | dark grey-greens | Body text |

**Fonts:** headings use *Cormorant Garamond* and body text uses *Nunito Sans*. Both are hosted on the site itself, in `fonts/`, and set up with `@font-face` at the top of `css/styles.css`, so visitors' browsers make no requests to Google for them. Both fonts are free under the SIL Open Font License, and the license files are in `fonts/`. To change fonts, add the new `.woff2` files to `fonts/`, update the `@font-face` rules and the `--font-serif` / `--font-sans` variables, and update the two `<link rel="preload">` lines in every page's `<head>`.

**Layout:** `--max` (1120px) sets the content width. Card grids use `.card-grid` (fits as many columns as there's room for) or `.card-grid.four` (four columns, dropping to two, then one, on smaller screens).

**How the file is organized:** base styles come first, then sections (Buttons, Header, Hero, Sections, Cards, Quote, CTA band, About, Contact, Notices, Footer, placeholder marker). After those come later additions (labelled v2–v6) and the mobile adjustments. Later rules override earlier ones, so if a change doesn't take effect, search the file for the class name and check further down.

The site uses a light color scheme only, by design.

---

## JavaScript

`js/main.js` is loaded on every page and does four things:

1. **Mobile menu:** opens and closes the navigation on small screens. It also closes on a link tap, a tap outside the menu, or <kbd>Esc</kbd>.
2. **Mobile Call/Message bar:** hides the sticky bar on phones while the page's own call buttons or the contact form are on screen, and while someone is typing.
3. **Footer year:** fills in the current year wherever there's a `data-year` attribute.
4. **Contact form:** checks the fields and shows friendly error messages, then sends the message to Formspree without leaving the page. Until Formspree is connected, it offers email buttons instead (see below).

The site still works without JavaScript: the `no-js` class on `<html>` makes the navigation display as a simple list, and the form falls back to the browser's own checks.

---

## Contact form (Formspree)

The form on `contact.html` sends messages through [Formspree](https://formspree.io), a form service, because a static site can't send email by itself.

**Current state:** not connected. The form's `action` still says `YOUR_FORM_ID`. Until that's replaced, pressing **Send message** shows buttons to send the message to `elisa@renewcounselingpa.com` another way: **Email app**, **Gmail**, **Outlook** or **Copy message**. Each one pre-fills the message. (It doesn't open the email app automatically, because many desktop computers have no email app set up and nothing would happen.) That address doesn't work yet (see the [TODO list](#todo-before-launch)).

**To connect it:**

1. Create a free account at <https://formspree.io> using the email address where messages should arrive. It must be a working address.
2. Click **New Form**, name it (e.g. "Renew Counseling"), and copy its ID: the part after `/f/` in the address Formspree shows, e.g. `https://formspree.io/f/xyzabcde` → `xyzabcde`.
3. In `contact.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"` with that ID. Commit and push.
4. On the live site, send a test message. Formspree emails you asking you to confirm the first submission. After that, messages arrive normally.

**What gets sent:** first name, last name, email, phone (optional) and message. The email subject is set by the hidden `_subject` field ("New message from renewcounselingpa.com"). A hidden `_gotcha` field catches spam bots. People never see it, but bots fill it in, and Formspree drops those messages.

**Limits and cautions**
- The free plan allows 50 messages a month and includes spam filtering.
- **Formspree is not HIPAA-compliant.** That's why the form says not to include private health details. If Elisa ever wants clients to share clinical information online, use a HIPAA-compliant client portal (many practice-management systems include one) instead of this form.

---

## Google Map

`contact.html` embeds a Google Map of the office using a simple search link, so no API key or account is needed. To use Google's official embed instead: search the address on Google Maps, choose **Share → Embed a map → Copy HTML**, and paste only the `src="…"` URL into the `<iframe>` in `contact.html`. The "Get directions" link just above it is a normal Google Maps search link.

---

## SEO, link previews and search engines

- **Titles and descriptions:** each page has its own `<title>` and `<meta name="description">`. These are what Google shows in search results.
- **Canonical links:** `<link rel="canonical">` tells search engines the official address of each page. They point to `www.renewcounselingpa.com`.
- **Link previews:** the `og:` and `twitter:` tags control the title, text and image (`images/og-image.jpg`) shown when someone shares a link.
- **Structured data:** the `<script type="application/ld+json">` block in `index.html` describes the practice (name, address, phone, email, prices, areas served, Psychology Today link) in a format Google reads. Keep it in sync with the visible page content.
- **`sitemap.xml` and `robots.txt`:** these list the pages and allow search engines to crawl them. After launch, submit the sitemap in Google Search Console.

Until the domain is live, the canonical links, link previews and sitemap point to an address that doesn't work yet. That's expected, and it's fixed by connecting the domain.

---

## Accessibility

The site is built to be usable with a keyboard and a screen reader. When editing, please keep it that way:

- Every content photo needs meaningful `alt` text describing what's in it. Purely decorative images (like the logo next to the name) use `alt=""`.
- Keep the heading order logical: one `<h1>` per page, then `<h2>`, `<h3>`.
- Form fields have visible labels, and error messages are linked to their fields.
- There's a "Skip to content" link at the top of each page for keyboard users.
- Keep text-on-photo areas readable: the dark overlays on the hero, banners and CTA bands are there for contrast.
- The crisis notice (988 / 911) appears on every page. Don't remove it.

---

## Privacy and compliance notes

- The site uses **no analytics, tracking or advertising cookies**. Third-party services are limited to the Google Map embed and Formspree, and `privacy.html` lists them. The fonts are hosted on the site itself. If you add any other service (analytics, a booking widget, chat), update the privacy page.
- **Good Faith Estimate:** under the No Surprises Act, self-pay clients have the right to an estimate of costs. `fees.html` includes the required notice. Keep it.
- **Notice of Privacy Practices:** HIPAA requires a provider whose website describes its services to post its Notice of Privacy Practices prominently on that website. It's still a TODO (see above).
- **License display:** the PA license number is shown in every page's footer, and both PA and NJ numbers are on the About page.
- The privacy page is a plain-language starting point, **not legal advice**. Elisa should review it.

---

## Domain name

The site is written for **`https://www.renewcounselingpa.com/`**, but that domain is **not registered yet**.

1. Register `renewcounselingpa.com` with a registrar (e.g. Cloudflare, Namecheap, Squarespace Domains, Google Workspace).
2. Set up email on it, so `elisa@renewcounselingpa.com` works.
3. Connect it to GitHub Pages (next section).

If you choose a **different domain**, find and replace `www.renewcounselingpa.com` in every `.html` file, `sitemap.xml` and `robots.txt`. Also update the email address if it changes.

---

## Hosting and deploying (GitHub Pages)

The site is hosted free on GitHub Pages from this repository.

**Current setup:** **Settings → Pages** deploys from the `main` branch, `/ (root)` folder. The site is live at <http://griffinansel.com/renewcounselingpa/>.

**Publishing changes:** commit and push to `main`. GitHub rebuilds the site automatically in a minute or two. Check progress in the repository's **Actions** tab.

**Connecting the custom domain** (once it's registered):

1. In the repository, go to **Settings → Pages → Custom domain**, enter `www.renewcounselingpa.com` and save. GitHub creates a `CNAME` file in the repository automatically. Don't create one by hand before DNS is set up, or the site stops loading.
2. At the domain registrar, add the DNS records GitHub shows:
   - a `CNAME` record for `www` pointing to `gansel51.github.io`
   - `A` records for the bare domain (`renewcounselingpa.com`) pointing to GitHub's IP addresses, listed in [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
3. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS**.
4. Check that both `renewcounselingpa.com` and `www.renewcounselingpa.com` load the site.

`.nojekyll` tells GitHub Pages to serve the files exactly as they are. Leave it in place.

---

## Testing checklist

Run through this after significant changes, and on the live domain before launch:

- [ ] Every page loads, and every navigation, footer and button link goes to the right place.
- [ ] Phone links start a call on a phone; email links open an email app addressed to a **working** address.
- [ ] Contact form: submitting it empty shows error messages; a real test message arrives in Elisa's inbox.
- [ ] Phone layout (about 375px wide): the menu opens and closes, the Call/Message bar appears and hides correctly, and nothing scrolls sideways.
- [ ] Photos load, and the text over the banner photos is readable.
- [ ] No yellow placeholder highlights are left (search for `class="tbd"`).
- [ ] A nonexistent address (e.g. `/nope`) shows the 404 page.
- [ ] Sharing the home page link by text or social media shows the right title and preview image.
- [ ] The map shows the right location, and "Get directions" opens it.

---

## Sources for site content

- **Elisa's [Psychology Today profile](https://www.psychologytoday.com/us/therapists/elisa-d-yost-milford-pa/1815786):** the main source for her bio, specialties, methods, client focus, fees, insurance and payment methods. Keep the site consistent with it.
- **[NPPES NPI Registry](https://npiregistry.cms.hhs.gov/):** her individual provider record (NPI 1891613063) lists both licenses; the practice (Elisa D Yost LLC, doing business as Renew Counseling) is NPI 1013822063.
- **[Pennsylvania PALS](https://www.pals.pa.gov/#/page/search):** license verification, linked from the About page.
- Office details (entrance, accessibility, waiting room) came from Elisa directly.
