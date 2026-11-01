// Join Us form -> Google Form (back end)
// Entry IDs come from the Google Form's pre-filled link.

const CONFIG = {
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdRcuRZGzLjbVEYVWoW2SJCEIqmtq-DB_0zYjj-XAur3bN4lg/formResponse",

    entries: {
        fullname: "entry.31414593",
        email: "entry.928234848",
        phone: "entry.1662124608",
        dob: "entry.790732369",               // Date question
        gender: "entry.1035762172",         // Multiple choice question (no longer asked on the website, see below)
        activities: "entry.1446018950"  // Checkboxes question
    }
};

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

    // Safety check: don't pretend to send if the entry IDs are not filled in yet
    const idsMissing = Object.values(CONFIG.entries).some(function (id) {
        return id.includes("REPLACE_ME");
    });
    if (idsMissing) {
        showStatus("This form is not connected yet. Please try again later.", "error");
        return;
    }

    const data = new FormData(form);

    // The Google Form requires at least one activity
    if (data.getAll("activities").length === 0) {
        showStatus("Please choose at least one activity.", "error");
        return;
    }
    const body = new URLSearchParams();

    body.append(CONFIG.entries.fullname, data.get("fullname").trim());
    body.append(CONFIG.entries.email, data.get("email").trim());
    // The Google Form has one phone question, so the WhatsApp number goes in it too
    const phone = data.get("phone").trim();
    const whatsapp = (data.get("whatsapp") || "").trim();
    body.append(CONFIG.entries.phone, whatsapp ? phone + " (WhatsApp: " + whatsapp + ")" : phone);

    // Gender is no longer asked. Until the question is made optional in the
    // Google Form, answer it with "Other: Not asked" so the form still accepts the entry.
    // Once it is optional (or deleted), remove these two lines.
    body.append(CONFIG.entries.gender, "__other_option__");
    body.append(CONFIG.entries.gender + ".other_option_response", "Not asked");

    // Google Forms expects dates as separate year / month / day values
    const [year, month, day] = data.get("dob").split("-");
    body.append(CONFIG.entries.dob + "_year", year);
    body.append(CONFIG.entries.dob + "_month", String(Number(month)));
    body.append(CONFIG.entries.dob + "_day", String(Number(day)));

    // Checkboxes: repeat the same entry for every ticked option
    data.getAll("activities").forEach(function (activity) {
        body.append(CONFIG.entries.activities, activity);
    });

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
    } catch (error) {
        showStatus("Something went wrong. Please try again later.", "error");
    } finally {
        submitButton.disabled = false;
        setButtonLabel("Join Us");
    }
});
