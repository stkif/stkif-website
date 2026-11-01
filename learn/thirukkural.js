// Thirukkural (திருக்குறள்) by Thiruvalluvar.
// Each verse: n = kural number, ta = Tamil (use \n between the two lines),
// tr = how to say it in English letters, en = meaning in English, sv = meaning in Swedish.
// Add more verses by copying one { ... } block. Keep the commas between blocks.

addLesson({
    id: "thirukkural",
    name: { ta: "திருக்குறள்", en: "Thirukkural", sv: "Thirukkural" },
    by: { ta: "திருவள்ளுவர்", en: "Thiruvalluvar", sv: "Thiruvalluvar" },
    about: {
        en: "1,330 short couplets on virtue, wealth and love, written about 2,000 years ago. Each kural has just seven words, and it is one of the most translated books in the world.",
        sv: "1 330 korta tvåradingar om dygd, rikedom och kärlek, skrivna för ungefär 2 000 år sedan. Varje kural har bara sju ord, och boken är en av världens mest översatta.",
        ta: "அறம், பொருள், இன்பம் பற்றிய 1,330 குறள்கள். சுமார் 2,000 ஆண்டுகளுக்கு முன் எழுதப்பட்டது. உலகில் அதிகம் மொழிபெயர்க்கப்பட்ட நூல்களில் ஒன்று."
    },
    dailyPick: true,   // used for "Kural of the day"
    perPage: 4,        // kurals per page (remove this line to show them all at once)
    groups: [
        {
            title: { ta: "கடவுள் வாழ்த்து", en: "Chapter 1 · In praise of God", sv: "Kapitel 1 · Till Guds ära" },
            items: [
                { n: 1, ta: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு.", tr: "Agara mudhala ezhuththellaam aadhi\npagavan mudhatre ulagu.",
                  en: "As the letter A is the first of all letters, God, the Primal One, is the first of the world.",
                  sv: "Liksom bokstaven A är den första av alla bokstäver, är Gud, den Ursprunglige, världens början." },
                { n: 2, ta: "கற்றதனால் ஆய பயனென்கொல் வாலறிவன்\nநற்றாள் தொழாஅர் எனின்.", tr: "Katradhanaal aaya payanenkol vaalarivan\nnatraal thozhaaar enin.",
                  en: "What is the use of all your learning, if you do not bow at the feet of the One of pure knowledge?",
                  sv: "Vad är all din lärdom värd om du inte bugar dig för Den som har ren kunskap?" },
                { n: 3, ta: "மலர்மிசை ஏகினான் மாணடி சேர்ந்தார்\nநிலமிசை நீடுவாழ் வார்.", tr: "Malarmisai eginaan maanadi serndhaar\nnilamisai needuvaazh vaar.",
                  en: "Those who reach the noble feet of the One who walks upon the flower will live long on this earth.",
                  sv: "De som når de ädla fötterna hos Den som vandrar på blomman lever länge på jorden." },
                { n: 4, ta: "வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு\nயாண்டும் இடும்பை இல.", tr: "Vendudhal vendaamai ilaanadi serndhaarkku\nyaandum idumbai ila.",
                  en: "Those who reach the feet of the One free from desire and dislike will never know suffering.",
                  sv: "Den som når fötterna hos Den som är fri från begär och motvilja drabbas aldrig av lidande." },
                { n: 5, ta: "இருள்சேர் இருவினையும் சேரா இறைவன்\nபொருள்சேர் புகழ்புரிந்தார் மாட்டு.", tr: "Irulser iruvinaiyum seraa iraivan\nporulser pugazhpurindhaar maattu.",
                  en: "The two kinds of deeds born of darkness do not cling to those who praise the true glory of God.",
                  sv: "De två slagen av gärningar som föds ur mörkret fastnar inte på dem som prisar Guds sanna storhet." },
                { n: 6, ta: "பொறிவாயில் ஐந்தவித்தான் பொய்தீர் ஒழுக்க\nநெறிநின்றார் நீடுவாழ் வார்.", tr: "Porivaayil aindhaviththaan poidheer ozhukka\nnerinindraar needuvaazh vaar.",
                  en: "Those who walk the true path of the One who mastered the five senses will live long.",
                  sv: "De som följer den sanna vägen hos Den som bemästrat de fem sinnena lever länge." },
                { n: 7, ta: "தனக்குவமை இல்லாதான் தாள்சேர்ந்தார்க் கல்லால்\nமனக்கவலை மாற்றல் அரிது.", tr: "Thanakkuvamai illaadhaan thaalserndhaark kallaal\nmanakkavalai maatral aridhu.",
                  en: "Only those who reach the feet of the One beyond compare can free their mind from worry.",
                  sv: "Bara den som når fötterna hos Den ojämförlige kan befria sitt sinne från oro." },
                { n: 8, ta: "அறவாழி அந்தணன் தாள்சேர்ந்தார்க் கல்லால்\nபிறவாழி நீந்தல் அரிது.", tr: "Aravaazhi andhanan thaalserndhaark kallaal\npiravaazhi neendhal aridhu.",
                  en: "Only those who reach the feet of the gracious One, the ocean of virtue, can swim across life's other oceans.",
                  sv: "Bara den som når fötterna hos Den nådige, dygdens hav, kan simma över livets andra hav." },
                { n: 9, ta: "கோளில் பொறியின் குணமிலவே எண்குணத்தான்\nதாளை வணங்காத் தலை.", tr: "Kolil poriyin gunamilave enkunaththaan\nthaalai vanangaath thalai.",
                  en: "A head that does not bow to the One of eight virtues is as useless as a sense that cannot sense.",
                  sv: "Ett huvud som inte bugar för Den med de åtta dygderna är lika värdelöst som ett sinne som inte fungerar." },
                { n: 10, ta: "பிறவிப் பெருங்கடல் நீந்துவர் நீந்தார்\nஇறைவன் அடிசேரா தார்.", tr: "Piravip perungadal neendhuvar neendhaar\niraivan adiseraa thaar.",
                  en: "Those who reach God's feet cross the great ocean of births; those who do not, cannot.",
                  sv: "De som når Guds fötter tar sig över födelsernas stora hav; de andra gör det inte." }
            ]
        },
        {
            title: { ta: "பிரபலமான குறள்கள்", en: "Popular kurals for everyday life", sv: "Kända kuraler för vardagen" },
            items: [
                { n: 391, ta: "கற்க கசடறக் கற்பவை கற்றபின்\nநிற்க அதற்குத் தக.", tr: "Karka kasadarak karpavai katrapin\nnirka adharkuth thaga.",
                  en: "Learn thoroughly what is worth learning, and then live by what you have learned.",
                  sv: "Lär dig grundligt det som är värt att lära, och lev sedan efter det du lärt dig." },
                { n: 396, ta: "தொட்டனைத் தூறும் மணற்கேணி மாந்தர்க்குக்\nகற்றனைத் தூறும் அறிவு.", tr: "Thottanaith thoorum manarkeni maandharkkuk\nkatranaith thoorum arivu.",
                  en: "The deeper you dig a well in the sand, the more water it gives; the more you learn, the more your wisdom grows.",
                  sv: "Ju djupare man gräver en brunn i sanden, desto mer vatten ger den; ju mer man lär sig, desto mer växer klokskapen." },
                { n: 100, ta: "இனிய உளவாக இன்னாத கூறல்\nகனியிருப்பக் காய்கவர்ந் தற்று.", tr: "Iniya ulavaaga innaadha kooral\nkaniyiruppak kaaikavarn thatru.",
                  en: "Using harsh words when kind words are at hand is like picking unripe fruit when ripe fruit is there.",
                  sv: "Att säga hårda ord när det finns vänliga är som att plocka omogen frukt när mogen frukt finns." },
                { n: 72, ta: "அன்பிலார் எல்லாந் தமக்குரியர் அன்புடையார்\nஎன்பும் உரியர் பிறர்க்கு.", tr: "Anbilaar ellaan thamakkuriyar anbudaiyaar\nenbum uriyar pirarkku.",
                  en: "People without love keep everything for themselves; people with love would give even their bones to others.",
                  sv: "Den utan kärlek behåller allt för sig själv; den med kärlek skulle ge till och med sina ben åt andra." },
                { n: 423, ta: "எப்பொருள் யார்யார்வாய்க் கேட்பினும் அப்பொருள்\nமெய்ப்பொருள் காண்ப தறிவு.", tr: "Epporul yaaryaarvaaik ketpinum apporul\nmeipporul kaanba tharivu.",
                  en: "Whoever says something, wisdom is finding the truth in it.",
                  sv: "Vem som än säger något – klokhet är att hitta sanningen i det." },
                { n: 664, ta: "சொல்லுதல் யார்க்கும் எளிய அரியவாம்\nசொல்லிய வண்ணம் செயல்.", tr: "Solludhal yaarkkum eliya ariyavaam\nsolliya vannam seyal.",
                  en: "Saying is easy for anyone; doing what you said is hard.",
                  sv: "Att säga är lätt för alla; att göra det man har sagt är svårt." },
                { n: 619, ta: "தெய்வத்தான் ஆகா தெனினும் முயற்சிதன்\nமெய்வருத்தக் கூலி தரும்.", tr: "Dheivaththaan aagaa dheninum muyarchithan\nmeivaruththak kooli tharum.",
                  en: "Even when luck is against you, hard work always pays back the effort you put in.",
                  sv: "Även när turen sviker ger hårt arbete alltid lön för mödan." },
                { n: 314, ta: "இன்னாசெய் தாரை ஒறுத்தல் அவர்நாண\nநன்னயஞ் செய்து விடல்.", tr: "Innaasei dhaarai oruththal avarnaana\nnannayan seidhu vidal.",
                  en: "The best answer to people who hurt you is to do them good, so that they feel ashamed.",
                  sv: "Det bästa svaret till den som skadat dig är att göra gott mot hen, så att hen skäms." },
                { n: 110, ta: "எந்நன்றி கொன்றார்க்கும் உய்வுண்டாம் உய்வில்லை\nசெய்ந்நன்றி கொன்ற மகற்கு.", tr: "Ennandri kondraarkkum uivundaam uivillai\nseinnandri kondra magarku.",
                  en: "Every other wrong can be forgiven, but not forgetting a kindness someone did for you.",
                  sv: "Alla andra fel kan förlåtas, men inte att glömma en vänlighet någon gjort för dig." }
            ]
        }
    ]
});
