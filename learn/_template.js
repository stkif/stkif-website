// TEMPLATE for a new Learn Tamil collection (e.g. Moothurai, Nalvazhi, Tamil proverbs).
// 1. Copy this file and rename it, e.g. moothurai.js (small letters, no spaces).
// 2. Change the id below to the same name: "moothurai".
// 3. Fill in the text. Leave tr, en or sv as "" if you don't have them yet.
// 4. Add the name to learn/learn-list.js.

addLesson({
    id: "my-collection",
    name: { ta: "தலைப்பு", en: "Title in English", sv: "Titel på svenska" },
    by: { ta: "ஆசிரியர்", en: "Author", sv: "Författare" },
    about: {
        en: "One or two sentences about this work.",
        sv: "En eller två meningar om verket.",
        ta: "இந்த நூலைப் பற்றி ஒன்றிரண்டு வரிகள்."
    },
    groups: [
        {
            title: { ta: "பகுதி", en: "Section name", sv: "Avsnittets namn" },
            items: [
                { n: 1, ta: "முதல் வரி\nஇரண்டாம் வரி", tr: "First line in English letters\nsecond line", en: "Meaning in English.", sv: "Betydelse på svenska." },
                { n: 2, ta: "", tr: "", en: "", sv: "" }
            ]
        }
    ]
});
