// Day 21 — Stretch sizing keyword
// Feature-detects height: stretch and, when picked, either applies it
// directly or falls back to the classic calc(100% - margin * 2)
// workaround it replaces. A readout shows the actual computed pixel
// height so the effect is visible even without staring at the edges.

const supportsStretch = typeof CSS !== "undefined" && CSS.supports("height", "stretch");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsStretch
      ? "✅ Your browser supports height: stretch."
      : "⏳ No native height: stretch support detected — selecting it falls back to calc(100% - margin * 2).";
    status.classList.add(supportsStretch ? "ok" : "nok");
  }

  const child = document.querySelector("#stretch-child");
  const readout = document.querySelector("#stretch-readout");
  const options = document.querySelectorAll('input[name="stretch-height"]');
  if (!child || !readout || !options.length) return;

  function applyHeight(value) {
    if (value === "stretch" && !supportsStretch) {
      // margin-top + margin-bottom = 1rem + 1rem = 2rem
      child.style.height = "calc(100% - 2rem)";
    } else {
      child.style.height = value;
    }

    const computedPx = Math.round(child.getBoundingClientRect().height);
    readout.textContent = `height: ${value} → computed ${computedPx}px`;
  }

  options.forEach((option) => {
    option.addEventListener("change", () => {
      if (option.checked) applyHeight(option.value);
    });
  });

  applyHeight(document.querySelector('input[name="stretch-height"]:checked').value);
});
