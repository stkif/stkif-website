// Sponsors, built from sponsors/sponsors-list.js (see sponsors/README.md). Three places use it:
//   - About page:     #sponsor-grid        logo tiles, each opening the sponsor's page (or the Sponsors page)
//   - Sponsors page:  #sponsor-cards       a card per sponsor with "Learn more" / "Visit website"
//   - Home page:      #home-sponsor-grid   logo tiles, same as on the About page

(function () {
    "use strict";
    var SPONSOR_FOLDER = "sponsors/";
    var sponsors = (window.STK_SPONSORS || []).filter(function (s) { return s && s.name; });

    function t(text) { return (window.STKi18n && window.STKi18n.t) ? window.STKi18n.t(text) : text; }
    function el(tag, cls, text) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text != null) e.textContent = text;
        return e;
    }

    // The logo on its own background colour, so every tile looks the same size
    function logoTile(s, tag) {
        var tile = el(tag || "div", "sponsor");
        tile.setAttribute("data-no-translate", "");   // company names stay as written
        if (s.bg) tile.style.background = s.bg;
        // light tiles get a thin border so they don't melt into a white page
        if (!s.bg || ["#fff", "#ffffff", "#fefefe", "#fbf7f2"].indexOf(String(s.bg).toLowerCase()) > -1) tile.classList.add("sponsor-light");
        if (s.logo) {
            var img = el("img");
            img.src = SPONSOR_FOLDER + s.logo;
            img.alt = s.name;
            img.loading = "lazy";
            img.decoding = "async";
            img.onerror = function () { img.replaceWith(document.createTextNode(s.name)); };
            tile.appendChild(img);
        } else {
            tile.textContent = s.name;
        }
        return tile;
    }

    // Tiles (About and home): each one opens the sponsor's own page, or the Sponsors page
    function fillTiles(grid) {
        sponsors.forEach(function (s) {
            var a = logoTile(s, "a");
            a.href = s.page || "sponsors.html";
            a.setAttribute("aria-label", s.name);
            grid.appendChild(a);
        });
    }

    // Cards (Sponsors page)
    function fillCards(list) {
        list.innerHTML = "";
        sponsors.forEach(function (s) {
            var card = el("article", "sponsor-card");
            if (s.page) {
                var link = el("a", "sponsor-card-logo");
                link.href = s.page;
                link.setAttribute("aria-label", s.name);
                link.appendChild(logoTile(s));
                card.appendChild(link);
            } else {
                card.appendChild(logoTile(s));
            }
            var name = el("h2", "sponsor-name", s.name);
            name.setAttribute("data-no-translate", "");
            card.appendChild(name);
            if (s.what) card.appendChild(el("p", "sponsor-what", t(s.what)));

            var actions = el("div", "sponsor-actions");
            if (s.page) {
                var more = el("a", "button button-primary sponsor-more", t("Learn more"));
                more.href = s.page;
                more.setAttribute("aria-label", t("Learn more") + ": " + s.name);
                actions.appendChild(more);
            }
            if (s.url) {
                var web = el("a", "sponsor-web", t("Visit website"));
                web.href = s.url;
                web.target = "_blank";
                web.rel = "noopener sponsored";
                web.setAttribute("aria-label", t("Visit website") + ": " + s.name);
                actions.appendChild(web);
            }
            if (actions.children.length) card.appendChild(actions);
            list.appendChild(card);
        });
    }

    var aboutSection = document.getElementById("sponsors");
    var aboutGrid = document.getElementById("sponsor-grid");
    if (aboutSection && aboutGrid && sponsors.length) {
        fillTiles(aboutGrid);
        aboutSection.classList.add("has-sponsors");
    }

    var homeGrid = document.getElementById("home-sponsor-grid");
    if (homeGrid) {
        if (sponsors.length) fillTiles(homeGrid);
        else if (homeGrid.closest("section")) homeGrid.closest("section").hidden = true;
    }

    var cards = document.getElementById("sponsor-cards");
    if (cards) {
        fillCards(cards);
        // "what they do" and the buttons follow the language switcher
        document.addEventListener("language:changed", function () { fillCards(cards); });
    }
})();
