// Event poster popup for the home page.
//
// The posters are normal image files in the "posters" folder.
// To update the website: replace an image in that folder (same file name),
// or add a new image and add its file name to the list below.
// If the list has more than one file, one is picked at random each visit.

const POSTER_FOLDER = "posters/";
const POSTER_FILES = [
    "poster-1.jpg"
];

(function () {
    const overlay = document.getElementById("poster-overlay");
    if (!overlay || POSTER_FILES.length === 0) return;

    const file = POSTER_FILES[Math.floor(Math.random() * POSTER_FILES.length)];
    const image = new Image();

    // Only open the popup once the image has loaded (no empty box if it is missing),
    // and after the home page intro (js/hero-intro.js) has finished
    image.onload = function () {
        if (document.documentElement.classList.contains("hero-intro")) {
            document.addEventListener("hero-intro:done", openPoster, { once: true });
        } else {
            openPoster();
        }
    };

    function openPoster() {
        overlay.innerHTML =
            '<div class="poster" role="dialog" aria-modal="true" aria-label="Event poster">' +
                '<button class="poster-close" type="button" aria-label="Close poster">&times;</button>' +
                '<a href="events.html" aria-label="See all events"></a>' +
            '</div>';

        image.className = "poster-image";
        image.alt = "Event poster";
        overlay.querySelector("a").appendChild(image);

        const closeButton = overlay.querySelector(".poster-close");

        function closePoster() {
            overlay.classList.remove("open");
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKey);
        }

        function onKey(e) {
            if (e.key === "Escape") closePoster();
        }

        closeButton.addEventListener("click", closePoster);
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) closePoster();
        });
        document.addEventListener("keydown", onKey);

        overlay.classList.add("open");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    }

    image.src = POSTER_FOLDER + file;
})();
