// Day 12 — Nested View Transition Groups
// Feature-detects document.startViewTransition and the newer
// view-transition-group: nearest/contain support, then wires up two
// cards that flip between a resting and a "featured" (scaled + 3D
// tilted) state via a real view transition. Whether the avatar+name
// label rotates along with the card depends entirely on whether the
// "nest" toggle adds `view-transition-group: nearest` before the
// transition starts.

const supportsViewTransitions = typeof document.startViewTransition === "function";
const supportsNestedGroups =
  supportsViewTransitions &&
  typeof CSS !== "undefined" &&
  CSS.supports("view-transition-group", "nearest");

function runTransition(fn) {
  if (supportsViewTransitions) {
    document.startViewTransition(fn);
  } else {
    fn();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    if (supportsNestedGroups) {
      status.textContent =
        "✅ Your browser supports nested view transition groups — toggle the checkbox to compare.";
      status.classList.add("ok");
    } else if (supportsViewTransitions) {
      status.textContent =
        "⏳ View Transitions are supported, but view-transition-group: nearest isn't (needs Chrome/Edge 140+) — the toggle below won't change anything here.";
      status.classList.add("nok");
    } else {
      status.textContent =
        "⏳ No native support for View Transitions at all — cards will snap to their featured state instantly instead of animating.";
      status.classList.add("nok");
    }
  }

  const grid = document.querySelector("#vt-grid");
  const nestToggle = document.querySelector("#nest-toggle");
  const cards = document.querySelectorAll(".vt-card");
  if (!grid || !nestToggle || !cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      grid.classList.toggle("is-nested", nestToggle.checked);

      runTransition(() => {
        cards.forEach((other) => {
          if (other !== card) other.classList.remove("is-featured");
        });
        card.classList.toggle("is-featured");
      });
    });
  });
});
