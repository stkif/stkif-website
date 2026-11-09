// Lyca Mobile page: the logo stage leans gently towards the pointer.
// The rest of the animation is plain CSS and SVG (css/lyca-mobile.css).

(function () {
    "use strict";
    var stage = document.querySelector(".lyca-stage");
    if (!stage) return;
    var tilt = stage.querySelector(".lyca-tilt");
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (calm) {
        // stop the travelling dot too (it is SVG animation, which CSS can't pause)
        var svg = stage.querySelector("svg");
        if (svg && svg.pauseAnimations) svg.pauseAnimations();
        return;
    }

    // Pause everything while the stage is off screen, to save battery on phones
    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            var svg = stage.querySelector("svg");
            var on = entries[0].isIntersecting;
            stage.style.animationPlayState = on ? "" : "paused";
            stage.classList.toggle("is-paused", !on);
            if (svg && svg.pauseAnimations) { if (on) svg.unpauseAnimations(); else svg.pauseAnimations(); }
        }).observe(stage);
    }

    if (!window.matchMedia("(hover: hover)").matches) return;   // no tilt on touch screens
    stage.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", (x * 10).toFixed(2) + "deg");
        tilt.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
    });
    stage.addEventListener("pointerleave", function () {
        tilt.style.setProperty("--ry", "0deg");
        tilt.style.setProperty("--rx", "0deg");
    });
})();
