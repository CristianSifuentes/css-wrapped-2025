// Day 03 — Customizable select
// Feature-detects `appearance: base-select` and reports it; no other
// JavaScript is needed since the customization is entirely CSS-driven —
// the browser handles opening, closing, and positioning the dropdown.

const supportsBaseSelect =
  typeof CSS !== "undefined" && CSS.supports("appearance", "base-select");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (!status) return;

  status.textContent = supportsBaseSelect
    ? "✅ Your browser supports appearance: base-select — the selects above are fully custom."
    : "⏳ No native support detected — the selects above fall back to the plain native dropdown.";
  status.classList.add(supportsBaseSelect ? "ok" : "nok");
});
