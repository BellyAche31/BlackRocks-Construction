# BlackRocks Construction — Website

A fast, free-to-host marketing site for BlackRocks Construction: plain HTML/CSS/JS,
no build step, no framework, no paid services required.

## What's in here

```
index.html      Home
about.html      About / company story
services.html   All 5 services, in detail
portfolio.html  Filterable gallery + drag before/after sliders
clients.html    Corporate logo bar + individual client testimonials
contact.html    Contact form + click-to-call/WhatsApp/Viber + map
css/style.css   All styling (single file, no preprocessor)
js/main.js      Nav, scroll reveal, before/after sliders, lightbox, contact form
assets/images/  Logo + all photos (extracted from the old Canva site PDF)
robots.txt, sitemap.xml   Basic SEO
```

The logo (`assets/images/logo-icon.png`, `logo-lockup.png`) and every photo were
extracted directly from the PDF export of the old Canva site, since no separate
asset files existed yet. Quality is good enough to ship, but if/when you get the
original high-res logo file or fresh project photography, just drop the new files
into `assets/images/` with the same filenames and everything updates automatically.

## Running it locally

No install needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- From this folder, run `python3 -m http.server 8000` and visit `http://localhost:8000`

## The contact form (100% free, zero signup)

The form on `contact.html` posts to **[FormSubmit.co](https://formsubmit.co)**,
targeting `blackrocksconstructionph@gmail.com` directly — no account, no API key,
no monthly limit on a free plan needed.

**One-time step:** the first time someone submits the form, FormSubmit will send
an activation email to `blackrocksconstructionph@gmail.com`. Open it and click
the confirmation link — after that, every future submission goes straight through.
(Test it yourself once after deploying, so it's already activated before a real
customer fills it out.)

If you'd prefer a nicer dashboard to manage submissions later, swap the form's
`action` attribute in `contact.html` for a free [Formspree](https://formspree.io)
endpoint instead — same idea, just requires a free account.

## Deploying (free hosting)

This is a static site, so any of these work with zero config:

**Netlify** (drag-and-drop, easiest for non-technical use)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this whole project folder onto the page
3. Done — you get a free `*.netlify.app` URL immediately, or attach your own domain later for free

**Vercel**
1. Push this folder to a GitHub repo (already done if you're reading this from one)
2. Import the repo at [vercel.com/new](https://vercel.com/new) — no build command needed, output directory is `/`

**GitHub Pages**
1. Push to GitHub, then in the repo go to Settings → Pages
2. Set source to the `main` branch, root folder

Once you pick a real domain, update the placeholder URLs in `sitemap.xml` and `robots.txt`.

## Editing content

Everything is plain HTML — open any `.html` file in a text editor and change the
text directly. Each page repeats the same header/footer markup (no build step
means no shared includes), so if you change the phone number, email, or nav
links, update it in all six `.html` files.

Testimonial quotes for Mr. Abraham Uy, Ms. Andi Manzano-Reyes, and Ms. Dawn Chang
were **not** included on `clients.html` — the original site didn't have them
written down, and quotes shouldn't be invented and attributed to real people.
Once you collect their actual words, replace the "Testimonial coming soon." line
in `clients.html` for each of the three `.testi-card` blocks.
