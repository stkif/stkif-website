// Site-wide extras, loaded on every page:
//  - animated icons in the header menu and on buttons
//  - the Nilgiri tahr mascot pictures (which picture goes where: mascots/mascot-list.js)
//  - the dancing goat icon on "Join Us" and "Register"
//  - working mobile menu (hamburger button)
//  - gentle fade-in of cards as you scroll
//
// To give any button or link an icon, add data-icon="name" to it in the HTML,
// e.g. <a class="button" data-icon="goat" href="joinus.html">Join Us</a>
// Available icons: every file in the icons folder (goat, home, calendar, info, gallery,
// members, ticket, send, arrow, email, phone, instagram, facebook)

(function () {
    "use strict";

    // ---------- Icons ----------
    // Every icon is its own .svg file in the "icons" folder (icons/goat.svg, icons/home.svg, ...).
    // To add an icon: put a new .svg file in that folder and use its file name, e.g. data-icon="star".
    // To change one: replace the file. See icons/README.md.
    var ICON_FOLDER = "icons/";
    var iconCache = {};

    // "goat" -> icons/goat.svg ; "mascots/my-goats/x.png" -> used as it is
    function iconPath(name) {
        return /[\/.]/.test(name) ? name : ICON_FOLDER + name + ".svg";
    }

    function loadIcon(path) {
        if (!iconCache[path]) {
            iconCache[path] = fetch(path)
                .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
                .then(function (text) { return text.slice(text.indexOf("<svg")); });
        }
        return iconCache[path];
    }

    function addIcon(element, name) {
        name = pick(name);
        if (!element || !name || element.querySelector(".icon")) return;
        var path = iconPath(name);
        var isSvg = /\.svg$/i.test(path);
        var span = document.createElement("span");
        span.className = "icon " + (/[\/.]/.test(name) ? "icon-picture" : "icon-" + name);
        span.setAttribute("aria-hidden", "true");
        element.insertBefore(span, element.firstChild);
        element.classList.add("has-icon");
        var showPicture = function (fallback) {
            span.innerHTML = '<img src="' + path + '" alt=""' + (fallback ? ' class="icon-fallback"' : "") + '>';
        };
        if (!isSvg) { showPicture(false); return; }
        loadIcon(path).then(function (svg) {
            // Inline SVG, so the icon takes the text colour and can animate
            span.innerHTML = svg;
        }).catch(function () {
            // Opening the files straight from the computer blocks loading, so show the picture instead
            showPicture(true);
        });
    }

    // Icons in content that is added later (e.g. the member cards)
    function applyIcons(root) {
        Array.prototype.forEach.call((root || document).querySelectorAll("[data-icon]"), function (el) {
            addIcon(el, el.getAttribute("data-icon"));
        });
    }
    window.STKIcons = { add: addIcon, apply: applyIcons };

    // ---------- Mascots: the Nilgiri tahr ----------
    // Which picture goes in which spot is set in mascots/mascot-list.js.
    // Put a spot anywhere with  <span class="mascot" data-mascot="home-hero"></span>
    // (a spot name from that list, or straight away a drawing name such as "tahr-dance"). See mascots/README.md.
    var MASCOT_FOLDER = "mascots/tahr/";
    var SHOW_FOOTER_RIDGE = true;   // mountains with the tahr above every footer
    var SHOW_BACK_TO_TOP = true;    // leaping tahr button to jump back to the top

    // A list of pictures -> pick one at random
    function pick(value) {
        if (Array.isArray(value)) value = value.length ? value[Math.floor(Math.random() * value.length)] : "";
        return value;
    }

    function setting(spot, fallback) {
        var list = window.STK_MASCOTS || {};
        return pick(Object.prototype.hasOwnProperty.call(list, spot) ? list[spot] : fallback);
    }

    // "tahr-wave" -> mascots/tahr/tahr-wave.svg ; "mascots/my-goats/x.png" -> used as it is
    function mascotPath(name) {
        return /[\/.]/.test(name) ? name : MASCOT_FOLDER + name + ".svg";
    }

    function loadMascot(el) {
        var spot = el.getAttribute("data-mascot");
        if (!spot || el.getAttribute("data-mascot-ready")) return;
        el.setAttribute("data-mascot-ready", "1");
        var name = setting(spot, spot);
        if (!name) { el.style.display = "none"; return; }   // spot switched off in the list
        var path = mascotPath(name);
        el.classList.add("mascot", "mascot-" + spot);
        var showPicture = function () {
            var img = document.createElement("img");
            img.src = path;
            img.alt = "";
            img.setAttribute("aria-hidden", "true");
            img.onerror = function () { el.style.display = "none"; };   // file missing: hide the spot quietly
            el.insertBefore(img, el.firstChild);
        };
        if (!/\.svg$/i.test(path)) { el.classList.add("mascot-picture"); showPicture(); return; }
        fetch(path)
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(function (text) {
                var holder = document.createElement("span");
                holder.innerHTML = text.slice(text.indexOf("<svg"));
                var svg = holder.firstElementChild;
                if (svg) {
                    svg.removeAttribute("role");
                    svg.removeAttribute("aria-label");
                    svg.setAttribute("aria-hidden", "true");   // decoration only
                    el.insertBefore(svg, el.firstChild);
                }
            })
            .catch(showPicture);
    }

    function addMascots(root) {
        Array.prototype.forEach.call((root || document).querySelectorAll("[data-mascot]"), loadMascot);
    }

    var footerEl = document.querySelector("footer");
    if (SHOW_FOOTER_RIDGE && footerEl && !document.querySelector(".mascot-ridge")) {
        var ridge = document.createElement("div");
        ridge.className = "mascot-ridge";
        ridge.setAttribute("data-mascot", "footer-ridge");
        // the tahr that runs across the mountains ("footer-runner" in mascots/mascot-list.js)
        var runner = document.createElement("span");
        runner.className = "ridge-runner";
        runner.setAttribute("data-mascot", "footer-runner");
        ridge.appendChild(runner);
        footerEl.parentNode.insertBefore(ridge, footerEl);
    }

    if (SHOW_BACK_TO_TOP) {
        var top = document.createElement("button");
        top.type = "button";
        top.id = "to-top";
        top.setAttribute("aria-label", "Back to top");
        top.innerHTML = '<span data-mascot="back-to-top"></span>';
        document.body.appendChild(top);
        top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
        var onScroll = function () { top.classList.toggle("show", window.scrollY > 600); };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    addMascots(document);

    // ---------- Theme preview ----------
    // Try another theme without changing files: add ?theme=sunrise (or nilgiri-mist, twilight, golden-peak) to the address.
    var themeParam = (location.search.match(/[?&]theme=([a-z0-9-]+)/) || [])[1];
    if (themeParam) {
        var themeLink = document.createElement("link");
        themeLink.rel = "stylesheet";
        themeLink.href = "css/themes/" + themeParam + ".css";
        document.head.appendChild(themeLink);
    }

    // ---------- Header menu ----------
    // Which icon goes with which menu link (file names from the icons folder)
    var NAV_ICONS = {
        "index.html": "home",
        "events.html": "calendar",
        "about.html": "info",
        "gallery.html": "gallery",
        "learn-tamil.html": "book",
        "members.html": "members",
        "joinus.html": setting("menu-join-us", "goat")
    };
    var currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    var header = document.querySelector("header");
    var menu = header ? header.querySelector("ul") : null;

    if (menu) {
        menu.classList.add("site-menu");
        if (!menu.id) menu.id = "site-menu";

        Array.prototype.forEach.call(menu.querySelectorAll("li"), function (li) {
            if (li.textContent.trim() === "|") li.classList.add("menu-sep");
        });

        Array.prototype.forEach.call(menu.querySelectorAll("a"), function (a) {
            var page = (a.getAttribute("href") || "").toLowerCase();
            addIcon(a, NAV_ICONS[page]);
            if (page === "joinus.html") a.classList.add("menu-cta");
            if (page === currentPage) {
                a.classList.add("is-current");
                a.setAttribute("aria-current", "page");
            }
        });
    }

    // ---------- Mobile menu (hamburger) ----------
    var burger = document.getElementById("hamburguer-buttom");
    if (header && menu && burger) {
        // Turn the image into a proper, keyboard-friendly button
        var btn = document.createElement("button");
        btn.type = "button";
        btn.id = "menu-toggle";
        btn.setAttribute("aria-controls", menu.id);
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Open menu");
        btn.innerHTML = '<span></span><span></span><span></span>';
        burger.replaceWith(btn);
        header.appendChild(btn);

        function setOpen(open) {
            header.classList.toggle("menu-open", open);
            btn.setAttribute("aria-expanded", String(open));
            btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        }
        btn.addEventListener("click", function () {
            setOpen(!header.classList.contains("menu-open"));
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") setOpen(false);
        });
        menu.addEventListener("click", function (e) {
            if (e.target.closest("a")) setOpen(false);
        });
    }

    // ---------- Fit the header ----------
    // If the menu does not fit on one line (small laptop, or long Tamil words),
    // switch to the compact header with the menu button.
    function fitHeader() {
        if (!header || !menu) return;
        header.classList.remove("compact");
        if (window.innerWidth <= 800) { header.classList.add("compact"); return; }
        var logo = header.querySelector("#logo");
        var sw = header.querySelector(".lang-switch");
        var links = menu.querySelectorAll("a");
        var tooTall = Array.prototype.some.call(links, function (a) { return a.getBoundingClientRect().height > 48; });
        var mr = menu.getBoundingClientRect();
        var overlapLogo = logo && logo.getBoundingClientRect().right > mr.left - 8;
        var overlapSwitch = sw && sw.getBoundingClientRect().left < mr.right + 4;
        var overflow = header.scrollWidth > header.clientWidth + 1 || (sw && sw.getBoundingClientRect().right > header.clientWidth);
        if (tooTall || overlapLogo || overlapSwitch || overflow || mr.height > 52) header.classList.add("compact");
        if (!header.classList.contains("compact") && header.classList.contains("menu-open")) header.classList.remove("menu-open");
    }
    fitHeader();
    window.addEventListener("resize", fitHeader);
    document.addEventListener("language:changed", function () { requestAnimationFrame(fitHeader); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeader);

    // ---------- Icons on buttons ----------
    // Anything with data-icon="..." in the HTML
    applyIcons(document);
    document.addEventListener("members:rendered", function () { applyIcons(document.getElementById("members")); });
    // Defaults for the site's existing buttons, so no HTML change is needed
    Array.prototype.forEach.call(document.querySelectorAll(".card-button"), function (el) { addIcon(el, "ticket"); });
    Array.prototype.forEach.call(document.querySelectorAll(".button-register"), function (el) { addIcon(el, setting("register-button", "goat")); });
    Array.prototype.forEach.call(document.querySelectorAll("form button[type=submit]"), function (el) { addIcon(el, setting("send-button", "goat")); });

    // ---------- Fade cards in as they scroll into view ----------
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && "IntersectionObserver" in window) {
        var targets = document.querySelectorAll(
            ".activity-card, .event-card-container, .card, .gallery-image-container, .member-card, .about-introduction"
        );
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -40px 0px" });
        Array.prototype.forEach.call(targets, function (el, i) {
            el.classList.add("reveal");
            el.style.transitionDelay = (i % 4) * 70 + "ms";
            observer.observe(el);
        });
        // Member cards are added later by members.js
        document.addEventListener("members:rendered", function () {
            Array.prototype.forEach.call(document.querySelectorAll(".member-card:not(.reveal)"), function (el, i) {
                el.classList.add("reveal");
                el.style.transitionDelay = (i % 4) * 70 + "ms";
                observer.observe(el);
            });
        });
    }
})();
