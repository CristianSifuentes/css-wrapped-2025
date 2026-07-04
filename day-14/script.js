// Day 14 — Advanced attr() function
// Feature-detects the typed attr(name type(<type>), fallback) syntax and,
// where it's missing, mirrors each demo's attribute into the equivalent
// inline style by hand so the three live demos still work everywhere.

const supportsAdvancedAttr =
  typeof CSS !== "undefined" && CSS.supports("background", "attr(data-color type(<color>), red)");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsAdvancedAttr
      ? "✅ Your browser supports typed attr() — every demo below is driven purely by CSS."
      : "⏳ No native support for typed attr() detected — the demos below fall back to JavaScript keeping the equivalent inline styles in sync.";
    status.classList.add(supportsAdvancedAttr ? "ok" : "nok");
  }

  // 1. Typed color -----------------------------------------------------
  const colorInput = document.querySelector("#color-input");
  const swatch = document.querySelector("#color-swatch");
  if (colorInput && swatch) {
    colorInput.addEventListener("input", () => {
      swatch.setAttribute("data-color", colorInput.value);
      if (!supportsAdvancedAttr) {
        swatch.style.background = colorInput.value;
      }
    });
  }

  // 2. Typed custom idents ----------------------------------------------
  document.querySelectorAll(".vt-name-card").forEach((card) => {
    const badge = card.querySelector("[data-computed]");
    if (!badge) return;
    const computed = getComputedStyle(card).viewTransitionName;
    badge.textContent = supportsAdvancedAttr
      ? `view-transition-name: ${computed}`
      : "view-transition-name: none (needs Chrome/Edge 133+)";
  });

  // 3. Typed numbers — star rating ---------------------------------------
  const ratingInput = document.querySelector("#rating-input");
  const starRating = document.querySelector("#star-rating");
  if (ratingInput && starRating) {
    ratingInput.addEventListener("input", () => {
      starRating.setAttribute("data-rating", ratingInput.value);
      if (!supportsAdvancedAttr) {
        starRating.style.setProperty("--percent-fill", `${Number(ratingInput.value) * 20}%`);
      }
    });

    if (!supportsAdvancedAttr) {
      starRating.style.setProperty("--percent-fill", `${Number(ratingInput.value) * 20}%`);
    }
  }
});
