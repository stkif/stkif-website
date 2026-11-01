// Members page.
//
// Each member lives in their own folder inside "members/":
//     members/<folder>/info.js     (name, position, contact details)
//     members/<folder>/photo.jpg   (their photo, optional)
// The order of the cards comes from members/members-list.js.
// See members/README.md for how to add or remove someone.
//
// This works on any web host and when opening the files straight from your computer.

(function () {
    // The ?v=... on this script's own link (set in the HTML), passed on to the files it loads
    var VERSION = (document.currentScript && /\?v=[^&#]+/.exec(document.currentScript.src) || [""])[0];
    const MEMBERS_FOLDER = "members/";
    const container = document.getElementById("members");
    if (!container) return;

    const folders = (window.MEMBER_FOLDERS || []).filter(function (f) {
        return typeof f === "string" && f.trim() !== "";
    });
    const members = [];
    let currentFolder = null;

    // Called by each members/<folder>/info.js
    window.addMember = function (data) {
        if (!data || !data.name) return;
        data.folder = currentFolder;
        members.push(data);
    };

    function loadNext(i) {
        if (i >= folders.length) { render(); return; }
        currentFolder = folders[i].trim();
        const script = document.createElement("script");
        script.src = MEMBERS_FOLDER + currentFolder + "/info.js" + VERSION;
        script.onload = function () { loadNext(i + 1); };
        script.onerror = function () {
            console.warn("Members: could not find " + script.src + " (check the folder name in members-list.js)");
            loadNext(i + 1);
        };
        document.body.appendChild(script);
    }

    // ---- Building the cards ----

    function el(tag, className, text) {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text != null) e.textContent = text;
        return e;
    }

    function icon(name) {
        // The picture comes from icons/<name>.svg (added by js/site.js)
        const span = el("span", "member-icon");
        span.setAttribute("data-icon", name);
        return span;
    }

    function initials(name) {
        return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join("");
    }

    function contactRow(type, label, href) {
        const li = el("li");
        const a = el("a", null, label);
        a.href = href;
        if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
        li.appendChild(icon(type));
        li.appendChild(a);
        return li;
    }

    function socialUrl(value, base) {
        if (/^https?:\/\//.test(value)) return value;
        return base + value.replace(/^@/, "");
    }

    function card(m) {
        const article = el("article", "member-card");

        const photoBox = el("div", "member-photo");
        const fallback = el("span", "member-initials", initials(m.name));
        fallback.setAttribute("aria-hidden", "true");
        fallback.setAttribute("data-no-translate", "");
        photoBox.appendChild(fallback);
        if (m.photo) {
            const img = el("img");
            img.alt = "Photo of " + m.name;
            img.loading = "lazy";
            img.onerror = function () { img.remove(); };
            img.src = MEMBERS_FOLDER + m.folder + "/" + m.photo;
            photoBox.appendChild(img);
        }
        article.appendChild(photoBox);

        const nameEl = el("h3", "member-name", m.name);
        nameEl.setAttribute("data-no-translate", "");   // names stay as written
        article.appendChild(nameEl);
        if (m.position) article.appendChild(el("p", "member-position", m.position));
        if (m.about) article.appendChild(el("p", "member-about", m.about));

        const contacts = el("ul", "member-contacts");
        if (m.email) contacts.appendChild(contactRow("email", m.email, "mailto:" + m.email));
        if (m.phone) contacts.appendChild(contactRow("phone", m.phone, "tel:" + m.phone.replace(/[^\d+]/g, "")));
        if (m.instagram) contacts.appendChild(contactRow("instagram", "Instagram", socialUrl(m.instagram, "https://www.instagram.com/")));
        if (m.facebook) contacts.appendChild(contactRow("facebook", "Facebook", socialUrl(m.facebook, "https://www.facebook.com/")));
        if (contacts.children.length) article.appendChild(contacts);

        return article;
    }

    function render() {
        container.textContent = "";
        if (!members.length) {
            container.appendChild(el("p", "members-loading", "Member details are coming soon."));
            return;
        }
        // Group cards by "group" (e.g. Board, Team leads), keeping the order of members-list.js
        const groups = [];
        members.forEach(function (m) {
            const name = m.group || "";
            let g = groups.find(function (x) { return x.name === name; });
            if (!g) { g = { name: name, people: [] }; groups.push(g); }
            g.people.push(m);
        });
        groups.forEach(function (g) {
            const section = el("div", "member-group");
            if (g.name) section.appendChild(el("h2", "member-group-title", g.name));
            const grid = el("div", "member-grid");
            g.people.forEach(function (m) { grid.appendChild(card(m)); });
            section.appendChild(grid);
            container.appendChild(section);
        });
        document.dispatchEvent(new CustomEvent("members:rendered"));
    }

    loadNext(0);
})();
