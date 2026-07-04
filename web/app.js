const themeAssets = [
  { id: "cream", bg: "#fdf8ee", accent: "#c9a05a" },
  { id: "mint", bg: "#f7f7f0", accent: "#8ea866" },
  { id: "blush", bg: "#fdf3ee", accent: "#d8897a" },
  { id: "sky", bg: "#f2f5f7", accent: "#6f9eb8" },
  { id: "wheat", bg: "#fef7ea", accent: "#c9922f" },
  { id: "lavender", bg: "#f3eef4", accent: "#9a7eb5" },
  { id: "teal", bg: "#f1f6f4", accent: "#5f9a8f" },
  { id: "peach", bg: "#fdf3ec", accent: "#d07f55" },
  { id: "slate", bg: "#eef4f7", accent: "#6a9bc4" },
  { id: "master", bg: "#fefbf8", accent: "#a89562" }
];

const studyState = {
  index: 0,
  mode: "both",
  flipped: false
};

function pickTheme(index) {
  return index % 10 === 9 ? themeAssets[9] : themeAssets[index % 9];
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getHadithById(id) {
  const numericId = Number(id);
  return hadiths.find((item) => Number(item.id) === numericId) || null;
}

function hadithIndexFromId(id) {
  const numericId = Number(id);
  return hadiths.findIndex((item) => Number(item.id) === numericId);
}

function navLink(href, label, active) {
  const activeClass = active ? ' class="is-active"' : "";
  return `<li><a href="${href}"${activeClass}>${label}</a></li>`;
}

function renderSiteHeader(active) {
  return `
    <header class="site-header">
      <p class="site-title"><a href="#/">Hadith Cards</a></p>
      <ul class="site-nav">
        ${navLink("#/", "The Collection", active === "collection")}
        ${navLink("#study", "Study", active === "study")}
        ${navLink("#split", "Split View", active === "split")}
        ${navLink("#gallery", "Gallery", active === "gallery")}
        ${navLink("#about", "About", active === "about")}
        <li><a href="wireframes.html">Layouts</a></li>
      </ul>
    </header>
  `;
}

function renderSiteFooter() {
  return `
    <footer class="site-footer">
      <p>Short hadiths for study and reflection. Printable cards are maintained on the <code>main</code> branch.</p>
    </footer>
  `;
}

function renderHadithCard(hadith, index, options = {}) {
  const theme = pickTheme(index);
  const { compact = false } = options;
  const englishClass = compact ? "hadith-english" : "hadith-english";
  const arabicClass = compact ? "hadith-arabic" : "hadith-arabic";

  return `
    <article class="hadith-card" style="--card-bg:${theme.bg};--accent:${theme.accent}">
      <div class="hadith-card__inner">
        <p class="${englishClass}">${escapeHTML(hadith.english)}</p>
        <hr class="hadith-rule" aria-hidden="true">
        <p class="${arabicClass}" lang="ar" dir="rtl">${escapeHTML(hadith.arabic)}</p>
        <p class="hadith-source">${escapeHTML(hadith.source)}</p>
      </div>
    </article>
  `;
}

function renderPrevNext(id) {
  const currentIndex = hadithIndexFromId(id);
  const prev = currentIndex > 0 ? hadiths[currentIndex - 1] : null;
  const next = currentIndex < hadiths.length - 1 ? hadiths[currentIndex + 1] : null;

  return `
    <nav class="hadith-nav" aria-label="Hadith navigation">
      ${
        prev
          ? `<a href="#hadith/${prev.id}">← Previous Hadith</a>`
          : `<span></span>`
      }
      ${
        next
          ? `<a href="#hadith/${next.id}">Next Hadith →</a>`
          : `<span></span>`
      }
    </nav>
  `;
}

function renderCollection(filterText = "") {
  const query = filterText.trim().toLowerCase();
  const items = hadiths
    .map((hadith, index) => ({ hadith, index }))
    .filter(({ hadith }) => {
      if (!query) return true;
      return (
        hadith.english.toLowerCase().includes(query) ||
        hadith.arabic.includes(query) ||
        hadith.source.toLowerCase().includes(query) ||
        String(hadith.id).includes(query)
      );
    });

  const list = items
    .map(
      ({ hadith }) => `
        <li class="collection-item">
          <a href="#hadith/${hadith.id}">
            <span class="collection-number">Hadith ${hadith.id}</span>
            <span class="collection-title">${escapeHTML(hadith.english)}</span>
          </a>
        </li>
      `
    )
    .join("");

  return `
    ${renderSiteHeader("collection")}
    <main>
      <section class="hero">
        <h1>The Hadith Card Collection</h1>
        <p>Sixty short hadiths for study, reflection, and memorization.</p>
      </section>
      <label class="visually-hidden" for="search">Search hadiths</label>
      <input
        id="search"
        class="search-box"
        type="search"
        placeholder="Search by English, Arabic, source, or number…"
        value="${escapeHTML(filterText)}"
        autocomplete="off"
      >
      <ul class="collection-list" aria-label="Hadith collection">
        ${list || `<li class="collection-item"><span class="collection-title">No hadiths match your search.</span></li>`}
      </ul>
    </main>
    ${renderSiteFooter()}
  `;
}

function renderDetail(id) {
  const hadith = getHadithById(id);
  if (!hadith) {
    return renderError(`Hadith ${escapeHTML(id)} was not found.`);
  }

  const index = hadithIndexFromId(id);

  return `
    ${renderSiteHeader("collection")}
    <main>
      <article class="hadith-detail">
        <p class="hadith-label">Hadith ${hadith.id}</p>
        <h1 class="visually-hidden">${escapeHTML(hadith.english)}</h1>
        ${renderHadithCard(hadith, index)}
        ${renderPrevNext(id)}
        <p style="margin-top:1.5rem;text-align:center;">
          <a class="btn" href="#/">← Back to collection</a>
          <a class="btn btn--primary" href="#study/${hadith.id}">Study this hadith</a>
        </p>
      </article>
    </main>
    ${renderSiteFooter()}
  `;
}

function studyFaceContent(hadith, mode) {
  if (mode === "arabic") {
    return `<p class="hadith-arabic" lang="ar" dir="rtl">${escapeHTML(hadith.arabic)}</p>`;
  }
  if (mode === "english") {
    return `<p class="hadith-english">${escapeHTML(hadith.english)}</p>`;
  }
  return `
    <p class="hadith-arabic" lang="ar" dir="rtl">${escapeHTML(hadith.arabic)}</p>
    <hr class="hadith-rule" aria-hidden="true">
    <p class="hadith-english">${escapeHTML(hadith.english)}</p>
  `;
}

function renderStudy(startId) {
  if (startId) {
    const idx = hadithIndexFromId(startId);
    if (idx >= 0) studyState.index = idx;
  }

  const hadith = hadiths[studyState.index];
  const theme = pickTheme(studyState.index);
  const flipClass = studyState.flipped ? " is-flipped" : "";
  const frontMode = studyState.mode === "english" ? "english" : studyState.mode === "arabic" ? "arabic" : "both";
  const backMode = studyState.mode === "both" ? "english" : studyState.mode === "arabic" ? "english" : "arabic";

  return `
    ${renderSiteHeader("study")}
    <main>
      <section class="study-screen" aria-label="Study mode">
        <p class="study-hint">Tap the card to flip · Use arrow keys to navigate</p>
        <div class="study-card-wrap">
          <article
            class="study-card${flipClass}"
            style="--card-bg:${theme.bg}"
            data-action="flip-card"
            tabindex="0"
            aria-label="Hadith ${hadith.id}. Tap to flip."
          >
            <div class="study-card-face study-card-face--front">
              ${studyFaceContent(hadith, frontMode)}
            </div>
            <div class="study-card-face study-card-face--back" aria-hidden="${studyState.flipped ? "false" : "true"}">
              ${studyFaceContent(hadith, backMode)}
            </div>
          </article>
        </div>
        <p class="hadith-source">${escapeHTML(hadith.source)}</p>
        <div class="study-mode-toggle" role="group" aria-label="Study display mode">
          <button type="button" class="btn${studyState.mode === "both" ? " is-active" : ""}" data-action="mode" data-mode="both">Both</button>
          <button type="button" class="btn${studyState.mode === "arabic" ? " is-active" : ""}" data-action="mode" data-mode="arabic">Arabic only</button>
          <button type="button" class="btn${studyState.mode === "english" ? " is-active" : ""}" data-action="mode" data-mode="english">English only</button>
        </div>
        <div class="study-controls">
          <button type="button" class="btn" data-action="open-drawer" aria-expanded="false">Index</button>
          <button type="button" class="btn" data-action="prev">← Prev</button>
          <span class="study-counter">${studyState.index + 1} / ${hadiths.length}</span>
          <button type="button" class="btn" data-action="shuffle" title="Random hadith">Shuffle</button>
          <button type="button" class="btn" data-action="next">Next →</button>
        </div>
        <p style="margin:0;text-align:center;">
          <a class="btn" href="#hadith/${hadith.id}">Read full page</a>
        </p>
      </section>
    </main>
    <div class="drawer-backdrop" hidden data-action="close-drawer"></div>
    <aside class="drawer" hidden aria-label="Hadith index">
      <div class="drawer-header">
        <h2>Hadith 1–${hadiths.length}</h2>
        <button type="button" class="btn" data-action="close-drawer">Close</button>
      </div>
      <ul class="collection-list">
        ${hadiths
          .map(
            (item) => `
              <li class="collection-item">
                <a href="#study/${item.id}" data-action="pick-study" data-id="${item.id}">
                  <span class="collection-number">Hadith ${item.id}</span>
                  <span class="collection-title">${escapeHTML(item.english)}</span>
                </a>
              </li>
            `
          )
          .join("")}
      </ul>
    </aside>
    ${renderSiteFooter()}
  `;
}

function renderSplit(selectedId) {
  const activeId = selectedId || hadiths[0].id;
  const hadith = getHadithById(activeId);
  const index = hadithIndexFromId(activeId);

  return `
    ${renderSiteHeader("split")}
    <main>
      <section class="split-layout">
        <div>
          <label class="visually-hidden" for="split-search">Filter hadiths</label>
          <input id="split-search" class="search-box" type="search" placeholder="Filter list…" style="margin-bottom:0.75rem;">
          <ul class="split-list" id="split-list" aria-label="Hadith list">
            ${hadiths
              .map(
                (item) => `
                  <li>
                    <a href="#split/${item.id}" class="${Number(item.id) === Number(activeId) ? "is-active" : ""}">
                      <span class="collection-number">Hadith ${item.id}</span>
                      ${escapeHTML(item.english)}
                    </a>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
        <div class="split-reader">
          <p class="hadith-label">Hadith ${hadith.id}</p>
          ${renderHadithCard(hadith, index)}
          ${renderPrevNext(activeId)}
        </div>
      </section>
    </main>
    ${renderSiteFooter()}
  `;
}

function renderGallery(openId) {
  const tiles = hadiths
    .map((hadith, index) => {
      const theme = pickTheme(index);
      return `
        <button
          type="button"
          class="gallery-tile"
          style="--card-bg:${theme.bg}"
          data-action="open-gallery"
          data-id="${hadith.id}"
          aria-label="Open Hadith ${hadith.id}"
        >
          <span class="gallery-tile__badge">Hadith ${hadith.id}</span>
          <span class="gallery-tile__arabic" lang="ar" dir="rtl">${escapeHTML(hadith.arabic)}</span>
        </button>
      `;
    })
    .join("");

  const modalHadith = openId ? getHadithById(openId) : null;
  const modalIndex = openId ? hadithIndexFromId(openId) : -1;

  return `
    ${renderSiteHeader("gallery")}
    <main>
      <section class="hero">
        <h1>Card Gallery</h1>
        <p>Browse all sixty cards with their botanical themes.</p>
      </section>
      <div class="gallery-grid" aria-label="Hadith card gallery">
        ${tiles}
      </div>
    </main>
    <div class="gallery-modal" ${modalHadith ? "" : "hidden"} role="dialog" aria-modal="true" aria-label="Hadith detail">
      <div class="gallery-modal__panel">
        ${
          modalHadith
            ? `
              <p class="hadith-label">Hadith ${modalHadith.id}</p>
              ${renderHadithCard(modalHadith, modalIndex)}
              <div class="gallery-modal__actions">
                <button type="button" class="btn" data-action="close-gallery">Close</button>
                <div>
                  ${
                    modalIndex > 0
                      ? `<button type="button" class="btn" data-action="gallery-prev">← Prev</button>`
                      : ""
                  }
                  ${
                    modalIndex < hadiths.length - 1
                      ? `<button type="button" class="btn" data-action="gallery-next">Next →</button>`
                      : ""
                  }
                  <a class="btn btn--primary" href="#study/${modalHadith.id}">Study</a>
                </div>
              </div>
            `
            : ""
        }
      </div>
    </div>
    ${renderSiteFooter()}
  `;
}

function renderAbout() {
  return `
    ${renderSiteHeader("about")}
    <main>
      <article class="about-page">
        <h1>About this collection</h1>
        <p>
          This site presents sixty short hadiths drawn from classical sources, formatted for
          daily study and memorization. Each card pairs Arabic text with an English translation
          and its source.
        </p>
        <p>
          The interactive site lives on the <code>website</code> branch. Printable card sheets
          for cutting and physical study are maintained separately on the <code>main</code> branch.
        </p>
        <p>
          Inspired by the calm, numbered-collection style of
          <a href="https://40hadithnawawi.com/" rel="noopener noreferrer">40HadithNawawi.com</a>.
        </p>
        <p>
          <a class="btn btn--primary" href="#/">Browse the collection</a>
          <a class="btn" href="#study">Start studying</a>
        </p>
      </article>
    </main>
    ${renderSiteFooter()}
  `;
}

function renderError(message) {
  return `
    ${renderSiteHeader("collection")}
    <main>
      <p class="load-message load-message--error">${message}</p>
      <p style="text-align:center;"><a class="btn" href="#/">Back to collection</a></p>
    </main>
    ${renderSiteFooter()}
  `;
}

function renderLoadError() {
  document.body.innerHTML = `
    <main>
      <p class="load-message load-message--error">
        Could not load <code>hadiths.js</code>. Start a local server from the repo root
        (<code>python3 -m http.server 8000</code>), then open
        <a href="http://localhost:8000/web/">http://localhost:8000/web/</a>.
      </p>
    </main>
  `;
}

function parseRoute() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const parts = raw.split("/").filter(Boolean);

  if (parts.length === 0 || parts[0] === "") {
    return { view: "collection" };
  }

  if (parts[0] === "hadith" && parts[1]) {
    return { view: "detail", id: parts[1] };
  }

  if (parts[0] === "study") {
    return { view: "study", id: parts[1] || null };
  }

  if (parts[0] === "split") {
    return { view: "split", id: parts[1] || null };
  }

  if (parts[0] === "gallery") {
    return { view: "gallery", id: parts[1] || null };
  }

  if (parts[0] === "about") {
    return { view: "about" };
  }

  return { view: "collection" };
}

let collectionFilter = "";

function render() {
  if (typeof hadiths === "undefined" || !Array.isArray(hadiths) || hadiths.length === 0) {
    renderLoadError();
    return;
  }

  const route = parseRoute();
  let html = "";

  switch (route.view) {
    case "detail":
      html = renderDetail(route.id);
      document.title = `Hadith ${route.id} — Hadith Cards`;
      break;
    case "study":
      html = renderStudy(route.id);
      document.title = "Study — Hadith Cards";
      break;
    case "split":
      html = renderSplit(route.id);
      document.title = "Split View — Hadith Cards";
      break;
    case "gallery":
      html = renderGallery(route.id);
      document.title = "Gallery — Hadith Cards";
      break;
    case "about":
      html = renderAbout();
      document.title = "About — Hadith Cards";
      break;
    default:
      html = renderCollection(collectionFilter);
      document.title = "Hadith Cards";
      break;
  }

  document.body.innerHTML = html;
  bindEvents(route);
}

function bindEvents(route) {
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", (event) => {
      collectionFilter = event.target.value;
      const caret = event.target.selectionStart;
      render();
      const nextSearch = document.getElementById("search");
      if (nextSearch) {
        nextSearch.focus();
        nextSearch.setSelectionRange(caret, caret);
      }
    });
  }

  const splitSearch = document.getElementById("split-search");
  const splitList = document.getElementById("split-list");
  if (splitSearch && splitList) {
    splitSearch.addEventListener("input", () => {
      const query = splitSearch.value.trim().toLowerCase();
      splitList.querySelectorAll("li").forEach((item, index) => {
        const hadith = hadiths[index];
        const visible =
          !query ||
          hadith.english.toLowerCase().includes(query) ||
          hadith.arabic.includes(query) ||
          hadith.source.toLowerCase().includes(query) ||
          String(hadith.id).includes(query);
        item.hidden = !visible;
      });
    });
  }

  document.removeEventListener("keydown", onStudyKeydown);
  if (route.view === "study") {
    document.addEventListener("keydown", onStudyKeydown);
  }
}

function onBodyClick(event) {
  if (event.target.classList.contains("gallery-modal")) {
    location.hash = "#gallery";
    return;
  }

  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "flip-card") {
    studyState.flipped = !studyState.flipped;
    render();
    return;
  }

  if (action === "mode") {
    studyState.mode = target.dataset.mode;
    studyState.flipped = false;
    render();
    return;
  }

  if (action === "prev") {
    studyState.index = Math.max(0, studyState.index - 1);
    studyState.flipped = false;
    location.hash = `#study/${hadiths[studyState.index].id}`;
    return;
  }

  if (action === "next") {
    studyState.index = Math.min(hadiths.length - 1, studyState.index + 1);
    studyState.flipped = false;
    location.hash = `#study/${hadiths[studyState.index].id}`;
    return;
  }

  if (action === "shuffle") {
    studyState.index = Math.floor(Math.random() * hadiths.length);
    studyState.flipped = false;
    location.hash = `#study/${hadiths[studyState.index].id}`;
    return;
  }

  if (action === "open-drawer") {
    document.querySelector(".drawer")?.removeAttribute("hidden");
    document.querySelector(".drawer-backdrop")?.removeAttribute("hidden");
    return;
  }

  if (action === "close-drawer") {
    document.querySelector(".drawer")?.setAttribute("hidden", "");
    document.querySelector(".drawer-backdrop")?.setAttribute("hidden", "");
    return;
  }

  if (action === "pick-study") {
    studyState.index = hadithIndexFromId(target.dataset.id);
    studyState.flipped = false;
    document.querySelector(".drawer")?.setAttribute("hidden", "");
    document.querySelector(".drawer-backdrop")?.setAttribute("hidden", "");
    return;
  }

  if (action === "open-gallery") {
    location.hash = `#gallery/${target.dataset.id}`;
    return;
  }

  if (action === "close-gallery") {
    location.hash = "#gallery";
    return;
  }

  if (action === "gallery-prev") {
    const currentId = parseRoute().id;
    const idx = hadithIndexFromId(currentId);
    if (idx > 0) location.hash = `#gallery/${hadiths[idx - 1].id}`;
    return;
  }

  if (action === "gallery-next") {
    const currentId = parseRoute().id;
    const idx = hadithIndexFromId(currentId);
    if (idx < hadiths.length - 1) location.hash = `#gallery/${hadiths[idx + 1].id}`;
  }
}

function onStudyCardKeydown(event) {
  const card = event.target.closest(".study-card");
  if (!card) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    studyState.flipped = !studyState.flipped;
    render();
  }
}

function onStudyKeydown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    studyState.index = Math.max(0, studyState.index - 1);
    studyState.flipped = false;
    location.hash = `#study/${hadiths[studyState.index].id}`;
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    studyState.index = Math.min(hadiths.length - 1, studyState.index + 1);
    studyState.flipped = false;
    location.hash = `#study/${hadiths[studyState.index].id}`;
  } else if (event.key === "Escape") {
    document.querySelector(".drawer")?.setAttribute("hidden", "");
    document.querySelector(".drawer-backdrop")?.setAttribute("hidden", "");
  }
}

window.addEventListener("hashchange", render);
document.body.addEventListener("click", onBodyClick);
document.body.addEventListener("keydown", onStudyCardKeydown);
render();
