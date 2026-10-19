/**
 * ProjectShowcase — the base class every project on the site inherits from.
 *
 * A project subclass only fills in its text (title, overview, features...). Its videos
 * are found automatically from its folder in assets/, so adding a clip never needs a
 * code change. All shared behaviour lives here:
 *   - its card on the home page, with a hover preview
 *   - its showcase page: player, clip picker, info panel, overview, features, pager
 *   - the content-warning gate on mature clips
 *   - optional versions (V1, V2...) with a switcher
 *
 * MEDIA — see assets/README.md for the full naming rules
 *   assets/<slug>/01.mp4, 02.mp4, 03.mp4 ...   videos, played in number order
 *   assets/<slug>/01.jpg, 02.png, 03.webp ...  images, a separate numbered sequence shown after the videos
 *   Versioned projects use a subfolder per version: assets/<slug>/v1/01.mp4, v2/01.mp4 ...
 *   No thumbnails needed: every preview is a frame from the video itself.
 *   Video lengths are read from the files. Media is always named "Video 1", "Video 2"... and "Image 1", "Image 2"...
 *
 * VERSIONS
 *   Leave `versions` empty for a project without versions. Otherwise list them; each
 *   version can override: label, subtitle, note, folder, download, orientation,
 *   previewStart, overviewTitle, overview, featuresTitle, mechanics, info.
 *   The latest version opens first; #v1, #v2... in the URL opens a specific one.
 *
 * Adding a project = one new file in js/projects/ that extends this class
 * and calls ProjectShowcase.register(new MyProject()).
 */
class ProjectShowcase {
  /* ------------------------------------------------------------------ */
  /*  Registry (shared by all projects)                                  */
  /* ------------------------------------------------------------------ */
  static #registry = [];

  static register(project) {
    ProjectShowcase.#registry.push(project);
    ProjectShowcase.#registry.sort((a, b) => a.order - b.order);
    return project;
  }

  /** All projects, optionally filtered by category ("personal" | "professional"). */
  static all(category) {
    const list = [...ProjectShowcase.#registry];
    return category ? list.filter((p) => p.category === category) : list;
  }

  static find(slug) {
    return ProjectShowcase.#registry.find((p) => p.slug === slug) || null;
  }

  static esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  static clock(seconds) {
    if (!isFinite(seconds)) return "";
    const s = Math.round(seconds);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  /* ------------------------------------------------------------------ */
  /*  Media discovery                                                    */
  /* ------------------------------------------------------------------ */
  static MAX_CLIPS = 50;                  // stops looking after 50.mp4
  static VIDEO_TYPES = ["mp4", "webm"];   // checked in this order for each number
  static IMAGE_TYPES = ["jpg", "jpeg", "png", "webp"];
  static PROBE_TIMEOUT = 15000;           // ms to wait for one file before treating it as missing
  static #clipCache = new Map();          // folder url -> Promise<clip[]>

  /** Resolves with the video's length in seconds, or null if the file isn't there. */
  static probeVideo(url) {
    return new Promise((resolve) => {
      const v = document.createElement("video");
      let settled = false;
      const done = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        v.removeAttribute("src");
        v.load();
        resolve(value);
      };
      const timer = setTimeout(() => done(null), ProjectShowcase.PROBE_TIMEOUT);
      v.preload = "metadata";
      v.muted = true;
      v.onloadedmetadata = () => done(v.duration);
      v.onerror = () => done(null);
      v.src = url;
    });
  }

  /** Resolves true if the image exists. */
  static probeImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  /**
   * Walks 01, 02, 03... in a folder for one kind of media, stopping at the first missing
   * number (numbers must not have gaps). Each file type is tried in order.
   */
  static async #discover(folderUrl, kind) {
    const types = kind === "video" ? ProjectShowcase.VIDEO_TYPES : ProjectShowcase.IMAGE_TYPES;
    const items = [];
    for (let n = 1; n <= ProjectShowcase.MAX_CLIPS; n++) {
      const num = String(n).padStart(2, "0");
      let found = null;
      for (const type of types) {
        const url = `${folderUrl}${num}.${type}`;
        if (kind === "video") {
          const duration = await ProjectShowcase.probeVideo(url);
          if (duration !== null) found = { kind, num, url, duration };
        } else if (await ProjectShowcase.probeImage(url)) {
          found = { kind, num, url };
        }
        if (found) break;
      }
      if (!found) break;
      items.push(found);
    }
    return items;
  }

  /** All media in a folder: videos (01.mp4, 02.mp4...) first, then images (01.jpg, 02.png...). */
  static discoverMedia(folderUrl) {
    if (!ProjectShowcase.#clipCache.has(folderUrl)) {
      ProjectShowcase.#clipCache.set(folderUrl, (async () => {
        const [videos, images] = await Promise.all([
          ProjectShowcase.#discover(folderUrl, "video"),
          ProjectShowcase.#discover(folderUrl, "image"),
        ]);
        return [...videos, ...images];
      })());
    }
    return ProjectShowcase.#clipCache.get(folderUrl);
  }

  /* ------------------------------------------------------------------ */
  /*  Data — subclasses override these fields                            */
  /* ------------------------------------------------------------------ */
  slug = "";              // page name in projects/ AND folder name in assets/
  order = 0;              // position in the project grid
  category = "personal";  // "personal" | "builds" | "professional"
  title = "";
  subtitle = "";
  genre = "";
  engine = "";
  team = "";              // leave empty to hide the row
  status = "Showcased";   // "WIP" adds a WIP chip
  blurb = "";             // one line for the card

  overviewTitle = "";     // headline of the overview (from the original post)
  overview = [];          // overview paragraphs, word for word from the original post
  featuresTitle = "Features";
  mechanics = [];         // [{ name, text }]
  info = [];              // extra [label, value] rows for the info panel
  download = "";          // link to a downloadable build (e.g. a Google Drive folder); versions can set their own

  orientation = "landscape";  // "landscape" | "portrait"
  previewStart = 5;           // seconds into clip 01 where the card's hover preview starts
  contentWarning = "";        // non-empty = blur stills and gate every clip

  versions = [];          // optional — see VERSIONS above

  /* ------------------------------------------------------------------ */
  /*  Versions                                                           */
  /* ------------------------------------------------------------------ */
  #activeIndex = null;    // null = latest version
  #activeClip = 0;
  #clips = [];            // clips found for the active version
  #loadToken = 0;         // ignores slow loads after the user has switched version

  get isVersioned() {
    return this.versions.length > 0;
  }

  get hasVersions() {
    return this.versions.length > 1;
  }

  get activeIndex() {
    return this.#activeIndex ?? Math.max(0, this.versions.length - 1);
  }

  get activeVersion() {
    return this.versions[this.activeIndex] || {};
  }

  setVersion(index) {
    if (index < 0 || index >= this.versions.length) return false;
    this.#activeIndex = index;
    this.#activeClip = 0;
    return true;
  }

  /** Reads a field from the active version, falling back to the project's own value. */
  pick(key) {
    const value = this.activeVersion[key];
    return value !== undefined ? value : this[key];
  }

  versionHash(index) {
    const label = (this.versions[index] && this.versions[index].label) || `V${index + 1}`;
    return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  /* ------------------------------------------------------------------ */
  /*  Paths                                                              */
  /* ------------------------------------------------------------------ */
  get number() {
    return String(this.order).padStart(2, "0");
  }

  get isWip() {
    return this.status === "WIP";
  }

  /** assets/<slug>/  — the project folder. */
  projectFolder(root) {
    return `${root}assets/${this.slug}/`;
  }

  /** The folder holding the active version's clips: assets/<slug>/ or assets/<slug>/v2/ */
  mediaFolder(root) {
    if (!this.isVersioned) return this.projectFolder(root);
    const folder = this.activeVersion.folder || `v${this.activeIndex + 1}`;
    return `${this.projectFolder(root)}${folder}/`;
  }

  /** The home page section this project is listed in. */
  get homeSection() {
    return this.category === "builds" ? "builds" : "projects";
  }

  pageUrl(root) {
    return `${root}projects/${this.slug}.html`;
  }

  /** Media is always named by kind and number ("Video 3", "Image 2"), so adding more never needs a code change. */
  clipTitle(item) {
    return `${item.kind === "image" ? "Image" : "Video"} ${Number(item.num)}`;
  }

  /* ------------------------------------------------------------------ */
  /*  Chips and info                                                     */
  /* ------------------------------------------------------------------ */
  /** True if the project or any of its versions has a downloadable build. */
  get hasBuild() {
    return Boolean(this.download || this.versions.some((v) => v.download));
  }

  getChips() {
    const chips = [{ label: this.genre }];
    if (this.hasVersions) chips.push({ label: `${this.versions.length} versions`, kind: "up" });
    if (this.hasBuild) chips.push({ label: "Playable build", kind: "up" });
    if (this.isWip) chips.push({ label: "WIP", kind: "wip" });
    if (this.contentWarning) chips.push({ label: "Gore", kind: "gore" });
    return chips;
  }

  getInfoRows() {
    const rows = [
      ["Engine", this.engine],
      ["Genre", this.genre],
      ["Team", this.team],
      ...this.info,
      ...(this.activeVersion.info || []),
    ];
    return rows.filter(([, value]) => value);
  }

  renderChips() {
    const esc = ProjectShowcase.esc;
    return `<div class="chips">${this.getChips()
      .map((c) => `<span class="chip${c.kind ? " chip-" + c.kind : ""}">${esc(c.label)}</span>`)
      .join("")}</div>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Home page card                                                     */
  /* ------------------------------------------------------------------ */
  /** Cards show the latest version, previewed by a frame from its first video. */
  renderCard(root) {
    const esc = ProjectShowcase.esc;
    const mediaClass = ["level-media", this.pick("orientation"), this.contentWarning ? "gore" : ""]
      .filter(Boolean)
      .join(" ");

    return `
      <a class="level-card" href="${this.pageUrl(root)}" data-slug="${this.slug}">
        <div class="${mediaClass}">
          <span class="level-node">${this.number}</span>
          <video class="still" src="${this.mediaFolder(root)}01.mp4#t=${this.pick("previewStart")}"
            muted preload="metadata" playsinline tabindex="-1" aria-label="${esc(this.title)}"></video>
        </div>
        <div class="level-body">
          <span class="level-sub">${esc(this.pick("subtitle"))}</span>
          <h3>${esc(this.title)}</h3>
          <p>${esc(this.blurb)}</p>
          ${this.renderChips()}
          <span class="level-play">View showcase &rarr;</span>
        </div>
      </a>`;
  }

  /**
   * Card preview: a frame from the first video (no image files). Mature projects stay blurred.
   * If the folder has no video yet, a "coming soon" placeholder is shown.
   * On desktop, hovering plays a muted preview of video 1 (never for mature projects).
   */
  bindCard(card, root) {
    const media = card.querySelector(".level-media");
    const still = media.querySelector("video.still");
    const folder = this.mediaFolder(root);

    // Preview: video 01 (mp4, then webm); if there's no video, image 01; otherwise "coming soon".
    still.onerror = () => {
      if (still.src.includes("01.mp4")) {
        still.src = `${folder}01.webm#t=${this.pick("previewStart")}`;
        return;
      }
      const img = document.createElement("img");
      img.alt = this.title;
      const types = [...ProjectShowcase.IMAGE_TYPES];
      img.onerror = () => {
        const next = types.shift();
        if (next) {
          img.src = `${folder}01.${next}`;
          return;
        }
        const empty = document.createElement("span");
        empty.className = "media-empty";
        empty.innerHTML = "<i></i>Videos coming soon";
        img.replaceWith(empty);
        media.classList.remove("gore");
      };
      still.replaceWith(img);
      img.onerror();
    };

    if (this.contentWarning || !Site.canHover || Site.reduceMotion) return;
    let video = null;
    card.addEventListener("mouseenter", () => {
      if (!video) {
        video = document.createElement("video");
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute("aria-hidden", "true");
        video.onerror = () => {
          if (video.src.endsWith(".mp4")) video.src = `${folder}01.webm`;
        };
        video.src = `${folder}01.mp4`;
        media.appendChild(video);
      }
      video.currentTime = this.pick("previewStart");
      video.play().then(() => card.classList.add("is-previewing")).catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-previewing");
      if (video) video.pause();
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Showcase page — player                                             */
  /* ------------------------------------------------------------------ */
  get activeClip() {
    return this.#clips[Math.min(this.#activeClip, this.#clips.length - 1)];
  }

  renderPlayerShell() {
    return `<div class="player" data-player><div class="player-status">Loading clips…</div></div>`;
  }

  renderPlayer() {
    const esc = ProjectShowcase.esc;
    if (!this.#clips.length) {
      console.info(`[${this.slug}] No media yet. Add 01.mp4 or 01.jpg to ${this.mediaFolder("")}`);
      return `<div class="player-status player-empty"><span class="media-empty"><i></i>Gameplay videos coming soon</span></div>`;
    }
    return this.renderScreen() + this.renderClipPicker();
  }

  renderScreen() {
    const esc = ProjectShowcase.esc;
    const clip = this.activeClip;
    const isImage = clip.kind === "image";
    const gated = Boolean(this.contentWarning) && !isImage; // the content warning covers videos only
    const title = this.clipTitle(clip);
    const label = [this.hasVersions ? this.activeVersion.label : "", title].filter(Boolean).join(" · ");
    const facts = [esc(label), isImage ? "" : ProjectShowcase.clock(clip.duration)].filter(Boolean).join(" &middot; ");
    // Videos start a moment in so the player shows a real frame before play.
    const media = isImage
      ? `<a class="screen-image" href="${clip.url}" target="_blank" rel="noopener" title="Open full size"><img src="${clip.url}" alt="${esc(this.title)}, ${esc(title)}"></a>`
      : `<video src="${clip.url}#t=0.5" playsinline preload="metadata" ${gated ? "" : "controls"}></video>`;

    return `
      <div class="screen ${this.pick("orientation")}${gated ? " is-gated" : ""}">
        <div class="screen-bar">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>${facts}</span>
        </div>
        <div class="screen-stage">
          ${media}
          ${gated ? this.renderGate(isImage) : ""}
        </div>
      </div>`;
  }

  renderClipPicker() {
    if (this.#clips.length < 2) return "";
    const esc = ProjectShowcase.esc;
    const active = this.#clips.indexOf(this.activeClip);
    return `
      <div class="clip-picker" role="tablist" aria-label="Videos and images">${this.#clips
        .map((c, i) => {
          const thumb = c.kind === "image"
            ? `<img src="${c.url}" alt="" loading="lazy">`
            : `<video src="${c.url}#t=1" muted preload="metadata" playsinline tabindex="-1"></video>`;
          return `
        <button class="clip-tab${i === active ? " is-active" : ""}${this.contentWarning && c.kind !== "image" ? " gore" : ""}" type="button"
          role="tab" aria-selected="${i === active}" data-clip="${i}">
          <span class="clip-thumb">${thumb}</span>
          <span class="clip-meta"><strong>${esc(this.clipTitle(c))}</strong><small>${c.kind === "image" ? "Image" : ProjectShowcase.clock(c.duration)}</small></span>
        </button>`;
        })
        .join("")}</div>`;
  }

  renderGate(isImage = false) {
    return `
      <div class="gate">
        <strong>Content warning</strong>
        <p>${ProjectShowcase.esc(this.contentWarning)}</p>
        <button class="btn btn-primary" type="button" data-gate-open><span class="dot"></span>${isImage ? "Show image" : "Play clip"}</button>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Showcase page — text                                               */
  /* ------------------------------------------------------------------ */
  renderVersionSwitch() {
    if (!this.hasVersions) return "";
    const esc = ProjectShowcase.esc;
    const tabs = this.versions
      .map((v, i) => {
        const on = i === this.activeIndex;
        return `
        <button class="version-tab${on ? " is-active" : ""}" type="button" role="tab"
          aria-selected="${on}" data-version="${i}">
          <span class="version-orb">${esc(v.label || `V${i + 1}`)}</span>
          <span class="version-name">${esc(v.subtitle || "")}</span>
        </button>`;
      })
      .join('<span class="version-arrow" aria-hidden="true">&rarr;</span>');

    return `
      <div class="version-switch">
        <span class="eyebrow">Versions</span>
        <div class="version-tabs" role="tablist" aria-label="Project versions">${tabs}</div>
        <p class="version-note" data-version-note>${esc(this.activeVersion.note || "")}</p>
      </div>`;
  }

  renderInfo() {
    const esc = ProjectShowcase.esc;
    return `
      <aside class="stats">
        <h2>Project info</h2>
        <dl>${this.getInfoRows()
          .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
          .join("")}</dl>
        ${this.renderDownload()}
      </aside>`;
  }

  /** "Download build" button for the active version, if it has a build link. */
  renderDownload() {
    const url = this.pick("download");
    if (!url) return "";
    const esc = ProjectShowcase.esc;
    const label = this.hasVersions ? `Download ${esc(this.activeVersion.label)} build` : "Download build";
    return `
        <div class="download">
          <a class="btn btn-primary" href="${esc(url)}" target="_blank" rel="noopener"><span class="dot"></span>${label}</a>
          <small>Opens the Google Drive folder with the build zip.</small>
        </div>`;
  }

  renderOverview() {
    const esc = ProjectShowcase.esc;
    const title = this.pick("overviewTitle");
    if (!title && !this.pick("overview").length) return "";
    return `
      <section class="about-project">
        <span class="eyebrow">Overview</span>
        ${title ? `<h2>${esc(title)}</h2>` : ""}
        ${this.pick("overview")
          .map((para) => (typeof para === "string" ? `<p>${esc(para)}</p>` : `<h3>${esc(para.heading)}</h3>`))
          .join("")}
      </section>`;
  }

  renderMechanics() {
    const esc = ProjectShowcase.esc;
    if (!this.pick("mechanics").length) return "";
    return `
      <section>
        <div class="section-head">
          <span class="eyebrow">Showcase</span>
          <h2>${esc(this.pick("featuresTitle"))}</h2>
        </div>
        <div class="mechanics">${this.pick("mechanics")
          .map(
            (m) => `
          <div class="mechanic">
            <span class="mechanic-icon" aria-hidden="true"></span>
            <div><h3>${esc(m.name)}</h3>${(m.text ? [].concat(m.text) : []).map((t) => `<p>${esc(t)}</p>`).join("")}${
              m.points ? `<ul>${m.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>` : ""
            }</div>
          </div>`
          )
          .join("")}</div>
      </section>`;
  }

  /** Everything that changes when the version changes. */
  renderStage() {
    return `
      <div class="level-layout">
        ${this.renderPlayerShell()}
        ${this.renderInfo()}
      </div>
      ${this.renderOverview()}
      ${this.renderMechanics()}
      ${this.renderExtras()}`;
  }

  /** Extra blocks after the features. Subclasses can override this. */
  renderExtras() {
    return "";
  }

  renderPager() {
    const esc = ProjectShowcase.esc;
    const list = ProjectShowcase.all(this.category);
    const i = list.indexOf(this);
    const prev = list[i - 1];
    const next = list[i + 1];
    const home = `../index.html#${this.homeSection}`;
    const noun = this.category === "builds" ? "build" : "project";

    const left = prev
      ? `<a href="${prev.slug}.html"><small>&larr; ${noun[0].toUpperCase() + noun.slice(1)} ${prev.number}</small><strong>${esc(prev.title)}</strong></a>`
      : `<a href="${home}"><small>&larr; Back</small><strong>All ${noun}s</strong></a>`;
    const right = next
      ? `<a class="next" href="${next.slug}.html"><small>${noun[0].toUpperCase() + noun.slice(1)} ${next.number} &rarr;</small><strong>${esc(next.title)}</strong></a>`
      : `<a class="next" href="${home}"><small>All ${noun}s &rarr;</small><strong>Back to the list</strong></a>`;

    return `<nav class="pager" aria-label="Other projects">${left}${right}</nav>`;
  }

  renderPage(root) {
    const esc = ProjectShowcase.esc;
    return `
      <section class="level-hero">
        <a class="back" href="${root}index.html#${this.homeSection}">&larr; ${this.category === "builds" ? "All builds" : "All projects"}</a>
        <div class="level-title-row">
          <span class="level-node">${this.number}</span>
          <div>
            <span class="level-tagline" data-subtitle>${esc(this.pick("subtitle"))}</span>
            <h1>${esc(this.title)}</h1>
          </div>
        </div>
        ${this.renderChips()}
        ${this.renderVersionSwitch()}
      </section>

      <div class="stack">
        <div class="stage" data-stage>${this.renderStage()}</div>
        ${this.renderPager()}
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /*  Behaviour                                                          */
  /* ------------------------------------------------------------------ */

  /** Finds the active version's clips, then draws the player. */
  async loadPlayer(container, root) {
    const token = ++this.#loadToken;
    const clips = await ProjectShowcase.discoverMedia(this.mediaFolder(root));
    if (token !== this.#loadToken) return; // the user switched version meanwhile
    this.#clips = clips;
    this.#activeClip = 0;
    this.drawPlayer(container, root);
  }

  drawPlayer(container, root) {
    const player = container.querySelector("[data-player]");
    if (!player) return;
    player.querySelectorAll("video").forEach((v) => v.pause());
    player.innerHTML = this.renderPlayer();

    player.querySelectorAll("[data-clip]").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.#activeClip = Number(tab.dataset.clip);
        this.drawPlayer(container, root);
      });
    });

    const gateButton = player.querySelector("[data-gate-open]");
    if (gateButton) {
      gateButton.addEventListener("click", () => {
        const screen = gateButton.closest(".screen");
        const video = screen.querySelector("video");
        screen.querySelector(".gate").remove();
        screen.classList.remove("is-gated");
        if (!video) return; // images just need the blur removed
        video.controls = true;
        video.play().catch(() => {});
        video.focus();
      });
    }
  }

  /** Switches version in place: redraws the player, info, overview and features. */
  showVersion(container, root, index) {
    if (!this.setVersion(index)) return;

    const stage = container.querySelector("[data-stage]");
    stage.querySelectorAll("video").forEach((v) => v.pause());
    stage.innerHTML = this.renderStage();
    this.loadPlayer(container, root);

    container.querySelectorAll(".version-tab").forEach((tab, i) => {
      const on = i === index;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", String(on));
    });
    container.querySelector("[data-subtitle]").textContent = this.pick("subtitle");
    container.querySelector("[data-version-note]").textContent = this.activeVersion.note || "";

    try {
      history.replaceState(null, "", `#${this.versionHash(index)}`);
    } catch (e) {
      /* some viewers block URL changes; the switch still works */
    }
  }

  /** Builds this project's page into the given container. */
  mount(container, root) {
    const wanted = location.hash.replace("#", "").toLowerCase();
    const index = this.versions.findIndex((_, i) => this.versionHash(i) === wanted);
    if (index >= 0) this.setVersion(index);

    document.title = `${this.title} — Oni Bhardwaj`;
    container.innerHTML = this.renderPage(root);
    container.querySelectorAll(".version-tab").forEach((tab) => {
      tab.addEventListener("click", () => this.showVersion(container, root, Number(tab.dataset.version)));
    });
    this.loadPlayer(container, root);
  }
}
