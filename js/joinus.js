// Join Us form -> the STK membership & Super Lucky Draw Google Form (back end).
// Every sign-up lands in the same sheet as the QR-code form, so it is also on the lucky-draw wheel.
// Entry IDs come from the Google Form's pre-filled link.

const CONFIG = {
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSev8uhQVU8lrrZ8FrfyntH2pnVBUv7adPz_jetuH9novJTM0g/formResponse",

    entries: {
        fullname: "entry.1341806306",
        email: "entry.1423375731",
        phone: "entry.1735404168",
        whatsapp: "entry.568488317",      // optional
        dob: "entry.1697873479",          // Date question
        area: "entry.1259779861",         // optional
        activities: "entry.959228870",    // Checkboxes question ("Interested in")
        consent: "entry.817569883"        // Checkbox, the only choice below
    },
    consentChoice: "I agree to the above"
};

// The same rules the Google Form uses. Google never tells the page when it rejects an answer,
// so anything it would reject must be caught here, or the visitor sees "Thank you" for nothing.
const PHONE_RULE = /^[+0-9 ()-]{6,20}$/;
const EMAIL_RULE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The lucky draw is on one day only. Everything marked "draw-only" on the page hides itself at this
// moment (Stockholm time), with no change needed to the website. Nothing else on the page depends on it.
const DRAW_ENDS = new Date("2026-11-07T18:00:00+01:00");

function applyDrawCampaign(now) {
    const on = (now || new Date()) < DRAW_ENDS;
    document.querySelectorAll(".draw-only").forEach(function (el) {
        el.hidden = !on;
    });
}
applyDrawCampaign();

const successPopup = document.getElementById("join-success");

function showSuccessPopup() {
    applyDrawCampaign();   // the page may have been open since before the draw ended
    successPopup.showModal();
}

document.getElementById("join-success-close").addEventListener("click", function () {
    successPopup.close();
});
// A click outside the card closes it too
successPopup.addEventListener("click", function (event) {
    if (event.target === successPopup) successPopup.close();
});

const form = document.getElementById("joinForm");
const statusMessage = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');

// Date of birth can't be in the future
document.getElementById("dob").max = new Date().toISOString().split("T")[0];

// Messages follow the chosen language (translations are in the lang folder)
function tr(text) {
    return window.STKi18n ? window.STKi18n.t(text) : text;
}

// Change the button text without removing its icon
function setButtonLabel(text) {
    const icon = submitButton.querySelector(".icon");
    submitButton.textContent = tr(text);
    if (icon) submitButton.insertBefore(icon, submitButton.firstChild);
}

function showStatus(message, type) {
    statusMessage.textContent = message ? tr(message) : "";
    statusMessage.className = type || "";
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(form);
    const email = data.get("email").trim();
    const phone = data.get("phone").trim();
    const whatsapp = (data.get("whatsapp") || "").trim();

    if (!EMAIL_RULE.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
    }
    if (!PHONE_RULE.test(phone)) {
        showStatus("Please enter a valid mobile number, e.g. 070 123 45 67.", "error");
        return;
    }
    if (whatsapp && !PHONE_RULE.test(whatsapp)) {
        showStatus("Please enter a valid WhatsApp number, or leave it empty.", "error");
        return;
    }
    if (data.getAll("activities").length === 0) {
        showStatus("Please choose at least one activity.", "error");
        return;
    }

    const body = new URLSearchParams();
    body.append(CONFIG.entries.fullname, data.get("fullname").trim());
    body.append(CONFIG.entries.email, email);
    body.append(CONFIG.entries.phone, phone);
    if (whatsapp) body.append(CONFIG.entries.whatsapp, whatsapp);

    // Google Forms expects dates as separate year / month / day values
    const [year, month, day] = data.get("dob").split("-");
    body.append(CONFIG.entries.dob + "_year", year);
    body.append(CONFIG.entries.dob + "_month", String(Number(month)));
    body.append(CONFIG.entries.dob + "_day", String(Number(day)));

    const area = (data.get("area") || "").trim();
    if (area) body.append(CONFIG.entries.area, area);

    // Checkboxes: repeat the same entry for every ticked option
    data.getAll("activities").forEach(function (activity) {
        body.append(CONFIG.entries.activities, activity);
    });

    // The page's consent box is required, so reaching this point means it was ticked
    body.append(CONFIG.entries.consent, CONFIG.consentChoice);

    submitButton.disabled = true;
    setButtonLabel("Sending...");
    showStatus("");

    try {
        // no-cors: Google does not let us read the response, so we can only
        // tell that the request was sent, not that Google accepted it.
        await fetch(CONFIG.formUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString()
        });

        form.reset();
        showStatus("Thank you! Your details have been sent.", "success");
        showSuccessPopup();
    } catch (error) {
        showStatus("Something went wrong. Please try again later.", "error");
    } finally {
        submitButton.disabled = false;
        setButtonLabel("Join Us");
    }
});
