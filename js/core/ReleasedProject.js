/**
 * ReleasedProject — a shipped, professional title.
 *
 * Inherits from ProjectShowcase, so it lives in the same registry and uses the
 * same data fields. It changes three things:
 *   - category is "professional", so it shows in the Released titles section
 *   - it has store links and a credit (studio, role, platform) instead of a clip page
 *   - its card shows the store thumbnail (or generated circle art if there is none)
 *
 * When clips are available, give it a page like any other project.
 */
class ReleasedProject extends ProjectShowcase {
  category = "professional";
  status = "Released";
  studio = "Rendered Ideas";
  role = "Game Developer L1";
  platform = "";
  storeTitle = "";      // the full name the store lists it under
  stores = [];          // [{ name, url }]
  publisher = "";       // as the store lists it, if different from the studio name
  listingTitle = "";    // the headline line at the top of the store description
  overview = [];        // paragraphs from the store listing
  listSections = [];    // [{ title, intro, items: [string | { name, text }] }] from the store listing
  listing = [];         // extra [label, value] facts from the store (rating, category...)
  thumbnail = "";       // file in assets/released/ — falls back to circle art when empty
  art = { color: "#ffb547", glyph: "" };

  getChips() {
    return [{ label: this.genre }, { label: "Released", kind: "up" }];
  }

  /** Credit lines shown on the card. */
  getCredits() {
    return [
      ["Role", this.role],
      ["Studio", this.studio],
      ["Publisher", this.publisher],
      ["Platform", this.platform],
    ].filter(([, v]) => v);
  }

  renderArt(root) {
    const esc = ProjectShowcase.esc;
    if (this.thumbnail) {
      return `
        <div class="release-art has-thumb">
          <img src="${root}assets/released/${esc(this.thumbnail)}" alt="${esc(this.title)} store artwork" loading="lazy" width="1024" height="500">
          <span class="release-stamp">Released</span>
        </div>`;
    }
    return `
      <div class="release-art" aria-hidden="true">
        <span class="ring r1"></span><span class="ring r2"></span><span class="ring r3"></span>
        <span class="glyph">${esc(this.art.glyph)}</span>
        <span class="release-stamp">Released</span>
      </div>`;
  }

  /** Expandable store details. Only drawn when the listing gave us something. */
  renderDetails() {
    const esc = ProjectShowcase.esc;
    if (!this.listingTitle && !this.overview.length && !this.listSections.length && !this.listing.length) return "";

    const sections = this.listSections
      .map(
        (sec) => `
        <div class="release-sec">
          <h4>${esc(sec.title)}</h4>
          ${sec.intro ? `<p>${esc(sec.intro)}</p>` : ""}
          <ul>${sec.items
            .map((it) =>
              typeof it === "string"
                ? `<li>${esc(it)}</li>`
                : `<li><strong>${esc(it.name)}:</strong> ${esc(it.text)}</li>`
            )
            .join("")}</ul>
        </div>`
      )
      .join("");
    const facts = this.listing
      .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
      .join("");

    return `
      <details class="release-more">
        <summary>Store listing details</summary>
        <div class="release-more-body">
          ${this.listingTitle ? `<h4 class="release-headline">${esc(this.listingTitle)}</h4>` : ""}
          ${this.overview.map((p) => `<p>${esc(p)}</p>`).join("")}
          ${sections}
          ${facts ? `<dl class="credits">${facts}</dl>` : ""}
        </div>
      </details>`;
  }

  renderCard(root = "") {
    const esc = ProjectShowcase.esc;
    const credits = this.getCredits()
      .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
      .join("");
    const links = this.stores
      .map(
        (s) =>
          `<a class="btn store-link" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)} <span aria-hidden="true">&nearr;</span></a>`
      )
      .join("");

    return `
      <article class="release-card" style="--art: ${esc(this.art.color)}">
        ${this.renderArt(root)}
        <div class="level-body">
          <span class="level-sub">${esc(this.subtitle)}</span>
          <h3>${esc(this.title)}</h3>
          <p class="store-title">${esc(this.storeTitle)}</p>
          <p>${esc(this.blurb)}</p>
          ${this.renderChips()}
          <dl class="credits">${credits}</dl>
          ${this.renderDetails()}
          <div class="store-links">${links}</div>
        </div>
      </article>`;
  }

  bindCard() {
    /* no hover preview without a clip */
  }
}
