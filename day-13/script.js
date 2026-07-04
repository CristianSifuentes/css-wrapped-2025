// Day 13 — DOM State-Preserving Move
// Clones a card with three pieces of live state (a mid-flight CSS
// animation, a focusable input, and an iframe running its own counter)
// into Slot A, then lets you re-parent it into Slot B and back using
// either the destructive insertBefore() or the state-preserving
// moveBefore(). The same DOM node — and the same JS references to it —
// survive either move; what differs is what happens to its live state.

document.addEventListener("DOMContentLoaded", () => {
  const slotA = document.querySelector("#slot-a");
  const slotB = document.querySelector("#slot-b");
  const template = document.querySelector("#move-card-template");
  const btnInsertBefore = document.querySelector("#btn-insert-before");
  const btnMoveBefore = document.querySelector("#btn-move-before");
  const status = document.querySelector("#support-status");
  if (!slotA || !slotB || !template || !btnInsertBefore || !btnMoveBefore) return;

  const supportsMoveBefore = typeof slotA.moveBefore === "function";

  if (status) {
    status.textContent = supportsMoveBefore
      ? "✅ Your browser supports moveBefore() — compare it against insertBefore below."
      : "⏳ No native moveBefore() support detected (needs Chrome/Edge 133+) — that button is disabled here.";
    status.classList.add(supportsMoveBefore ? "ok" : "nok");
  }

  btnMoveBefore.disabled = !supportsMoveBefore;
  if (!supportsMoveBefore) {
    btnMoveBefore.title = "moveBefore() isn't supported in this browser.";
  }

  const card = template.content.firstElementChild.cloneNode(true);
  slotA.appendChild(card);

  const input = card.querySelector(".move-card__input");
  const focusStatus = card.querySelector("#focus-status");

  input.addEventListener("focus", () => {
    focusStatus.textContent = "Focused ✅";
    focusStatus.classList.add("is-focused");
  });

  input.addEventListener("blur", () => {
    focusStatus.textContent = "Not focused";
    focusStatus.classList.remove("is-focused");
  });

  function otherSlot() {
    return card.parentElement === slotA ? slotB : slotA;
  }

  btnInsertBefore.addEventListener("click", () => {
    otherSlot().insertBefore(card, null);
  });

  btnMoveBefore.addEventListener("click", () => {
    if (!supportsMoveBefore) return;
    otherSlot().moveBefore(card, null);
  });
});
