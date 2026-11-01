// Tamil history (தமிழ் வரலாறு).
// type: "story" shows fact cards and a timeline.
// Fact: big = the big number or word, text = the line under it.
// Timeline: when = the time, title = heading, text = a few sentences.
// Each text has en (English), sv (Swedish) and ta (Tamil).
// Dates for very old works are debated by scholars, so they are written as "about".

addLesson({
    id: "tamil-history",
    type: "story",
    name: { ta: "தமிழ் வரலாறு", en: "Tamil history", sv: "Tamilsk historia" },
    by: { ta: "", en: "", sv: "" },
    about: {
        en: "Tamil is one of the oldest living languages in the world, spoken without a break for more than two thousand years.",
        sv: "Tamil är ett av världens äldsta levande språk och har talats utan avbrott i mer än två tusen år.",
        ta: "உலகின் மிகப் பழமையான வாழும் மொழிகளில் தமிழும் ஒன்று. இரண்டாயிரம் ஆண்டுகளுக்கும் மேலாகத் தொடர்ந்து பேசப்படுகிறது."
    },
    groups: [
        {
            facts: true,
            title: { ta: "தமிழ் ஒரு பார்வையில்", en: "Tamil at a glance", sv: "Tamil i korthet" },
            items: [
                { big: { en: "2,000+", sv: "2 000+", ta: "2,000+" },
                  text: { en: "years of written literature", sv: "år av skriven litteratur", ta: "ஆண்டுகால எழுத்து இலக்கியம்" } },
                { big: { en: "80 million+", sv: "80 miljoner+", ta: "8 கோடி+" },
                  text: { en: "people speak Tamil around the world", sv: "människor talar tamil runt om i världen", ta: "உலகெங்கும் தமிழ் பேசுவோர்" } },
                { big: { en: "2004", sv: "2004", ta: "2004" },
                  text: { en: "the first language declared a Classical Language of India", sv: "det första språket som utsågs till klassiskt språk i Indien", ta: "இந்தியாவின் முதல் செம்மொழியாக அறிவிக்கப்பட்டது" } },
                { big: { en: "247", sv: "247", ta: "247" },
                  text: { en: "letters in the Tamil alphabet", sv: "bokstäver i det tamilska alfabetet", ta: "தமிழ் எழுத்துகள்" } }
            ]
        },
        {
            timeline: true,
            title: { ta: "காலவரிசை", en: "Through the ages", sv: "Genom tiderna" },
            items: [
                { when: { en: "From about 300 BCE", sv: "Från omkring 300 f.Kr.", ta: "கி.மு. 300 வாக்கில் இருந்து" },
                  title: { en: "The first written Tamil", sv: "Den första skrivna tamilen", ta: "முதல் தமிழ் எழுத்துகள்" },
                  text: { en: "Tamil-Brahmi letters are found on pottery, cave walls and coins. Finds from the Keezhadi excavations near Madurai may be even older.",
                          sv: "Tamil-brahmi-bokstäver har hittats på keramik, grottväggar och mynt. Fynden från utgrävningarna i Keezhadi nära Madurai kan vara ännu äldre.",
                          ta: "மட்பாண்டங்கள், குகைச் சுவர்கள், நாணயங்களில் தமிழ்-பிராமி எழுத்துகள் கிடைத்துள்ளன. மதுரை அருகே கீழடி அகழாய்வுச் சான்றுகள் இன்னும் பழமையானவையாக இருக்கலாம்." } },
                { when: { en: "Over 2,000 years ago", sv: "För över 2 000 år sedan", ta: "2,000 ஆண்டுகளுக்கு முன்" },
                  title: { en: "Tolkappiyam, the first grammar", sv: "Tolkappiyam, den första grammatiken", ta: "தொல்காப்பியம்" },
                  text: { en: "The oldest Tamil grammar that survives describes letters, words and the rules of poetry. Scholars still debate its exact age.",
                          sv: "Den äldsta bevarade tamilska grammatiken beskriver bokstäver, ord och poesins regler. Forskare diskuterar fortfarande exakt hur gammal den är.",
                          ta: "இன்றும் கிடைக்கும் மிகப் பழைய தமிழ் இலக்கண நூல். எழுத்து, சொல், பொருள் (செய்யுள் இலக்கணம்) பற்றிக் கூறுகிறது. இதன் காலம் குறித்து அறிஞர்களிடையே இன்றும் விவாதம் உண்டு." } },
                { when: { en: "About 300 BCE – 300 CE", sv: "Omkring 300 f.Kr. – 300 e.Kr.", ta: "கி.மு. 300 – கி.பி. 300 வாக்கில்" },
                  title: { en: "The Sangam age", sv: "Sangam-tiden", ta: "சங்க காலம்" },
                  text: { en: "Poets gathered in academies (sangams) in Madurai. Their poems, collected in the Eight Anthologies and the Ten Idylls, sing of love, war, nature and everyday life.",
                          sv: "Poeter samlades i akademier (sangam) i Madurai. Deras dikter, samlade i De åtta antologierna och De tio idyllerna, handlar om kärlek, krig, natur och vardagsliv.",
                          ta: "மதுரையில் சங்கங்களில் புலவர்கள் ஒன்றுகூடினர். எட்டுத்தொகை, பத்துப்பாட்டு நூல்களில் காதல், போர், இயற்கை, அன்றாட வாழ்க்கை பற்றிய பாடல்கள் உள்ளன." } },
                { when: { en: "About 2,000 years ago", sv: "För ungefär 2 000 år sedan", ta: "சுமார் 2,000 ஆண்டுகளுக்கு முன்" },
                  title: { en: "Thirukkural", sv: "Thirukkural", ta: "திருக்குறள்" },
                  text: { en: "Thiruvalluvar writes 1,330 couplets on virtue, wealth and love. Today the Kural is read in more than 40 languages.",
                          sv: "Thiruvalluvar skriver 1 330 tvåradingar om dygd, rikedom och kärlek. I dag läses Kural på mer än 40 språk.",
                          ta: "திருவள்ளுவர் அறம், பொருள், இன்பம் பற்றி 1,330 குறள்களை இயற்றினார். இன்று 40-க்கும் மேற்பட்ட மொழிகளில் படிக்கப்படுகிறது." } },
                { when: { en: "About 2nd – 6th century", sv: "Omkring 100- till 500-talet", ta: "கி.பி. 2 – 6 ஆம் நூற்றாண்டு வாக்கில்" },
                  title: { en: "The great epics", sv: "De stora eposen", ta: "ஐம்பெருங்காப்பியங்கள்" },
                  text: { en: "Silappathikaram and Manimekalai, two of the Five Great Epics of Tamil, tell stories of justice, love and compassion.",
                          sv: "Silappathikaram och Manimekalai, två av tamilens fem stora epos, berättar om rättvisa, kärlek och medkänsla.",
                          ta: "ஐம்பெருங்காப்பியங்களில் சிலப்பதிகாரமும் மணிமேகலையும் நீதி, காதல், கருணை பற்றிய கதைகளைச் சொல்கின்றன." } },
                { when: { en: "About 6th – 9th century", sv: "Omkring 500- till 800-talet", ta: "கி.பி. 6 – 9 ஆம் நூற்றாண்டு வாக்கில்" },
                  title: { en: "Songs of devotion", sv: "Hängivenhetens sånger", ta: "பக்தி இலக்கியம்" },
                  text: { en: "The saint-poets, the Nayanmars and the Alvars, compose hymns such as the Thevaram and the Divya Prabandham. They are still sung in temples today.",
                          sv: "Helgonpoeterna, nayanmarerna och alvarerna, skriver hymner som Thevaram och Divya Prabandham. De sjungs fortfarande i templen i dag.",
                          ta: "நாயன்மார்களும் ஆழ்வார்களும் தேவாரம், நாலாயிரத் திவ்யப் பிரபந்தம் போன்ற பக்திப் பாடல்களைப் பாடினர். இன்றும் கோயில்களில் பாடப்படுகின்றன." } },
                { when: { en: "About 9th – 13th century", sv: "Omkring 800- till 1200-talet", ta: "கி.பி. 9 – 13 ஆம் நூற்றாண்டு வாக்கில்" },
                  title: { en: "The Chola era", sv: "Chola-tiden", ta: "சோழர் காலம்" },
                  text: { en: "The Chola kings carry Tamil culture across the sea to Southeast Asia and build great temples such as the Brihadeeswarar temple in Thanjavur. Kambar writes the Tamil Ramayana.",
                          sv: "Chola-kungarna sprider tamilsk kultur över havet till Sydostasien och bygger stora tempel som Brihadeeswarar-templet i Thanjavur. Kambar skriver den tamilska Ramayana.",
                          ta: "சோழ மன்னர்கள் தமிழ்ப் பண்பாட்டைக் கடல் கடந்து தென்கிழக்கு ஆசியா வரை கொண்டு சென்றனர்; தஞ்சைப் பெரிய கோயிலைக் கட்டினர். கம்பர் கம்பராமாயணத்தை இயற்றினார்." } },
                { when: { en: "19th – 20th century", sv: "1800- och 1900-talet", ta: "19 – 20 ஆம் நூற்றாண்டு" },
                  title: { en: "Print and new voices", sv: "Tryckpressen och nya röster", ta: "அச்சும் புதிய குரல்களும்" },
                  text: { en: "Printing brings old palm-leaf manuscripts to everyone. U. V. Swaminatha Iyer rescues lost Sangam texts, and poets like Subramania Bharathi write for a new age.",
                          sv: "Tryckpressen gör gamla palmbladsmanuskript tillgängliga för alla. U. V. Swaminatha Iyer räddar försvunna sangamtexter, och poeter som Subramania Bharathi skriver för en ny tid.",
                          ta: "அச்சு இயந்திரம் ஓலைச்சுவடிகளை அனைவரிடமும் கொண்டு சேர்த்தது. உ. வே. சாமிநாதையர் மறைந்துபோன சங்க நூல்களை மீட்டெடுத்தார்; பாரதியார் போன்ற கவிஞர்கள் புதிய காலத்துக்குப் பாடினர்." } },
                { when: { en: "2004", sv: "2004", ta: "2004" },
                  title: { en: "A classical language", sv: "Ett klassiskt språk", ta: "செம்மொழி" },
                  text: { en: "The Government of India declares Tamil its first Classical Language.",
                          sv: "Indiens regering utser tamil till landets första klassiska språk.",
                          ta: "இந்திய அரசு தமிழை முதல் செம்மொழியாக அறிவித்தது." } },
                { when: { en: "Today", sv: "I dag", ta: "இன்று" },
                  title: { en: "Tamil today, and in Sweden", sv: "Tamil i dag, och i Sverige", ta: "இன்றைய தமிழ், சுவீடனிலும்" },
                  text: { en: "Tamil is an official language in India (Tamil Nadu and Puducherry), Sri Lanka and Singapore, and lives on in Tamil families all over the world, including here in Sweden. Every child who learns a few letters keeps it alive.",
                          sv: "Tamil är officiellt språk i Indien (Tamil Nadu och Puducherry), Sri Lanka och Singapore, och lever vidare i tamilska familjer över hela världen, också här i Sverige. Varje barn som lär sig några bokstäver håller språket levande.",
                          ta: "இந்தியா (தமிழ்நாடு, புதுச்சேரி), இலங்கை, சிங்கப்பூரில் தமிழ் ஆட்சி மொழி. உலகெங்கும் வாழும் தமிழ்க் குடும்பங்களில் — இங்கே சுவீடனிலும் — தமிழ் வாழ்கிறது. சில எழுத்துகள் கற்கும் ஒவ்வொரு குழந்தையும் அதை வாழவைக்கிறது." } }
            ]
        }
    ]
});
