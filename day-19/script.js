// Day 19 — Custom Functions
// Feature-detects the @function/@dashed-function() syntax. The negate
// demo already has an equivalent calc() fallback baked into the base
// CSS rule, so JS only needs to keep --offset in sync either way. The
// conditional-radius demo has no such built-in fallback (it genuinely
// needs @function's clamp() math against the live viewport width), so
// unsupported browsers get the same logic reproduced in JS on resize.

const supportsCustomFunctions =
  typeof CSS !== "undefined" && CSS.supports("margin-top", "--negate(1px)");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsCustomFunctions
      ? "✅ Your browser supports @function — both demos below are driven purely by CSS."
      : "⏳ No native @function support detected — the demos below fall back to JavaScript computing the same math.";
    status.classList.add(supportsCustomFunctions ? "ok" : "nok");
  }

  // 1. --negate() ---------------------------------------------------------
  const offsetSlider = document.querySelector("#offset-slider");
  const offsetValue = document.querySelector("#offset-value");
  const negateBadge = document.querySelector("#negate-badge");
  if (offsetSlider && offsetValue && negateBadge) {
    offsetSlider.addEventListener("input", () => {
      const offset = `${offsetSlider.value}px`;
      offsetValue.textContent = offset;
      negateBadge.style.setProperty("--offset", offset);
    });
  }

  // 2. --conditional-radius() ---------------------------------------------
  const edgeBox = document.querySelector("#edge-box");
  const edgeStatus = document.querySelector("#edge-status");
  const desiredRadius = 20; // px, matches the 1.25rem used in the @supports rule
  const edgeDist = 4; // px, the function's default second argument

  function updateEdgeBox() {
    if (edgeStatus) {
      edgeStatus.textContent = `Window width: ${window.innerWidth}px`;
    }
    if (!edgeBox || supportsCustomFunctions) return;

    const gap = window.innerWidth - edgeBox.getBoundingClientRect().width;
    const halfGap = gap / 2;
    edgeBox.style.borderRadius = halfGap <= edgeDist ? "0px" : `${desiredRadius}px`;
  }

  updateEdgeBox();
  window.addEventListener("resize", updateEdgeBox);
});
