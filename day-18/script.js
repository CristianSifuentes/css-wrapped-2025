// Day 18 — if() statements
// Feature-detects CSS if() and, where it's missing, mirrors both demos'
// logic in JavaScript: a matchMedia listener flips the layout's
// flex-direction, and a click listener toggles a fallback class instead
// of relying on if(style(...)) to read the --emphasis custom property.

const supportsCssIf =
  typeof CSS !== "undefined" && CSS.supports("color", "if(style(--emphasis: true): red; else: blue)");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsCssIf
      ? "✅ Your browser supports if() — both demos below are driven purely by CSS."
      : "⏳ No native if() support detected — the demos below fall back to JavaScript computing the same result.";
    status.classList.add(supportsCssIf ? "ok" : "nok");
  }

  // 1. media() — responsive layout ---------------------------------------
  const layout = document.querySelector("#responsive-layout");
  const layoutStatus = document.querySelector("#layout-status");
  const orientationQuery = window.matchMedia("(orientation: landscape)");

  function reportOrientation() {
    const isLandscape = orientationQuery.matches;
    if (layoutStatus) {
      layoutStatus.textContent = `Current orientation: ${isLandscape ? "landscape" : "portrait"} → flex-direction: ${isLandscape ? "row" : "column"}`;
    }
    if (layout && !supportsCssIf) {
      layout.style.flexDirection = isLandscape ? "row" : "column";
    }
  }

  reportOrientation();
  orientationQuery.addEventListener("change", reportOrientation);

  // 2. style() — custom property driven card -----------------------------
  const toggle = document.querySelector("#emphasis-toggle");
  const card = document.querySelector("#style-card");
  if (toggle && card) {
    toggle.addEventListener("click", () => {
      const isEmphasized = card.style.getPropertyValue("--emphasis") !== "true";
      card.style.setProperty("--emphasis", isEmphasized ? "true" : "false");
      card.classList.toggle("is-emphasized", !supportsCssIf && isEmphasized);
      card.textContent = `--emphasis: ${isEmphasized}`;
    });
  }
});
