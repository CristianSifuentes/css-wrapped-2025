// Day 07 — Anchored container queries
// The tooltip's own hover/focus + CSS handles opening it; the only JS here
// toggles the anchor's position within its stage, and reports whether the
// browser understands `container-type: anchored`.

const supportsAnchoredContainer =
  typeof CSS !== "undefined" && CSS.supports("container-type", "anchored");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsAnchoredContainer
      ? "✅ Your browser supports container-type: anchored — the arrow flips automatically."
      : "⏳ No native support detected — the tooltip still opens, but its arrow won't flip.";
    status.classList.add(supportsAnchoredContainer ? "ok" : "nok");
  }

  const toggle = document.querySelector("#force-flip-toggle");
  const stage = document.querySelector("#anchor-stage");
  if (!toggle || !stage) return;

  toggle.addEventListener("change", () => {
    stage.classList.toggle("is-flipped", toggle.checked);
  });
});
