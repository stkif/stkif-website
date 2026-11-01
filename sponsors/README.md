# Sponsors

The About page shows a logo for every sponsor listed in `sponsors-list.js`.

## Add a sponsor

1. Put their logo in this folder, for example `ica-kista.png`. A transparent .png, .svg or .webp about 400 px wide looks best.
2. Open `sponsors-list.js` and add a line inside the brackets:

```
{ name: "ICA Kista", logo: "ica-kista.png", url: "https://www.ica.se" },
```

The logo links to their website. Leave out `url` if they have none.

## Remove a sponsor

Delete their line from `sponsors-list.js` (and the logo file if you like).

While the list is empty, the page shows only the "Become a sponsor" invitation.
