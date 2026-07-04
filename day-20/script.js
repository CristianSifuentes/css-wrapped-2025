// Day 20 — Expanded range syntax
// Feature-detects range syntax inside @container style() by actually
// trying to parse a rule that uses it (CSS.supports has no clean way to
// probe at-rule syntax, so we insert a throwaway rule into a
// constructed stylesheet and see whether the parser accepts it). Where
// it's missing, every card's rain-based styling is reproduced with
// plain JS + fallback classes instead.

function supportsRangeStyleQueries() {
  if (typeof CSSStyleSheet === "undefined") return false;
  try {
    const sheet = new CSSStyleSheet();
    sheet.insertRule("@container style(1 < 2) { a { color: red; } }");
    return true;
  } catch (e) {
    return false;
  }
}

const supportsRangeStyle = supportsRangeStyleQueries();

function applyFallback(cardContainer) {
  const percent = parseFloat(cardContainer.getAttribute("data-rain-percent")) || 0;
  const card = cardContainer.querySelector(".weather-card");
  if (!card) return;
  card.classList.toggle("is-rainy", percent > 45);
  card.classList.toggle("is-stormy", percent > 70);
}

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsRangeStyle
      ? "✅ Your browser supports range syntax in style queries and if() — every card below is styled purely by CSS."
      : "⏳ No native range-style-query support detected — falling back to JavaScript toggling equivalent classes.";
    status.classList.add(supportsRangeStyle ? "ok" : "nok");
  }

  const cardContainers = document.querySelectorAll(".card-container");
  if (!supportsRangeStyle) {
    cardContainers.forEach(applyFallback);
  }

  const slider = document.querySelector("#rain-slider");
  const valueDisplay = document.querySelector("#rain-value-display");
  const mondayContainer = document.querySelector(".card-container");
  if (!slider || !valueDisplay || !mondayContainer) return;

  const mondayRainValue = mondayContainer.querySelector(".rain-value");

  slider.addEventListener("input", () => {
    const percent = `${slider.value}%`;
    valueDisplay.textContent = percent;
    if (mondayRainValue) mondayRainValue.textContent = percent;
    mondayContainer.setAttribute("data-rain-percent", percent);

    if (!supportsRangeStyle) {
      applyFallback(mondayContainer);
    }
  });
});
