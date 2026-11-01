// Language switcher: English · Svenska · தமிழ்
//
// The website is written in English. Translations live in the "lang" folder:
//     lang/languages.js   which languages appear in the switcher
//     lang/sv.js          Swedish:  "English text": "Svensk text"
//     lang/ta.js          Tamil:    "English text": "தமிழ் உரை"
// Any text without a translation simply stays in English, so nothing ever breaks.
// See lang/README.md for how to add or change a translation.

(function () {
    "use strict";
    // The ?v=... on this script's own link (set in the HTML), passed on to the files it loads
    var VERSION = (document.currentScript && /\?v=[^&#]+/.exec(document.currentScript.src) || [""])[0];

    var DEFAULT = "en";
    var STORE_KEY = "stkif-language";
    var INLINE = { STRONG: 1, EM: 1, B: 1, I: 1, BR: 1, SPAN: 1, A: 1, SMALL: 1, U: 1 };
    var SKIP = { SCRIPT: 1, STYLE: 1, SVG: 1, TEXTAREA: 1, NOSCRIPT: 1, IMG: 1, INPUT: 1 };
    var ATTRS = ["placeholder", "alt", "aria-label", "title"];

    window.STK_TRANSLATIONS = window.STK_TRANSLATIONS || {};
    var languages = window.STK_LANGUAGES || [{ code: "en", label: "English", short: "EN" }];
    var units = [];        // elements whose text we translate
    var attrUnits = [];    // elements whose attributes we translate
    var current = DEFAULT;
    var originalTitle = document.title;

    function norm(s) { return (s || "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim(); }
    function worthTranslating(s) { return /[A-Za-zÀ-ÿ஀-௿]{2,}/.test(s); }

    function htmlWithoutIcons(el) {
        if (!el.querySelector(".icon")) return el.innerHTML;
        var copy = el.cloneNode(true);
        Array.prototype.forEach.call(copy.querySelectorAll(".icon"), function (i) { i.remove(); });
        return copy.innerHTML;
    }

    function isUnit(el) {
        // A wrapper around a single link or button: translate the link itself instead
        var kids = Array.prototype.filter.call(el.children, function (c) { return !c.classList.contains("icon"); });
        var direct = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.nodeValue.trim(); });
        if (!direct && kids.length === 1) return false;
        // A row of links or buttons (e.g. two buttons side by side): translate each one separately
        if (!direct && kids.length > 1 && kids.every(function (k) { return k.tagName === "A" || k.tagName === "BUTTON"; })) return false;
        var hasText = false;
        for (var n = el.firstChild; n; n = n.nextSibling) {
            if (n.nodeType === 3 && n.nodeValue.trim()) hasText = true;
            if (n.nodeType === 1) {
                if (n.classList.contains("icon")) continue;
                if (!INLINE[n.tagName]) return false;
                if (n.querySelector && n.querySelector("div,p,ul,ol,li,section,h1,h2,h3,h4,img,svg,button,select,table")) return false;
                if (norm(n.textContent)) hasText = true;
            }
        }
        return hasText;
    }

    function register(root) {
        (function walk(el) {
            if (el.nodeType !== 1 || SKIP[el.tagName] || el.hasAttribute("data-no-translate") || el.classList.contains("icon")) return;
            ATTRS.forEach(function (a) {
                if (el.hasAttribute(a) && !el["__stk_" + a] && worthTranslating(el.getAttribute(a))) {
                    el["__stk_" + a] = el.getAttribute(a);
                    attrUnits.push({ el: el, attr: a });
                }
            });
            if (el.__stkKey !== undefined) return;
            if (isUnit(el)) {
                var key = norm(htmlWithoutIcons(el));
                if (worthTranslating(key)) {
                    el.__stkKey = key;
                    el.__stkOrig = htmlWithoutIcons(el);
                    el.__stkShown = el.__stkOrig;
                    units.push(el);
                }
                return;
            }
            for (var c = el.firstChild; c; c = c.nextSibling) {
                if (c.nodeType === 1) walk(c);
                // Loose text next to a form field, e.g. <label><input> Sports</label>
                else if (c.nodeType === 3 && c.__stkKey === undefined && worthTranslating(c.nodeValue)) {
                    c.__stkKey = norm(c.nodeValue);
                    c.__stkOrig = c.nodeValue;
                    c.__stkShown = c.__stkOrig;
                    units.push(c);
                }
            }
        })(root);
        // images and inputs only have attributes
        Array.prototype.forEach.call(root.querySelectorAll ? root.querySelectorAll("img,input") : [], function (el) {
            ATTRS.forEach(function (a) {
                if (el.hasAttribute(a) && !el["__stk_" + a] && worthTranslating(el.getAttribute(a))) {
                    el["__stk_" + a] = el.getAttribute(a);
                    attrUnits.push({ el: el, attr: a });
                }
            });
        });
    }

    function dict() { return window.STK_TRANSLATIONS[current] || {}; }

    function t(english) {
        if (current === DEFAULT) return english;
        var d = dict();
        return d[norm(english)] || english;
    }

    function setHtmlKeepIcon(el, html) {
        var icon = el.querySelector(":scope > .icon");
        el.innerHTML = html;
        if (icon) el.insertBefore(icon, el.firstChild);
    }

    function applyTo(list, attrList) {
        var d = dict();
        list.forEach(function (el) {
            var tr = current === DEFAULT ? null : d[el.__stkKey];
            var target = tr || el.__stkOrig;
            if (el.__stkShown === target) return;   // already showing the right text
            if (el.nodeType === 3) {
                var lead = el.__stkOrig.match(/^\s*/)[0], tail = el.__stkOrig.match(/\s*$/)[0];
                el.nodeValue = tr ? lead + tr + tail : el.__stkOrig;
            } else {
                setHtmlKeepIcon(el, target);
            }
            el.__stkShown = target;
        });
        attrList.forEach(function (u) {
            var orig = u.el["__stk_" + u.attr];
            var tr = current === DEFAULT ? null : d[norm(orig)];
            u.el.setAttribute(u.attr, tr || orig);
        });
    }

    function apply() {
        document.documentElement.lang = current;
        document.documentElement.setAttribute("data-lang", current);
        document.title = t(originalTitle);
        applyTo(units, attrUnits);
        Array.prototype.forEach.call(document.querySelectorAll(".lang-switch button"), function (b) {
            b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === current));
        });
        document.dispatchEvent(new CustomEvent("language:changed", { detail: { lang: current } }));
    }

    function loadLanguage(code, done) {
        if (code === DEFAULT || window.STK_TRANSLATIONS[code]) { done(); return; }
        var s = document.createElement("script");
        s.src = "lang/" + code + ".js" + VERSION;
        s.onload = done;
        s.onerror = function () { console.warn("Missing translation file lang/" + code + ".js"); done(); };
        document.head.appendChild(s);
    }

    function setLanguage(code) {
        if (!languages.some(function (l) { return l.code === code; })) code = DEFAULT;
        try { localStorage.setItem(STORE_KEY, code); } catch (e) { /* private mode */ }
        loadLanguage(code, function () { current = code; apply(); });
    }

    // ---------- The switcher at the top of every page ----------
    function buildSwitcher() {
        var header = document.querySelector("header");
        if (!header || languages.length < 2) return;
        var box = document.createElement("div");
        box.className = "lang-switch";
        box.setAttribute("role", "group");
        box.setAttribute("aria-label", "Language");
        box.setAttribute("data-no-translate", "");
        languages.forEach(function (l) {
            var b = document.createElement("button");
            b.type = "button";
            b.setAttribute("data-lang", l.code);
            b.setAttribute("lang", l.code);
            b.setAttribute("aria-label", l.label);
            b.title = l.label;
            b.textContent = l.short || l.label;
            b.addEventListener("click", function () { setLanguage(l.code); });
            box.appendChild(b);
        });
        header.appendChild(box);
    }

    // ---------- Start ----------
    var fromUrl = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    var saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* ignore */ }

    buildSwitcher();
    register(document.body);
    setLanguage(fromUrl || saved || DEFAULT);

    // Member cards are built after the page loads
    document.addEventListener("members:rendered", function () {
        window.STKi18n.refresh(document.getElementById("members"));
    });

    // Public helpers for other scripts (members cards, form messages)
    window.STKi18n = {
        t: t,
        lang: function () { return current; },
        // Call after adding new content to the page, so it gets translated too
        refresh: function (root) {
            var before = units.length, beforeA = attrUnits.length;
            register(root || document.body);
            applyTo(units.slice(before), attrUnits.slice(beforeA));
        },
        // For checking which texts still need a translation (open the browser console and run STKi18n.missing())
        missing: function () {
            var d = dict();
            var keys = units.map(function (u) { return u.__stkKey; })
                .concat(attrUnits.map(function (u) { return norm(u.el["__stk_" + u.attr]); }));
            return keys.filter(function (k, i) { return keys.indexOf(k) === i && !d[k]; });
        },
        all: function () {
            var keys = units.map(function (u) { return u.__stkKey; })
                .concat(attrUnits.map(function (u) { return norm(u.el["__stk_" + u.attr]); }));
            return keys.filter(function (k, i) { return keys.indexOf(k) === i; });
        },
        set: setLanguage
    };
})();
