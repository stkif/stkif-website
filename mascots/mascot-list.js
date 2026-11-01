// ==========================================================
//  WHICH GOAT PICTURE GOES WHERE
//  Change a picture by changing the file name on the right.
//  See mascots/README.md for the full guide.
// ==========================================================
//
//  Three ways to fill a spot:
//
//    1. One of our tahr drawings (just the name):
//         "home-hero": "tahr-wave",
//
//    2. Your own picture: put it in the mascots/my-goats folder,
//       then write the path from the website folder:
//         "home-hero": "mascots/my-goats/tahr-hello.webp",
//       (.png, .jpg, .webp, .gif and .svg all work)
//
//    3. Several pictures: a new one is picked at random each time the page opens:
//         "home-hero": ["mascots/my-goats/tahr-hello.webp", "mascots/my-goats/tahr-wink.webp"],
//
//  To hide a spot completely, set it to "" (empty).

window.STK_MASCOTS = {

    // ---------- Pictures on the pages ----------
    "home-hero":        "mascots/my-goats/tahr-hello.webp",       // home page, bottom right of the big photo, says "Vanakkam!"
    "home-activities":  "mascots/my-goats/tahr-cricket.webp",     // home page, above "A place for every part of you"
    "events-heading":   "mascots/my-goats/tahr-diya.webp",        // events page, above the heading
    "about-emblem":     "mascots/my-goats/tahr-thumbs-up.webp",   // about page, in the "Like the Nilgiri tahr on our logo" box
    "gallery-heading":  "mascots/my-goats/tahr-wow.webp",         // gallery page, above the heading
    "learn-heading":    "mascots/my-goats/tahr-thumbs-up.webp",   // learn tamil page, above the heading
    "members-heading":  "mascots/my-goats/tahr-wink.webp",        // members page, above the heading
    "joinus-heading":   "mascots/my-goats/tahr-celebrate.webp",   // join us page, next to the heading
    "back-to-top":      "mascots/my-goats/tahr-icon.webp",        // round button that appears when you scroll down
    "footer-ridge":     "mascots/my-goats/footer-sunrise.webp",   // big picture above the footer on every page (drawn hills: "mountain-ridge")
    "footer-runner":    "",                                       // the tahr running across the bottom of that picture ("" = none)

    // ---------- Small moving icons on buttons ----------
    // A name from the icons folder (e.g. "goat"), or a path to your own small picture.
    "menu-join-us":     "mascots/my-goats/tahr-icon.webp",        // "Join Us" in the top menu
    "register-button":  "mascots/my-goats/tahr-icon.webp",        // "Register here" buttons
    "send-button":      "mascots/my-goats/tahr-icon.webp"         // the send button on the Join Us form
};

// Your pictures in mascots/my-goats (write the full path, as above):
//   tahr-hello.webp      waving hello
//   tahr-celebrate.webp  dancing with sparkles
//   tahr-cricket.webp    with cap and cricket bat
//   tahr-diya.webp       holding a Diwali lamp
//   tahr-thumbs-up.webp  thumbs up
//   tahr-wink.webp       winking and pointing at you
//   tahr-wow.webp        surprised
//   tahr-sleeping.webp   sleeping (wide picture)
//   tahr-icon.webp       round head, for small icons and buttons
//   footer-sunrise.webp  tahr on a peak at sunrise (wide background above the footer)
//
// Drawn tahr pictures in mascots/tahr (just write the name, e.g. "tahr-dance"):
//   tahr-stand      standing proud on a rock
//   tahr-proud      standing on grass
//   tahr-wave       sitting and waving hello
//   tahr-dance      dancing on its back legs, with music notes
//   tahr-drum       playing the parai drum
//   tahr-leap       leaping
//   tahr-gallop     running (legs move), used in the footer
//   tahr-run        running pose, still, with a dust cloud
//   tahr-peek       peeking over a ledge
//   tahr-rest       lying down, awake
//   tahr-sleep      sleeping, with "z z z"
//   tahr-kid        a baby tahr
//   tahr-family     mother and baby
//   tahr-summit     on a mountain top with the sun and a flag (like our logo)
//   tahr-face       face from the front, in a circle (good as a profile picture)
//   tahr-badge      head in a gold ring
//   tahr-silhouette one colour; takes the colour of the text around it
//   mountain-ridge  hills, sun and a tiny tahr (wide strip)
