// Tamil letters (தமிழ் எழுத்துகள்).
// type: "letters" shows letter tiles. ta = the letter, tr = how it sounds.
// The "Make letters" box (uyirmei) is built automatically from the consonants.

addLesson({
    id: "tamil-letters",
    type: "letters",
    name: { ta: "தமிழ் எழுத்துகள்", en: "Tamil letters", sv: "Tamilska bokstäver" },
    by: { ta: "", en: "", sv: "" },
    about: {
        en: "Tamil has 12 vowels (uyir), 18 consonants (mei) and one special letter (aaytham). Put a consonant and a vowel together and you get 216 combined letters (uyirmei): 247 letters in all. Tap a consonant to see its combinations.",
        sv: "Tamil har 12 vokaler (uyir), 18 konsonanter (mei) och en specialbokstav (aaytham). Sätter man ihop en konsonant och en vokal får man 216 sammansatta bokstäver (uyirmei) – 247 bokstäver totalt. Tryck på en konsonant för att se dess kombinationer.",
        ta: "தமிழில் 12 உயிர் எழுத்துகள், 18 மெய் எழுத்துகள், ஒரு ஆய்த எழுத்து. மெய்யும் உயிரும் சேர்ந்தால் 216 உயிர்மெய் எழுத்துகள். மொத்தம் 247 எழுத்துகள். ஒரு மெய் எழுத்தைத் தொட்டு அதன் உயிர்மெய் வரிசையைப் பாருங்கள்."
    },
    groups: [
        {
            title: { ta: "உயிர் எழுத்துகள்", en: "Vowels (uyir)", sv: "Vokaler (uyir)" },
            items: [
                { ta: "அ", tr: "a" }, { ta: "ஆ", tr: "aa" }, { ta: "இ", tr: "i" }, { ta: "ஈ", tr: "ii" },
                { ta: "உ", tr: "u" }, { ta: "ஊ", tr: "uu" }, { ta: "எ", tr: "e" }, { ta: "ஏ", tr: "ee" },
                { ta: "ஐ", tr: "ai" }, { ta: "ஒ", tr: "o" }, { ta: "ஓ", tr: "oo" }, { ta: "ஔ", tr: "au" }
            ]
        },
        {
            title: { ta: "ஆய்த எழுத்து", en: "Special letter (aaytham)", sv: "Specialbokstav (aaytham)" },
            items: [ { ta: "ஃ", tr: "akh" } ]
        },
        {
            title: { ta: "மெய் எழுத்துகள்", en: "Consonants (mei)", sv: "Konsonanter (mei)" },
            consonants: true,
            items: [
                { ta: "க்", tr: "k" }, { ta: "ங்", tr: "ng" }, { ta: "ச்", tr: "ch / s" }, { ta: "ஞ்", tr: "nj" },
                { ta: "ட்", tr: "ṭ (hard t)" }, { ta: "ண்", tr: "ṇ (hard n)" }, { ta: "த்", tr: "th" }, { ta: "ந்", tr: "n (soft)" },
                { ta: "ப்", tr: "p" }, { ta: "ம்", tr: "m" }, { ta: "ய்", tr: "y" }, { ta: "ர்", tr: "r" },
                { ta: "ல்", tr: "l" }, { ta: "வ்", tr: "v" }, { ta: "ழ்", tr: "zh" }, { ta: "ள்", tr: "ḷ (hard l)" },
                { ta: "ற்", tr: "ṟ (rolled r)" }, { ta: "ன்", tr: "ṉ (end n)" }
            ]
        }
    ]
});
