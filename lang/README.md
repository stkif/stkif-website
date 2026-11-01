# Languages

The website can be shown in **English**, **Svenska** and **தமிழ்**. Visitors pick a language with the switcher at the top of every page, and their choice is remembered on later visits.

| File | What it is |
|---|---|
| `languages.js` | Which languages appear in the switcher, and in what order |
| `sv.js` | Swedish translations |
| `ta.js` | Tamil translations |

English is the original text in the HTML pages, so it has no file.

## How translations work

Each line pairs the English text exactly as it appears on the website with its translation:

```js
"Join Us":
    "Gå med",
```

Any text without a translation simply stays in English, so a missing line never breaks the page.

## Change a translation

Open `sv.js` or `ta.js` and edit the text on the **right**. Keep the quotes and the comma at the end.

## Add a translation for new text

When you add new text to a page in English:

1. Copy the English text exactly, including capital letters and punctuation.
2. Add a new line to `sv.js` and `ta.js`: `"English text": "translation",`

To see which texts still need a translation, open the page, choose the language, open the browser console (F12) and type `STKi18n.missing()`.

Text with bold words keeps its tags, for example `"<strong>Hello</strong> world": "<strong>Hej</strong> världen"`.

## Text that should never be translated

Add `data-no-translate` to the element in the HTML, e.g. `<span data-no-translate>STK IF</span>`.

## Add another language

1. Add a line to `languages.js`, e.g. `{ code: "de", label: "Deutsch", short: "DE" }`.
2. Copy `sv.js` to `de.js`, change `STK_TRANSLATIONS.sv` to `STK_TRANSLATIONS.de`, and translate the right-hand side.

## Members page

Positions such as "President" or "Treasurer" are translated through the same files. Names are never translated.

## Opening a page in a set language

Add `?lang=sv` or `?lang=ta` to the address, e.g. `index.html?lang=ta`. This is handy for sharing a link with Tamil-speaking members.
