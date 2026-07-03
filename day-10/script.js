// Day 10 — Tree counting functions
// Feature-detects sibling-index()/sibling-count(), sets a --i fallback
// custom property for unsupported browsers, and re-triggers the entry
// animation on shuffle by swapping in fresh DOM nodes (so @starting-style
// fires again — it only applies the first time an element is rendered).

const supportsSiblingIndex =
  typeof CSS !== "undefined" && CSS.supports("transition-delay", "calc(1s * sibling-index())");

function setFallbackIndices(gallery) {
  if (supportsSiblingIndex) return;
  [...gallery.children].forEach((card, i) => {
    card.style.setProperty("--i", String(i + 1));
  });
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsSiblingIndex
      ? "✅ Your browser supports sibling-index()/sibling-count() — the stagger is computed entirely in CSS."
      : "⏳ No native support detected — the stagger falls back to a JS-set --i custom property.";
    status.classList.add(supportsSiblingIndex ? "ok" : "nok");
  }

  const gallery = document.querySelector("#stagger-gallery");
  const shuffleBtn = document.querySelector("#shuffle-btn");
  if (!gallery || !shuffleBtn) return;

  setFallbackIndices(gallery);

  shuffleBtn.addEventListener("click", () => {
    const reordered = shuffle([...gallery.children]);

    // Fresh clones so the browser treats each card as newly rendered,
    // which is what makes @starting-style (and the stagger) replay.
    const clones = reordered.map((card) => card.cloneNode(true));

    gallery.replaceChildren(...clones);
    setFallbackIndices(gallery);
  });
});
