/**
 * site.js — boots whichever page is open. Load it after all project files.
 *
 *  - Home page:    fills #project-grid with a card for every personal project
 *  - Project page: <body data-project="slug"> mounts that project into #project-root
 *  - Everywhere:   certificate viewer, copy buttons, footer year
 */
const Site = {
  reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  canHover: window.matchMedia("(hover: hover) and (pointer: fine)").matches,

  /** "" on the home page, "../" on pages inside projects/. Set with <body data-root>. */
  get root() {
    return document.body.dataset.root || "";
  },

  renderHome() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    const projects = ProjectShowcase.all("personal");
    grid.innerHTML = projects.map((p) => p.renderCard(this.root)).join("");

    grid.querySelectorAll(".level-card").forEach((card) => {
      ProjectShowcase.find(card.dataset.slug).bindCard(card, this.root);
    });

    const count = document.querySelector("[data-project-count]");
    if (count) count.textContent = projects.length;

    // Playable builds (projects with category = "builds")
    const buildsGrid = document.getElementById("builds-grid");
    if (buildsGrid) {
      const builds = ProjectShowcase.all("builds");
      buildsGrid.innerHTML = builds.map((p) => p.renderCard(this.root)).join("");
      buildsGrid.querySelectorAll(".level-card").forEach((card) => {
        ProjectShowcase.find(card.dataset.slug).bindCard(card, this.root);
      });
    }

    // Released titles (ReleasedProject subclasses)
    const releasedGrid = document.getElementById("released-grid");
    if (releasedGrid) {
      const released = ProjectShowcase.all("professional");
      releasedGrid.innerHTML = released.map((p) => p.renderCard(this.root)).join("");
      const releasedCount = document.querySelector("[data-released-count]");
      if (releasedCount) releasedCount.textContent = released.length;
    }
  },

  renderProject() {
    const slug = document.body.dataset.project;
    const container = document.getElementById("project-root");
    if (!slug || !container) return;

    const project = ProjectShowcase.find(slug);
    if (!project) {
      container.innerHTML = `<p class="missing">This project could not be found. <a href="${this.root}index.html#projects">See all projects</a>.</p>`;
      return;
    }
    project.mount(container, this.root);
    this.scrollToTop();
  },

  /** Every project page opens at the top, with the video in view. */
  scrollToTop() {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Coming back with the browser's Back button can restore an old position, so reset again.
    window.addEventListener("pageshow", () => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
  },

  /** Click a certificate thumbnail to view it full size. */
  bindViewer() {
    const dialog = document.getElementById("viewer");
    if (!dialog) return;
    const img = dialog.querySelector("img");
    const caption = dialog.querySelector("figcaption");

    document.querySelectorAll("[data-view]").forEach((button) => {
      button.addEventListener("click", () => {
        img.src = button.dataset.view;
        img.alt = button.dataset.caption;
        caption.textContent = button.dataset.caption;
        dialog.showModal();
      });
    });
    dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
  },

  /** Copy buttons next to the email and phone number. */
  bindCopy() {
    document.querySelectorAll("[data-copy]").forEach((button) => {
      button.addEventListener("click", () => {
        const text = button.dataset.copy;
        const done = () => {
          button.textContent = "Copied";
          setTimeout(() => (button.textContent = "Copy"), 1600);
        };
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(done).catch(() => this.selectText(button));
        } else {
          this.selectText(button);
        }
      });
    });
  },

  selectText(button) {
    const target = button.parentElement.querySelector(".contact-value");
    if (!target) return;
    const range = document.createRange();
    range.selectNodeContents(target);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },

  init() {
    this.renderHome();
    this.renderProject();
    this.bindViewer();
    this.bindCopy();
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  },
};

Site.init();
