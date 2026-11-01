// Sponsors section on the About page.
// The list of sponsors lives in sponsors/sponsors-list.js (see sponsors/README.md).

(function () {
    const SPONSOR_FOLDER = "sponsors/";
    const section = document.getElementById("sponsors");
    const grid = document.getElementById("sponsor-grid");
    if (!section || !grid) return;

    const sponsors = (window.STK_SPONSORS || []).filter(function (s) { return s && s.name; });
    if (!sponsors.length) return;   // only the "Become a sponsor" invitation is shown

    sponsors.forEach(function (s) {
        const item = document.createElement(s.url ? "a" : "div");
        item.className = "sponsor";
        item.setAttribute("data-no-translate", "");   // company names stay as written
        if (s.url) {
            item.href = s.url;
            item.target = "_blank";
            item.rel = "noopener sponsored";
        }
        if (s.logo) {
            const img = document.createElement("img");
            img.src = SPONSOR_FOLDER + s.logo;
            img.alt = s.name;
            img.loading = "lazy";
            img.onerror = function () { img.replaceWith(document.createTextNode(s.name)); };
            item.appendChild(img);
        } else {
            item.textContent = s.name;
        }
        grid.appendChild(item);
    });
    section.classList.add("has-sponsors");
})();
