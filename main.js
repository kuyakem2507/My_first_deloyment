/* ==================================================================
   DEVELOPER PROFILE - js/main.js
   The HTML is only a skeleton. Everything you read on the page is
   RENDERED from the CONFIG object below, so:
     - You edit your content in ONE place (CONFIG).
     - Repeating blocks (project cards, accordion items, swatches,
       filter buttons) are written ONCE as a template and looped.
   Sections of this file:
     1. CONFIG        - all editable content
     2. HELPERS       - small reusable functions
     3. RENDERERS     - turn CONFIG data into HTML
     4. BEHAVIOURS    - theme, typewriter, filters, modal, form
     5. INIT          - start everything when the page is ready
   ================================================================== */
"use strict";


/* ==================================================================
   1. CONFIG  -  EDIT THIS PART WITH YOUR OWN INFORMATION
   ================================================================== */
const CONFIG = {

  /* ----- Hero, photo and motto ----- */
  profile: {
    name: "Kemrick",
    initials: "A.I",                         // shown in the navbar and as the photo fallback
    greeting: "Hi, I'm",
    roles: [                                // typed one after another in the hero
      "Web developer",
      "Bootstrap enthusiast",
      "Student who ships"
    ],
    intro: "I build clear, responsive websites and learn something new from every project I finish.",
    photo: "images/profile.jpg",            // put your photo here (about 480 x 560 px)
    mottos: [                               // the first one is shown on load
      { text: "Make it work, make it clear, then make it fast.", by: "My daily rule" },
      { text: "Every bug is a lesson that hasn't been read yet.", by: "From my debugging notes" },
      { text: "Small commits, honest comments, kind code reviews.", by: "My team habit" }
    ]
  },

  /* ----- Design philosophy ----- */
  philosophy: {
    intro: "My design style is calm, structured, and honest. I want a visitor to understand a page in five seconds and trust it in ten.",
    typeNote: "Type: Bricolage Grotesque for headings, IBM Plex Sans for body text.",
    // Palette chips read these CSS variables from css/style.css
    palette: [
      { name: "Ink",      cssVar: "--ink" },
      { name: "Paper",    cssVar: "--paper" },
      { name: "Teal",     cssVar: "--teal" },
      { name: "Marigold", cssVar: "--marigold" }
    ],
    principles: [
      {
        title: "Clarity before decoration",
        body: "Every element has one job. If a border, colour, or animation does not help someone read, choose, or act, I remove it."
      },
      {
        title: "Structure shows hierarchy",
        body: "I use size, weight, and spacing to show what matters most. One strong headline, quiet supporting text, and one bright accent for the main action."
      },
      {
        title: "Responsive by default",
        body: "I design for a phone first, then let the layout grow. Bootstrap's grid does the heavy lifting so I can focus on content."
      },
      {
        title: "Accessible for everyone",
        body: "Readable contrast, visible keyboard focus, labelled forms, and reduced motion for people who ask for it. Dark mode is part of the design, not an extra."
      }
    ]
  },

  /* ----- Projects (phase: "Midterm" or "Finals") -----
     Replace image paths with your own screenshots in images/projects/.
     If an image file is missing, a placeholder is drawn automatically. */
  projects: [
    {
      id: "p1",
      phase: "Midterm",
      title: "Project One Title",
      summary: "A short description of your first midterm project.",
      details: [
        "Built the layout with the Bootstrap grid and navbar.",
        "Wrote semantic HTML5 with clear comments.",
        "Tested the page on phone, tablet, and desktop widths."
      ],
      stack: ["HTML5", "Bootstrap 5", "CSS3"],
      image: "images/projects/project1.png",
      github: "https://github.com/your-username/project-one"
    },
    {
      id: "p2",
      phase: "Midterm",
      title: "Project Two Title",
      summary: "A short description of your second midterm project.",
      details: [
        "Added form validation with Bootstrap classes.",
        "Moved all styles to an external stylesheet.",
        "Documented the folder structure in the README."
      ],
      stack: ["HTML5", "Bootstrap 5", "JavaScript"],
      image: "images/projects/project2.png",
      github: "https://github.com/your-username/project-two"
    },
    {
      id: "p3",
      phase: "Finals",
      title: "Project Three Title",
      summary: "A short description of your first finals project.",
      details: [
        "Rendered all content from a JavaScript data array.",
        "Added dark mode that remembers the visitor's choice.",
        "Connected the page to a simple data source."
      ],
      stack: ["JavaScript", "Bootstrap 5", "JSON"],
      image: "images/projects/project3.png",
      github: "https://github.com/your-username/project-three"
    },
    {
      id: "p4",
      phase: "Finals",
      title: "Project Four Title",
      summary: "A short description of your final capstone project.",
      details: [
        "Planned the features and split the work into small tasks.",
        "Used Git branches and meaningful commit messages.",
        "Presented the finished app to the class."
      ],
      stack: ["JavaScript", "Bootstrap 5", "Git"],
      image: "images/projects/project4.png",
      github: "https://github.com/your-username/project-four"
    }
  ],

  /* ----- Contact ----- */
  contact: {
    email: "you@example.com",              // the form opens a message to this address
    items: [
      { label: "Email",    text: "kemrickingcad25@gmail.com",            url: "mailto:kemrickingcad25@gmail.com" },
      { label: "GitHub",   text: "github.com/Kuya Kem07",   url: "https://github.com/your-username" },
      { label: "LinkedIn", text: "linkedin.com/in/your-name",  url: "https://linkedin.com/in/your-name" },
      { label: "Location", text: "Dinaratan, Salcedo, Ilocos Sur, Philippines",     url: "" }
    ]
  }
};


/* ==================================================================
   2. HELPERS  -  small reusable functions
   ================================================================== */

/* Shortcut for document.getElementById */
const $ = (id) => document.getElementById(id);

/* Build a placeholder image (SVG data URI) so the page never shows a broken image.
   Used for the profile photo and for any missing project screenshot. */
function makePlaceholder(label, width, height) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<rect width="100%" height="100%" fill="#2a6f6b"/>` +
    `<text x="50%" y="50%" fill="#f2f5f4" font-family="sans-serif" font-size="${Math.round(width / 9)}" ` +
    `font-weight="700" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* Attach a fallback: if the image file fails to load, swap in a placeholder once. */
function withFallback(img, label, width, height) {
  // Assigning onerror (instead of addEventListener) replaces any earlier handler,
  // so reusing the same <img> in the modal never stacks up old fallbacks.
  img.onerror = () => {
    img.onerror = null;                                // the placeholder can't fail, but stay safe
    img.src = makePlaceholder(label, width, height);
  };
}

/* Small badge list used by both the cards and the modal */
const stackBadges = (stack) =>
  stack.map((tech) => `<span class="stack-badge">${tech}</span>`).join("");


/* ==================================================================
   3. RENDERERS  -  turn CONFIG data into HTML
   ================================================================== */

/* --- Hero + navbar brand + footer --- */
function renderHero() {
  const p = CONFIG.profile;
  $("navBrand").textContent = p.initials;
  $("heroHello").textContent = p.greeting;
  $("heroName").textContent = p.name;
  $("heroIntro").textContent = p.intro;
  $("footerText").textContent = `© ${new Date().getFullYear()} ${p.name}. Built with Bootstrap 5.`;
  document.title = `${p.name} | Developer Profile`;
}

/* --- Photo --- */
function renderPortrait() {
  const img = $("portraitImg");
  withFallback(img, CONFIG.profile.initials, 480, 560);   // attach the fallback BEFORE setting src
  img.src = CONFIG.profile.photo;
}

/* --- Philosophy: accordion items (one template, looped) --- */
function renderPhilosophy() {
  const ph = CONFIG.philosophy;
  $("philoIntro").textContent = ph.intro;
  $("typeNote").textContent = ph.typeNote;

  // Palette chips: the dot's colour is a CSS variable, so it updates with the theme
  $("swatches").innerHTML = ph.palette.map((c) => `
    <span class="swatch">
      <span class="swatch-dot" style="background: var(${c.cssVar})"></span>${c.name}
    </span>`).join("");

  // Accordion: the first item starts open
  $("philoAccordion").innerHTML = ph.principles.map((item, i) => `
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button class="accordion-button ${i === 0 ? "" : "collapsed"}" type="button"
                data-bs-toggle="collapse" data-bs-target="#principle${i}"
                aria-expanded="${i === 0}" aria-controls="principle${i}">
          ${item.title}
        </button>
      </h3>
      <div id="principle${i}" class="accordion-collapse collapse ${i === 0 ? "show" : ""}"
           data-bs-parent="#philoAccordion">
        <div class="accordion-body">${item.body}</div>
      </div>
    </div>`).join("");
}

/* --- Projects: filter buttons (built from the phases found in the data) --- */
let activePhase = "All";   // current filter

function renderFilters() {
  // "All" plus every unique phase, in the order they first appear
  const phases = ["All", ...new Set(CONFIG.projects.map((p) => p.phase))];

  $("projectFilters").innerHTML = phases.map((phase) => `
    <button type="button" class="btn ${phase === activePhase ? "active" : ""}"
            data-phase="${phase}" aria-pressed="${phase === activePhase}">${phase}</button>`).join("");
}

/* --- Projects: card grid (one card template, looped) --- */
function renderProjects() {
  const list = CONFIG.projects.filter((p) => activePhase === "All" || p.phase === activePhase);

  $("projectGrid").innerHTML = list.map((p) => `
    <div class="col-md-6">
      <article class="project-card">
        <img src="${p.image}" alt="Screenshot of ${p.title}" loading="lazy" width="640" height="400"
             data-label="${p.title}">
        <div class="card-body p-4">
          <span class="phase-tag">${p.phase}</span>
          <h3 class="card-title h4">${p.title}</h3>
          <p class="card-text">${p.summary}</p>
          <div class="d-flex flex-wrap gap-2">${stackBadges(p.stack)}</div>
          <div class="card-actions">
            <!-- data-bs-toggle opens the shared modal; data-id tells the modal which project to show -->
            <button type="button" class="btn btn-outline-ink btn-sm"
                    data-bs-toggle="modal" data-bs-target="#projectModal" data-id="${p.id}">Details</button>
            <a class="btn btn-accent btn-sm" href="${p.github}" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </article>
    </div>`).join("");

  // Add the missing-image fallback to every card image we just created
  $("projectGrid").querySelectorAll("img").forEach((img) => {
    withFallback(img, img.dataset.label, 640, 400);
    if (img.complete && img.naturalWidth === 0) img.src = makePlaceholder(img.dataset.label, 640, 400); // already failed
  });
}

/* --- Contact list --- */
function renderContact() {
  $("contactList").innerHTML = CONFIG.contact.items.map((item) => `
    <li><span>${item.label}</span>${
      item.url ? `<a href="${item.url}" ${item.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${item.text}</a>` : item.text
    }</li>`).join("");
}


/* ==================================================================
   4. BEHAVIOURS
   ================================================================== */

/* --- Typewriter effect for the hero role line --- */
function startTypewriter(target, phrases) {
  // Respect "reduce motion": show the first phrase and stop
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;   // which phrase we're on
  let charCount = 0;     // how many characters are showing
  let deleting = false;  // typing or erasing?

  function tick() {
    const phrase = phrases[phraseIndex];
    charCount += deleting ? -1 : 1;
    target.textContent = phrase.slice(0, charCount);

    let delay = deleting ? 40 : 80;
    if (!deleting && charCount === phrase.length) {          // finished typing: pause, then erase
      deleting = true;
      delay = 1400;
    } else if (deleting && charCount === 0) {                // finished erasing: next phrase
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  tick();
}

/* --- Motto: show one saying, and cycle on button click with a short fade --- */
function setupMotto() {
  const mottos = CONFIG.profile.mottos;
  const textEl = $("mottoText");
  const byEl = $("mottoBy");
  let index = 0;

  const show = () => {
    textEl.textContent = mottos[index].text;
    byEl.textContent = mottos[index].by;
  };
  show();

  $("mottoBtn").addEventListener("click", () => {
    textEl.classList.add("is-swapping");              // fade out
    setTimeout(() => {
      index = (index + 1) % mottos.length;            // next saying (loops back to the first)
      show();
      textEl.classList.remove("is-swapping");         // fade in
    }, 250);
  });
}

/* --- Dark / light theme (remembers the choice in localStorage) --- */
function setupTheme() {
  const btn = $("themeToggle");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-bs-theme", theme);   // Bootstrap 5.3 reads this attribute
    btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    try { localStorage.setItem("theme", theme); } catch (e) { /* storage may be blocked; ignore */ }
  }

  // Start with the saved choice, else the visitor's system preference
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (systemDark ? "dark" : "light"));

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-bs-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

/* --- Project filters: ONE listener on the container (event delegation) --- */
function setupFilters() {
  $("projectFilters").addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-phase]");
    if (!btn) return;                       // click was not on a filter button
    activePhase = btn.dataset.phase;
    renderFilters();                        // refresh which button looks active
    renderProjects();                       // redraw the cards
  });
}

/* --- Project modal: fill it from the clicked card's data-id --- */
function setupProjectModal() {
  $("projectModal").addEventListener("show.bs.modal", (event) => {
    // event.relatedTarget is the button that opened the modal
    const project = CONFIG.projects.find((p) => p.id === event.relatedTarget.dataset.id);
    if (!project) return;

    $("projectModalTitle").textContent = `${project.title} (${project.phase})`;
    $("modalSummary").textContent = project.summary;
    $("modalDetails").innerHTML = project.details.map((d) => `<li>${d}</li>`).join("");
    $("modalStack").innerHTML = stackBadges(project.stack);
    $("modalGithub").href = project.github;

    const img = $("modalImg");
    img.alt = `Screenshot of ${project.title}`;
    withFallback(img, project.title, 640, 400);
    img.src = project.image;
  });
}

/* --- Contact form: Bootstrap validation, then open the visitor's email app --- */
function setupContactForm() {
  const form = $("contactForm");
  const toast = bootstrap.Toast.getOrCreateInstance($("formToast"), { delay: 5000 });

  form.addEventListener("submit", (event) => {
    event.preventDefault();                        // stay on the page

    if (!form.checkValidity()) {                   // some field is invalid: show Bootstrap's messages
      form.classList.add("was-validated");
      return;
    }

    // Build a mailto: link from the form values (there is no server in this lab)
    const subject = `Portfolio message from ${$("cName").value.trim()}`;
    const body = `${$("cMessage").value.trim()}\n\nReply to: ${$("cEmail").value.trim()}`;
    window.location.href =
      `mailto:${CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    $("formToastBody").textContent = "Thanks! Your email app should open with the message ready to send.";
    toast.show();
    form.reset();
    form.classList.remove("was-validated");
  });
}

/* --- Back-to-top button + closing the mobile menu after a link click --- */
function setupNavExtras() {
  const toTop = $("toTop");

  // Show the button only after scrolling down a little
  window.addEventListener("scroll", () => {
    toTop.hidden = window.scrollY < 500;
  }, { passive: true });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  // On phones the menu stays open after tapping a link; close it
  const menu = $("navLinks");
  menu.addEventListener("click", (event) => {
    if (event.target.matches("a.nav-link") && menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
}


/* ==================================================================
   5. INIT  -  run everything once the HTML is ready
   ================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Draw the content
  renderHero();
  renderPortrait();
  renderPhilosophy();
  renderFilters();
  renderProjects();
  renderContact();

  // Switch on the behaviours
  setupTheme();
  startTypewriter($("heroRole"), CONFIG.profile.roles);
  setupMotto();
  setupFilters();
  setupProjectModal();
  setupContactForm();
  setupNavExtras();
});
