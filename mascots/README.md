# Mascot: the Nilgiri tahr (வரையாடு)

Our logo animal, the Nilgiri tahr, appears all over the website. You can change any of the pictures yourself, without touching the pages.

## The folders

```
mascots/
├── mascot-list.js   ← which picture goes where (the ONLY file you need to edit)
├── my-goats/        ← YOUR pictures: drop new goat pictures here
└── tahr/            ← drawn tahr pictures (spares you can use too)
```

## Change a picture (2 steps)

1. Put the new picture in `mascots/my-goats/`, for example `mascots/my-goats/tahr-football.png`.
2. Open `mascots/mascot-list.js` and change the file name next to the spot you want:

   ```js
   "home-activities":  "mascots/my-goats/tahr-football.png",
   ```

Save, then refresh the page. That's it.

- Pictures can be `.png`, `.webp`, `.jpg`, `.gif` (animated gifs work) or `.svg`.
- **Use a transparent background** (`.png` or `.webp`). A picture with a black or white box around it will show that box on the website.
- About 400–700 pixels tall is plenty. Bigger files only make the site slower.
- File names: small letters, no spaces (use `-`), e.g. `tahr-new-year.png`.

## The spots

| Spot in `mascot-list.js` | Where it shows | Picture now |
|---|---|---|
| `home-hero` | Home page, bottom right of the big photo, with "Vanakkam! Welcome to STK IF" | waving hello |
| `home-activities` | Home page, above "A place for every part of you" | cricket |
| `events-heading` | Events page, above the heading | Diwali lamp |
| `about-emblem` | About page, in the "Like the Nilgiri tahr on our logo…" box | thumbs up |
| `gallery-heading` | Gallery page, above the heading | surprised "wow" |
| `learn-heading` | Learn Tamil page, above the heading | thumbs up |
| `members-heading` | Members page, above the heading | winking, pointing at you |
| `joinus-heading` | Join Us page, next to the heading | celebrating |
| `back-to-top` | Round button that appears when you scroll down | round head |
| `footer-ridge` | Mountains above the footer on every page | drawn mountain ridge |
| `footer-runner` | The tahr running across those mountains | drawn galloping tahr (legs move) |
| `menu-join-us` | Small dancing icon on "Join Us" in the top menu | round head |
| `register-button` | Small dancing icon on "Register" buttons | round head |
| `send-button` | Small dancing icon on the Join Us form's send button | round head |

## More tricks

**A different picture each visit.** Put several in square brackets:

```js
"home-hero": ["mascots/my-goats/tahr-hello.webp", "mascots/my-goats/tahr-wink.webp", "mascots/my-goats/tahr-thumbs-up.webp"],
```

Great for seasons, too: switch `events-heading` to the Diwali lamp in autumn and something else in spring.

**Hide a spot.** Set it to empty: `"home-activities": "",`

**Use a drawn tahr.** Just write its name, without a folder: `"home-activities": "tahr-dance",`. The list of names is at the bottom of `mascot-list.js`.

**Add a goat to a new place on a page.** In the HTML, add

```html
<span class="heading-mascot" data-mascot="tahr-sleeping-spot"></span>
```

and give it a picture in `mascot-list.js`: `"tahr-sleeping-spot": "mascots/my-goats/tahr-sleeping.webp",`. The class sets the size: `heading-mascot` (small, centred above a heading), `activities-mascot` (medium) or `emblem-mascot`.

**Footer runner:** any picture works. A still picture bounces as it runs; an animated `.gif` of a running goat looks even better.

**Turn off** the mountains above the footer or the back-to-top button: set `SHOW_FOOTER_RIDGE` or `SHOW_BACK_TO_TOP` to `false` near the top of `js/site.js`.

## Movement

Pictures gently sway, and hop when you point at them. The small icons on buttons dance, and dance faster when you point at the button. The movements are in `css/mascots.css` (pictures) and `css/modern.css` (button icons). Visitors who have "reduce motion" switched on in their device get still pictures.

## About the Nilgiri tahr

The Nilgiri tahr (*Nilgiritragus hylocrius*), வரையாடு in Tamil, is a wild mountain goat found only in the Nilgiri hills and Western Ghats of South India. It is Tamil Nadu's state animal. It is known for standing sure-footed on steep cliffs, which is why we chose it: steady on our roots while climbing toward new horizons.
