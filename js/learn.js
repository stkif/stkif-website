// Learn Tamil page.
// The collections (Thirukkural, Aathichoodi, ...) live in the "learn" folder, one file each.
// learn/learn-list.js says which ones show and in what order. See learn/README.md.

(function () {
    "use strict";

    var FOLDER = "learn/";
    var lessons = [];
    var root = document.getElementById("learn");
    var todayBox = document.getElementById("learn-today");
    if (!root) return;

    // Each lesson file calls addLesson({...})
    window.addLesson = function (lesson) { if (lesson && lesson.id) lessons.push(lesson); };

    // ---------- helpers ----------
    function lang() { return (window.STKi18n && window.STKi18n.lang()) || "en"; }
    function t(text) { return window.STKi18n ? window.STKi18n.t(text) : text; }
    function pick(obj) {
        if (!obj) return "";
        if (typeof obj === "string") return obj;
        return obj[lang()] || obj.en || obj.ta || "";
    }
    // Meanings exist in English and Swedish; the Tamil page shows the English one
    function meaning(item) { return (lang() === "sv" && item.sv) ? item.sv : (item.en || ""); }
    function esc(s) {
        return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    }
    function lines(s) { return esc(s).replace(/\n/g, "<br>"); }

    // ---------- read aloud (only if the device has a Tamil voice) ----------
    function tamilVoice() {
        if (!("speechSynthesis" in window)) return null;
        var voices = window.speechSynthesis.getVoices() || [];
        for (var i = 0; i < voices.length; i++) if (/^ta/i.test(voices[i].lang)) return voices[i];
        return null;
    }
    function speak(text) {
        var v = tamilVoice();
        if (!v) return;
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text.replace(/\n/g, " "));
        u.voice = v; u.lang = v.lang; u.rate = 0.8;
        window.speechSynthesis.speak(u);
    }
    function listenButton(text) {
        if (!tamilVoice()) return "";
        return '<button type="button" class="learn-listen" data-say="' + esc(text) + '" aria-label="' + esc(t("Listen")) + '"><span aria-hidden="true">🔊</span> <span>Listen</span></button>';
    }

    // ---------- load the files one by one ----------
    function load(names, done) {
        if (!names.length) { done(); return; }
        var s = document.createElement("script");
        s.src = FOLDER + names[0] + ".js";
        s.onload = s.onerror = function () { load(names.slice(1), done); };
        document.body.appendChild(s);
    }

    // ---------- Kural of the day ----------
    function renderToday() {
        if (!todayBox) return;
        var pool = [];
        lessons.forEach(function (l) {
            if (!l.dailyPick) return;
            (l.groups || []).forEach(function (g) { (g.items || []).forEach(function (it) { if (it.ta) pool.push({ lesson: l, item: it }); }); });
        });
        if (!pool.length) { todayBox.hidden = true; return; }
        var day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
        var p = pool[day % pool.length];
        todayBox.hidden = false;
        todayBox.innerHTML =
            '<div class="today-card">' +
            '<p class="today-label">Kural of the day</p>' +
            '<p class="today-ta" lang="ta" data-no-translate>' + lines(p.item.ta) + '</p>' +
            (p.item.tr ? '<p class="today-tr" data-no-translate>' + lines(p.item.tr) + '</p>' : "") +
            '<p class="today-meaning" data-no-translate>' + esc(meaning(p.item)) + '</p>' +
            '<p class="today-ref" data-no-translate>' + esc(pick(p.lesson.name)) + ' · ' + p.item.n + '</p>' +
            listenButton(p.item.ta) +
            '</div>';
    }

    // ---------- tabs and panels ----------
    var current = null;
    var testMode = false;
    var chosenConsonant = 0;
    var SIGNS = ["", "ா", "ி", "ீ", "ு", "ூ", "ெ", "ே", "ை", "ொ", "ோ", "ௌ"];
    var SOUNDS = ["a", "aa", "i", "ii", "u", "uu", "e", "ee", "ai", "o", "oo", "au"];

    function tabsHtml() {
        return '<div class="learn-tabs" role="tablist" aria-label="Learn Tamil">' + lessons.map(function (l) {
            var on = l.id === current;
            return '<button type="button" role="tab" id="tab-' + l.id + '" aria-controls="panel-' + l.id + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '" data-tab="' + l.id + '">' +
                '<span class="tab-ta" lang="ta" data-no-translate>' + esc(l.name.ta) + '</span>' +
                (lang() !== "ta" ? '<span class="tab-name" data-no-translate>' + esc(pick(l.name)) + '</span>' : "") +
                '</button>';
        }).join("") + '</div>';
    }

    function verseCard(item) {
        return '<article class="verse-card">' +
            (item.n ? '<span class="verse-no" data-no-translate>' + item.n + '</span>' : "") +
            '<p class="verse-ta" lang="ta" data-no-translate>' + lines(item.ta) + '</p>' +
            (item.tr ? '<p class="verse-tr" data-no-translate>' + lines(item.tr) + '</p>' : "") +
            (meaning(item) ? '<p class="verse-meaning" data-no-translate>' + esc(meaning(item)) + '</p>' +
                '<button type="button" class="reveal-btn">Show meaning</button>' : "") +
            listenButton(item.ta) +
            '</article>';
    }

    function lettersGroup(g) {
        return '<div class="letter-grid">' + g.items.map(function (it, i) {
            var attrs = g.consonants ? ' data-consonant="' + i + '" aria-pressed="' + (i === chosenConsonant) + '"' : ' data-say="' + esc(it.ta) + '"';
            return '<button type="button" class="letter-tile' + (g.consonants ? " is-consonant" : "") + '"' + attrs + '>' +
                '<span class="letter-ta" lang="ta" data-no-translate>' + esc(it.ta) + '</span>' +
                '<span class="letter-tr" data-no-translate>' + esc(it.tr) + '</span></button>';
        }).join("") + '</div>';
    }

    function combosHtml(lesson) {
        var group = (lesson.groups || []).filter(function (g) { return g.consonants; })[0];
        if (!group) return "";
        var c = group.items[chosenConsonant] || group.items[0];
        var base = c.ta.replace("்", "");
        var stem = c.tr.split(" ")[0].replace(/\/.*/, "").trim();
        return '<div class="combo-box"><h3>Make letters (uyirmei)</h3>' +
            '<p class="combo-help"><span lang="ta" data-no-translate>' + esc(c.ta) + '</span> + <span lang="ta" data-no-translate>அ ஆ இ …</span></p>' +
            '<div class="combo-row">' + SIGNS.map(function (sign, i) {
                var letter = base + sign;
                return '<button type="button" class="combo-tile" data-say="' + esc(letter) + '"><span class="letter-ta" lang="ta" data-no-translate>' + esc(letter) + '</span>' +
                    '<span class="letter-tr" data-no-translate>' + esc(stem + SOUNDS[i]) + '</span></button>';
            }).join("") + '</div></div>';
    }

    // ---------- History (type: "story"): fact cards and a timeline ----------
    function storyGroup(g) {
        if (g.facts) {
            return '<div class="fact-grid">' + g.items.map(function (it) {
                return '<div class="fact-card"><span class="fact-big" data-no-translate>' + esc(pick(it.big)) + '</span>' +
                    '<span class="fact-text" data-no-translate>' + esc(pick(it.text)) + '</span></div>';
            }).join("") + '</div>';
        }
        return '<ol class="timeline">' + g.items.map(function (it) {
            return '<li class="timeline-item"><span class="timeline-dot" aria-hidden="true"></span>' +
                '<p class="timeline-when" data-no-translate>' + esc(pick(it.when)) + '</p>' +
                '<h4 class="timeline-title" data-no-translate>' + esc(pick(it.title)) + '</h4>' +
                '<p class="timeline-text" data-no-translate>' + esc(pick(it.text)) + '</p></li>';
        }).join("") + '</ol>';
    }

    // ---------- Pages (perPage in a lesson file): one section at a time, a few verses per page ----------
    var paging = {};   // lesson id -> { g: section, p: page }
    function pageState(l) { return paging[l.id] || (paging[l.id] = { g: 0, p: 0 }); }

    function pagedHtml(l) {
        var st = pageState(l);
        var groups = l.groups || [];
        var g = groups[st.g] || groups[0];
        var items = g.items.filter(function (it) { return it.ta; });
        var per = l.perPage;
        var pages = Math.max(1, Math.ceil(items.length / per));
        if (st.p >= pages) st.p = pages - 1;
        var html = "";
        if (groups.length > 1) {
            html += '<div class="section-chips" role="group" aria-label="Sections">' + groups.map(function (gr, i) {
                return '<button type="button" class="section-chip" data-section="' + i + '" aria-pressed="' + (i === st.g) + '" data-no-translate>' +
                    esc(pick(gr.title)) + (lang() !== "ta" && gr.title && gr.title.ta ? '<span lang="ta">' + esc(gr.title.ta) + '</span>' : "") + '</button>';
            }).join("") + '</div>';
        }
        html += '<div class="verse-grid paged">' + items.slice(st.p * per, st.p * per + per).map(verseCard).join("") + '</div>';
        if (pages > 1) {
            var first = items[st.p * per], last = items[Math.min(items.length, st.p * per + per) - 1];
            html += '<nav class="pager" aria-label="Pages">' +
                '<button type="button" class="pager-btn" data-page="' + (st.p - 1) + '"' + (st.p === 0 ? " disabled" : "") + ' data-dir="prev">Previous</button>' +
                '<span class="pager-dots">' + Array.apply(null, { length: pages }).map(function (_, i) {
                    return '<button type="button" class="pager-dot" data-page="' + i + '" aria-label="' + (i + 1) + '"' + (i === st.p ? ' aria-current="page"' : "") + ' data-no-translate>' + (i + 1) + '</button>';
                }).join("") + '</span>' +
                '<button type="button" class="pager-btn" data-page="' + (st.p + 1) + '"' + (st.p === pages - 1 ? " disabled" : "") + ' data-dir="next">Next</button>' +
                '</nav>' +
                '<p class="pager-info" data-no-translate>' + (st.p * per + 1) + (last !== first ? "–" + Math.min(items.length, st.p * per + per) : "") + " / " + items.length + '</p>';
        }
        return html;
    }

    function panelHtml(l) {
        var html = '<div class="learn-panel' + (testMode ? " test-mode" : "") + '" role="tabpanel" id="panel-' + l.id + '" aria-labelledby="tab-' + l.id + '">';
        html += '<div class="panel-head"><h2><span lang="ta" data-no-translate>' + esc(l.name.ta) + '</span>' +
            (lang() !== "ta" ? ' <span class="panel-name" data-no-translate>' + esc(pick(l.name)) + '</span>' : "") + '</h2>' +
            (pick(l.by) ? '<p class="panel-by" data-no-translate>' + esc(pick(l.by)) + '</p>' : "") +
            '<p class="panel-about" data-no-translate>' + esc(pick(l.about)) + '</p>';
        if (l.type !== "letters" && l.type !== "story") {
            html += '<label class="test-toggle"><input type="checkbox"' + (testMode ? " checked" : "") + '> <span>Test yourself: hide the meanings</span></label>';
        }
        html += '</div>';
        if (l.perPage && l.type !== "letters" && l.type !== "story") return html + pagedHtml(l) + '</div>';
        (l.groups || []).forEach(function (g) {
            html += '<section class="learn-group"><h3 data-no-translate>' + (g.title ? esc(pick(g.title)) + (lang() !== "ta" && g.title.ta ? ' <span lang="ta" class="group-ta">· ' + esc(g.title.ta) + '</span>' : "") : "") + '</h3>';
            html += l.type === "letters" ? lettersGroup(g) : l.type === "story" ? storyGroup(g) : '<div class="verse-grid">' + g.items.filter(function (it) { return it.ta; }).map(verseCard).join("") + '</div>';
            html += '</section>';
        });
        if (l.type === "letters") html += combosHtml(l);
        return html + '</div>';
    }

    function render(focusTab) {
        if (!lessons.length) { root.innerHTML = '<p class="learn-empty">Lessons are coming soon.</p>'; return; }
        if (!current || !lessons.some(function (l) { return l.id === current; })) current = lessons[0].id;
        var lesson = lessons.filter(function (l) { return l.id === current; })[0];
        root.innerHTML = tabsHtml() + panelHtml(lesson);
        renderToday();
        if (window.STKi18n) { window.STKi18n.refresh(root); if (todayBox) window.STKi18n.refresh(todayBox); }
        if (focusTab) { var b = root.querySelector('[data-tab="' + current + '"]'); if (b) b.focus(); }
        document.dispatchEvent(new CustomEvent("learn:rendered"));
    }

    function currentLesson() { return lessons.filter(function (l) { return l.id === current; })[0]; }

    function choose(id, focusTab) {
        current = id;
        try { history.replaceState(null, "", "#" + id); } catch (e) { /* opened from a file */ }
        render(focusTab);
    }

    // ---------- clicks and keys ----------
    root.addEventListener("click", function (e) {
        var tab = e.target.closest("[data-tab]");
        if (tab) { choose(tab.getAttribute("data-tab")); return; }
        var chip = e.target.closest("[data-section]");
        if (chip) { var cl = currentLesson(); pageState(cl).g = +chip.getAttribute("data-section"); pageState(cl).p = 0; render(); return; }
        var pg = e.target.closest("[data-page]");
        if (pg && !pg.disabled) {
            pageState(currentLesson()).p = +pg.getAttribute("data-page");
            render();
            var tabs = root.querySelector(".learn-tabs");
            if (tabs && tabs.getBoundingClientRect().top < 0) tabs.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }
        var rev = e.target.closest(".reveal-btn");
        if (rev) {
            var card = rev.closest(".verse-card");
            var open = card.classList.toggle("revealed");
            rev.textContent = t(open ? "Hide meaning" : "Show meaning");
            return;
        }
        var cons = e.target.closest("[data-consonant]");
        if (cons) { chosenConsonant = +cons.getAttribute("data-consonant"); render(); var box = root.querySelector(".combo-box"); if (box && box.scrollIntoView) box.scrollIntoView({ behavior: "smooth", block: "nearest" }); return; }
        var say = e.target.closest("[data-say]");
        if (say) speak(say.getAttribute("data-say"));
    });

    root.addEventListener("change", function (e) {
        if (e.target.closest(".test-toggle")) { testMode = e.target.checked; render(); }
    });

    root.addEventListener("keydown", function (e) {
        if (!e.target.closest("[role=tab]") || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
        var i = lessons.map(function (l) { return l.id; }).indexOf(current);
        i = (i + (e.key === "ArrowRight" ? 1 : -1) + lessons.length) % lessons.length;
        choose(lessons[i].id, true);
    });

    if (todayBox) todayBox.addEventListener("click", function (e) {
        var b = e.target.closest("[data-say]");
        if (b) speak(b.getAttribute("data-say"));
    });

    document.addEventListener("language:changed", function () { if (lessons.length) render(); });
    if ("speechSynthesis" in window && window.speechSynthesis.addEventListener) {
        var hadVoice = !!tamilVoice();
        window.speechSynthesis.addEventListener("voiceschanged", function () {
            if (!!tamilVoice() !== hadVoice) { hadVoice = !hadVoice; if (lessons.length) render(); }
        });
    }

    // ---------- start ----------
    var start = (location.hash || "").replace("#", "");
    load((window.LEARN_FILES || []).slice(), function () {
        current = start || null;
        render();
    });
})();
