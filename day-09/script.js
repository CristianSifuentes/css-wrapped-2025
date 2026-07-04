// Day 09 — Scroll-state queries
// No JavaScript drives the demos themselves — snapping, sticking, and
// overflow detection are all native browser/CSS behavior. This only
// feature-detects `container-type: scroll-state` and reports it.

const supportsScrollState =
  typeof CSS !== "undefined" && CSS.supports("container-type", "scroll-state");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (!status) return;

  status.textContent = supportsScrollState
    ? "✅ Your browser supports container-type: scroll-state — all three demos react live."
    : "⏳ No native support detected — the demos below still scroll and snap, just without the automatic dimming, badge, or hint.";
  status.classList.add(supportsScrollState ? "ok" : "nok");
});
