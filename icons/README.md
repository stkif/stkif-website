# Icons

Every icon on the website is its own `.svg` file in this folder. The site picks them up automatically.

| File | Used for |
|---|---|
| `goat.svg` | Simple dancing goat (spare; the Join Us, Register and form buttons now use the round tahr picture set in `mascots/mascot-list.js`) |
| `home.svg`, `calendar.svg`, `info.svg`, `gallery.svg`, `book.svg`, `members.svg` | Menu: Home, Events, About, Gallery, Learn Tamil, Members |
| `ticket.svg` | "Register here" buttons on event cards |
| `email.svg`, `phone.svg`, `instagram.svg`, `facebook.svg` | Contact details on the Members page |
| `send.svg`, `arrow.svg` | Spare icons you can use on any button |

## Add an icon to a button or link

Write `data-icon="name"` on it in the HTML, where *name* is the file name without `.svg`:

```html
<a class="button" href="joinus.html" data-icon="goat">Join Us</a>
<a class="button" href="events.html" data-icon="calendar">See events</a>
```

## Add a new icon

1. Save the icon as an `.svg` file in this folder, e.g. `star.svg`.
2. Use it with `data-icon="star"`.

Tip: icons that use `stroke="currentColor"` or `fill="currentColor"` automatically take the colour of the button text.

## Change or remove an icon

- **Change:** replace the file but keep the same name.
- **Remove:** delete the `data-icon="..."` from the button.
- **Menu icons:** these are set in `js/site.js` under `NAV_ICONS`.

## Animations

The movements (the goat dancing, the house roof bouncing, and so on) are in `css/modern.css` under "Icon animations". They work on the parts of each SVG with names like `class="goat-head"` or `class="i-roof"`. If you replace an icon, it still shows, it just won't have that movement unless the new file uses the same class names.

## Good to know

Icons animate when the website runs on a web server, such as GitHub Pages or any hosting. If you open the files straight from your computer, the browser blocks this, so icons show as simple still pictures. That's normal.
