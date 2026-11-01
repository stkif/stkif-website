// Home page intro: the club crest appears big in the middle of the screen,
// then glides to its place above the headline. After it lands, the headline,
// buttons and the tahr rise in, and the event poster popup may open.
//
// Visitors who prefer less motion (a setting on their phone or computer),
// or who open the page scrolled down, see the page straight away.

(function () {
    const GROW_MS = 900;    // crest fades in and grows in the middle
    const HOLD_MS = 500;    // stays big for a moment
    const FLY_MS = 1300;    // glides to its place
    const BIG = 0.55;       // big size, as a share of the screen's shorter side
    const SHADOW = "blur(0) drop-shadow(0 14px 32px rgba(0, 0, 0, 0.55))";

    const root = document.documentElement;
    const hero = document.getElementById("hero");
    const crest = hero && hero.querySelector(".hero-crest");
    if (!crest || !crest.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.scrollY > 50) return;

    root.classList.add("hero-intro");   // css/refresh.css hides the hero text until the crest lands

    let finished = false;
    function finish() {
        if (finished) return;
        finished = true;
        root.classList.remove("hero-intro");
        root.classList.add("hero-intro-done");
        crest.parentElement.classList.add("landed");   // the gold ring pulse
        document.dispatchEvent(new CustomEvent("hero-intro:done"));
    }

    function play() {
        const end = crest.getBoundingClientRect();
        if (!end.width) { finish(); return; }
        const scale = Math.min(window.innerWidth, window.innerHeight) * BIG / end.width;
        const dx = window.innerWidth / 2 - (end.left + end.width / 2);
        const dy = window.innerHeight / 2 - (end.top + end.height / 2);
        const centre = "translate(" + dx + "px, " + dy + "px) ";
        const total = GROW_MS + HOLD_MS + FLY_MS;

        const animation = crest.animate([
            { offset: 0, opacity: 0, transform: centre + "scale(" + scale * 0.7 + ")", filter: SHADOW.replace("blur(0)", "blur(10px)"), easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
            { offset: GROW_MS / total, opacity: 1, transform: centre + "scale(" + scale + ")", filter: SHADOW },
            { offset: (GROW_MS + HOLD_MS) / total, opacity: 1, transform: centre + "scale(" + scale + ")", filter: SHADOW, easing: "cubic-bezier(0.65, 0, 0.35, 1)" },
            { offset: 1, opacity: 1, transform: "none", filter: SHADOW }
        ], { duration: total, fill: "backwards" });

        animation.onfinish = finish;
        animation.oncancel = finish;
        setTimeout(finish, total + 1500);   // safety net: never leave the hero hidden
    }

    if (crest.complete) play();
    else {
        crest.addEventListener("load", play, { once: true });
        crest.addEventListener("error", finish, { once: true });
    }
})();
