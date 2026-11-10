// Visitor statistics for www.stkif.se.
//
// Nothing is measured until you fill in an ID below. You can use one tool or several.
//
//   goatcounter      Free and simple. No cookies, so no cookie banner is needed.
//                    Sign up at https://www.goatcounter.com, pick a code (e.g. "stkif"),
//                    and write that code here: goatcounter: "stkif"
//
//   cloudflare       Free (Cloudflare Web Analytics). No cookies, so no banner either.
//                    Add the site at https://dash.cloudflare.com > Analytics & Logs > Web Analytics,
//                    choose "Manual setup" and copy the token from the snippet it shows you.
//
//   googleAnalytics  Google Analytics 4, the most detailed. It uses cookies, so Swedish rules
//                    require asking first: visitors see a small banner and Analytics only starts
//                    after they click "Accept". Write your Measurement ID here, e.g. "G-ABC123XYZ".
//
// What is counted besides page views: clicks through to a sponsor's website, completed
// Join Us registrations, and which language visitors choose.

var STK_ANALYTICS = {
    goatcounter: "",
    cloudflare: "",
    googleAnalytics: ""
};

(function () {
    "use strict";
    var cfg = window.STK_ANALYTICS || {};
    var STORE_KEY = "stkif-cookies";   // "yes" or "no": the visitor's answer to the banner
    var gaReady = false;

    function addScript(src, attrs) {
        var s = document.createElement("script");
        s.src = src;
        s.async = true;
        Object.keys(attrs || {}).forEach(function (k) { s.setAttribute(k, attrs[k]); });
        document.head.appendChild(s);
    }

    function answer() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
    function remember(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* private mode */ } }
    function t(text) { return (window.STKi18n && window.STKi18n.t) ? window.STKi18n.t(text) : text; }

    // ---------- Tools without cookies: start straight away ----------

    if (cfg.goatcounter) {
        addScript("https://gc.zgo.at/count.js", { "data-goatcounter": "https://" + cfg.goatcounter + ".goatcounter.com/count" });
    }
    if (cfg.cloudflare) {
        addScript("https://static.cloudflareinsights.com/beacon.min.js", { "data-cf-beacon": JSON.stringify({ token: cfg.cloudflare }), defer: "" });
    }

    // ---------- Google Analytics: only after the visitor says yes ----------

    function startGoogle() {
        if (gaReady || !cfg.googleAnalytics) return;
        gaReady = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
        window.gtag("js", new Date());
        window.gtag("config", cfg.googleAnalytics);
        addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.googleAnalytics));
    }

    // Saying no later removes the Analytics cookies again
    function stopGoogle() {
        document.cookie.split(";").forEach(function (c) {
            var name = c.split("=")[0].trim();
            if (/^_ga/.test(name)) {
                var host = location.hostname.replace(/^www\./, "");
                ["", "; domain=" + host, "; domain=." + host].forEach(function (d) {
                    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
                });
            }
        });
        if (gaReady) location.reload();   // stop the script that is already running
    }

    function showBanner() {
        if (document.getElementById("cookie-banner")) return;
        var box = document.createElement("div");
        box.id = "cookie-banner";
        box.setAttribute("role", "dialog");
        box.setAttribute("aria-live", "polite");
        box.setAttribute("aria-labelledby", "cookie-banner-title");
        box.innerHTML =
            '<p id="cookie-banner-title" class="cookie-title">May we count your visit?</p>' +
            '<p class="cookie-text">We would like to use Google Analytics cookies to see how our website is used, so we can plan better events. No advertising. You can change your mind at any time under "Cookie settings" at the bottom of every page.</p>' +
            '<div class="cookie-buttons">' +
                '<button type="button" class="cookie-btn" data-answer="no">Decline</button>' +
                '<button type="button" class="cookie-btn" data-answer="yes">Accept</button>' +
            '</div>';
        document.body.appendChild(box);
        if (window.STKi18n) window.STKi18n.refresh(box);
        box.addEventListener("click", function (e) {
            var b = e.target.closest("[data-answer]");
            if (!b) return;
            var yes = b.getAttribute("data-answer") === "yes";
            remember(yes ? "yes" : "no");
            box.remove();
            if (yes) startGoogle(); else stopGoogle();
        });
    }

    function addSettingsLink() {
        var footer = document.querySelector("footer #footer-container") || document.querySelector("footer");
        if (!footer || document.getElementById("cookie-settings")) return;
        var p = document.createElement("p");
        p.className = "cookie-settings-row";
        p.innerHTML = '<button type="button" id="cookie-settings" class="cookie-settings">Cookie settings</button>';
        footer.appendChild(p);
        if (window.STKi18n) window.STKi18n.refresh(p);
        p.querySelector("button").addEventListener("click", showBanner);
    }

    if (cfg.googleAnalytics) {
        if (answer() === "yes") startGoogle();
        else if (answer() !== "no") showBanner();
        addSettingsLink();
    }

    // ---------- Things worth counting ----------

    function track(name, label) {
        if (window.goatcounter && window.goatcounter.count) {
            window.goatcounter.count({ path: name + "/" + label, title: name, event: true });
        }
        if (gaReady && window.gtag) window.gtag("event", name, { label: label });
    }
    window.STKAnalytics = { track: track };

    // a click through to a sponsor's own website (links marked rel="sponsored")
    document.addEventListener("click", function (e) {
        var a = e.target.closest && e.target.closest('a[rel~="sponsored"]');
        if (a) track("sponsor_click", a.hostname.replace(/^www\./, "") + location.pathname.replace(/\.html$/, ""));
    });
    // a finished Join Us registration (js/joinus.js sends this)
    document.addEventListener("stk:joined", function () { track("join_registration", location.pathname.replace(/^\//, "") || "joinus"); });
    // the language a visitor switches to
    document.addEventListener("language:changed", function (e) {
        if (e.detail && e.detail.lang) track("language", e.detail.lang);
    });
})();
