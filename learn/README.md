# Learn Tamil

The **Learn Tamil** page (`learn-tamil.html`) is built from the files in this folder. Each collection is one file and becomes one tab on the page.

| File | Tab |
|---|---|
| `tamil-history.js` | Tamil history: key facts and a timeline from the first inscriptions to Tamil in Sweden today |
| `tamil-letters.js` | Tamil letters: vowels, consonants and a "Make letters" box that shows the 12 combined letters for any consonant |
| `thirukkural.js` | Thirukkural: Chapter 1 (In praise of God) and 9 popular kurals, 4 per page |
| `aathichoodi.js` | Aathichoodi: the 13 lines that start with the vowels |
| `learn-list.js` | Which tabs show, and in what order |
| `_template.js` | Copy this to start a new collection |

## Add more verses

Open the file (for example `thirukkural.js`), copy one `{ n: ..., ta: ..., tr: ..., en: ..., sv: ... },` block and fill it in:

- `n`: the verse number
- `ta`: the Tamil text. For two lines, put `\n` where the line breaks.
- `tr`: how to say it in English letters (for people who can't read Tamil yet)
- `en`: the meaning in English
- `sv`: the meaning in Swedish

Leave `tr`, `en` or `sv` as `""` if you don't have them yet. On the Tamil version of the site, the English meaning is shown.

## Add a new tab (e.g. Moothurai, Nalvazhi, Tamil proverbs)

1. Copy `_template.js` and rename it, e.g. `moothurai.js` (small letters, no spaces).
2. Change `id` to the same name and fill in the text.
3. Add `"moothurai"` to the list in `learn-list.js`.

## Remove a tab

Delete its name from `learn-list.js`.

## Pages

Thirukkural shows its sections (Chapter 1, Popular kurals) one at a time, 4 kurals per page, with Previous / Next buttons. The number is set by `perPage: 4` in `thirukkural.js`. Add the same line to any other collection to give it pages too, or remove it to show everything at once.

## History tab

`tamil-history.js` has two parts: fact cards (`facts: true`) and a timeline (`timeline: true`). Each entry has English, Swedish and Tamil text. Add a timeline entry by copying one `{ when: ..., title: ..., text: ... }` block.

## Kural of the day

The box at the top shows a different verse every day, picked from every collection that has `dailyPick: true` (now Thirukkural). Add `dailyPick: true` to another collection to include its lines too.

## Good to know

- **Test yourself:** visitors can hide the meanings and reveal them one card at a time.
- **Listen:** a 🔊 button appears automatically on devices that have a Tamil voice, and reads the Tamil aloud. It is hidden on devices without one.
- **Links:** you can link straight to a tab, e.g. `learn-tamil.html#aathichoodi`.
- **Check the text:** please have a Tamil teacher check the Tamil text, the English-letter spellings and the meanings before you publish. The meanings are simple explanations for beginners, not word-for-word translations.
