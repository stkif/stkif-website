# Sponsors

Every sponsor listed in `sponsors-list.js` appears in three places:

- the **Sponsors page** (`sponsors.html`): a card per sponsor with "Learn more" and "Visit website"
- the **About page**: logo tiles in the "Thank you to our sponsors" box
- the **home page**: the "Our sponsors" row near the bottom

## Add a sponsor

1. Put their logo in this folder, for example `ica-kista.webp`. Use .webp or .png, about 600 px wide, with little empty space around the logo.
2. Open `sponsors-list.js` and copy one `{ ... }` block:

```
{ name: "ICA Kista", logo: "ica-kista.webp", bg: "#ffffff", what: "Supermarket", url: "https://www.ica.se" },
```

- `bg` is the colour behind the logo. Use the logo's own background colour (for a red logo box, the same red), so every tile looks the same size. Use `"#ffffff"` for logos on white.
- `what` is a few words about what they do. Add the Swedish and Tamil for it in `lang/sv.js` and `lang/ta.js`.
- `url` is optional. With it, their card gets a "Visit website" link.

## Give a sponsor their own page

`lyca-mobile.html` is the example. Copy it, change the text, and add `page: "their-page.html"` to their block in `sponsors-list.js`. Their tiles and their "Learn more" button then open that page. Add the new page to `sitemap.xml`.

The Lyca Mobile page shows package prices from lycamobile.se (November 2026). Check them now and then, and update the numbers in `lyca-mobile.html` if Lyca changes its offers.

## Remove a sponsor

Delete their block from `sponsors-list.js` (and the logo file if you like).

While the list is empty, the About page shows only the "Become a sponsor" invitation and the home page row is hidden.
