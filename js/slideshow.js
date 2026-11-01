// Home page hero slideshow.
//
// The slides are normal image files in the "slideshow" folder.
// To update the website: replace an image in that folder (same file name),
// or add a new image and add its file name to the list below.
// You can have any number of slides (1 or more).

const SLIDE_FOLDER = "slideshow/";
const SLIDE_FILES = [
    "slide-3.jpg",
    "slide-1.jpg",
    "slide-2.jpg",
    "slide-4.jpg",
    "slide-5.jpg",
    "slide-6.jpg"
];
const SLIDE_SECONDS = 5;      // time each picture stays on screen
const RANDOM_ORDER = true;    // true = shuffled on every visit, false = order of the list
const KEEP_FIRST_FIXED = true; // true = the first file in the list always opens first

(function () {
    const container = document.querySelector(".hero-slideshow");
    if (!container || SLIDE_FILES.length === 0) return;

    // Build the play order
    let files = SLIDE_FILES.slice();
    if (RANDOM_ORDER) {
        const first = KEEP_FIRST_FIXED ? files.shift() : null;
        for (let i = files.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [files[i], files[j]] = [files[j], files[i]];
        }
        if (first) files.unshift(first);
    }

    const slides = [];
    let current = 0;
    let timer = null;

    function show(index) {
        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === index);
        });
        current = index;
    }

    function startTimer() {
        if (timer || slides.length < 2) return;
        timer = setInterval(function () {
            show((current + 1) % slides.length);
        }, SLIDE_SECONDS * 1000);
    }

    // Load one image at a time, in order, so the first slide shows right away
    // and missing files are simply skipped.
    function loadNext(i) {
        if (i >= files.length) return;
        const img = new Image();
        img.onload = function () {
            const slide = document.createElement("div");
            slide.className = "hero-slide";
            slide.style.backgroundImage = "url('" + SLIDE_FOLDER + files[i] + "')";
            container.appendChild(slide);
            slides.push(slide);
            if (slides.length === 1) show(0);
            startTimer();
            loadNext(i + 1);
        };
        img.onerror = function () {
            loadNext(i + 1);
        };
        img.src = SLIDE_FOLDER + files[i];
    }

    loadNext(0);
})();
