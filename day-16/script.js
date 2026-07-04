// Day 16 — text-box features
// Feature-detects `text-box: trim-both cap alphabetic;` and toggles it
// on the two sample elements. There's no meaningful JS fallback for
// missing font-metric trimming, so unsupported browsers just keep the
// default half-leading regardless of the checkbox — the point of the
// demo is precisely to make that gap visible against the guide.

const supportsTextBoxTrim =
  typeof CSS !== "undefined" && CSS.supports("text-box", "trim-both cap alphabetic");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsTextBoxTrim
      ? "✅ Your browser supports text-box — toggle the checkbox to compare."
      : "⏳ No native text-box support detected (needs Chrome/Edge 133+) — the checkbox below won't change anything here.";
    status.classList.add(supportsTextBoxTrim ? "ok" : "nok");
  }

  const demo = document.querySelector(".text-box-demo");
  const toggle = document.querySelector("#trim-toggle");
  if (!demo || !toggle) return;

  toggle.disabled = !supportsTextBoxTrim;

  const applyState = () => demo.classList.toggle("is-trimmed", toggle.checked);
  applyState();
  toggle.addEventListener("change", applyState);
});
