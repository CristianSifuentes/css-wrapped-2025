// Day 05 — ::scroll-marker / ::scroll-button()
// Feature-detects support for both pseudo-elements; no other JavaScript
// is needed since the buttons, markers, and scrolling are all native
// browser behavior once the CSS above matches.

const supportsScrollButtons =
  typeof CSS !== "undefined" && CSS.supports("selector(::scroll-button(*))");
const supportsScrollMarkers =
  typeof CSS !== "undefined" && CSS.supports("selector(::scroll-marker)");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (!status) return;

  if (supportsScrollButtons && supportsScrollMarkers) {
    status.textContent = "✅ Your browser supports both ::scroll-button() and ::scroll-marker().";
    status.classList.add("ok");
  } else if (supportsScrollButtons || supportsScrollMarkers) {
    status.textContent =
      "⚠️ Partial support detected — " +
      (supportsScrollButtons ? "::scroll-button() works, ::scroll-marker() doesn't" : "::scroll-marker() works, ::scroll-button() doesn't") +
      " yet in this browser.";
    status.classList.add("nok");
  } else {
    status.textContent =
      "⏳ No native support detected — the carousel below still scrolls natively, just without the generated arrows or dots.";
    status.classList.add("nok");
  }
});
