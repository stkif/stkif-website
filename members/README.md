# Members

Every member has their own folder here. The Members page (`members.html`) builds a card for each one automatically.

```
members/
├── members-list.js        ← which folders to show, in order
├── _template/             ← copy this to add someone new
│   └── info.js
├── 01-president/
│   ├── info.js            ← name, position, contact details
│   └── photo.jpg          ← their photo
└── ...
```

## Add a member

1. Copy the `_template` folder and rename it, e.g. `05-sports-lead` (lowercase, numbers and dashes, no spaces).
2. Open `info.js` in the new folder and fill in the details. Delete any line you don't want shown, such as `phone`.
3. Put their photo in the same folder and name it `photo.jpg`. A square photo, around 600 × 600 px, looks best.
4. Open `members-list.js` and add the folder name to the list.

## Remove a member

Delete their line from `members-list.js`. You can also delete their folder.

## Change the order

Move the lines up or down in `members-list.js`.

## Groups

Members with the same `group` (for example `"Board"` or `"Team Leads"`) are shown together under that heading. Groups appear in the order their first member appears in `members-list.js`.

## Languages

Positions such as President or Treasurer are translated automatically into Swedish and Tamil when they're listed in `lang/sv.js` and `lang/ta.js`. If you use a new position, add it to both files. Names are never translated.

## Good to know

- If a photo is missing, the card shows the person's initials instead.
- Only add phone numbers and emails that the person has agreed to share publicly. A shared club email is often a good alternative.
- If a member doesn't show up, check that the folder name in `members-list.js` exactly matches the folder name.
