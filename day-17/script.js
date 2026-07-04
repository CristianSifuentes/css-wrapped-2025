// Day 17 — shape() function
// Feature-detects clip-path: shape() and, where supported, binds a
// slider directly to the --wave custom property the flag's shape()
// commands reference — proof that the shape recomputes live as the
// underlying custom property animates.

const supportsShapeFunction =
  typeof CSS !== "undefined" && CSS.supports("clip-path", "shape(from 0% 0%, line to 100% 100%)");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsShapeFunction
      ? "✅ Your browser supports clip-path: shape() — drag the slider below."
      : "⏳ No native shape() support detected — the flag renders as a plain rectangle and the slider has no effect.";
    status.classList.add(supportsShapeFunction ? "ok" : "nok");
  }

  const flag = document.querySelector("#flag");
  const slider = document.querySelector("#wave-slider");
  const valueLabel = document.querySelector("#wave-value");
  if (!flag || !slider || !valueLabel) return;

  slider.disabled = !supportsShapeFunction;

  slider.addEventListener("input", () => {
    const wave = `${slider.value}px`;
    valueLabel.textContent = wave;
    flag.style.setProperty("--wave", wave);
  });
});
