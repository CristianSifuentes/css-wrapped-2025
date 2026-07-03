// Day 02 — Dialog Light Dismiss
// Wires up open/close buttons for the three demo dialogs, feature-detects
// native `closedby` support, and polyfills the "any" behavior (Esc + a
// backdrop click closes the dialog) for browsers that don't support it yet.

const supportsClosedBy = "closedBy" in HTMLDialogElement.prototype;

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsClosedBy
      ? "✅ Your browser supports the closedby attribute natively."
      : "⏳ No native support detected — light dismiss is polyfilled with JavaScript for this demo.";
    status.classList.add(supportsClosedBy ? "ok" : "nok");
  }

  document.querySelectorAll("[data-open-dialog]").forEach((button) => {
    const dialog = document.querySelector(`#${button.dataset.openDialog}`);
    if (!dialog) return;
    button.addEventListener("click", () => dialog.showModal());
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
  });

  if (!supportsClosedBy) {
    document.querySelectorAll(".light-dismiss-dialog").forEach(polyfillClosedBy);
  }
});

function polyfillClosedBy(dialog) {
  const mode = dialog.getAttribute("closedby") || "none";
  if (mode === "none") return;

  // Click on the ::backdrop (a click whose target is the <dialog> itself,
  // since the backdrop sits just outside the dialog's own padding box).
  dialog.addEventListener("click", (event) => {
    if (mode !== "any") return;
    const isBackdropClick = event.target === dialog;
    if (isBackdropClick) dialog.close();
  });

  // Native <dialog> already closes on Esc by default in most browsers —
  // this only steps in if that default was somehow suppressed.
  dialog.addEventListener("cancel", (event) => {
    if (mode === "none") event.preventDefault();
  });
}
