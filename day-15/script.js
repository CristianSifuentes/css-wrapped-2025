// Day 15 — ToggleEvent.source
// Wires up a real popover + Invoker Commands cookie banner. Whichever
// button closes the banner is read back from the "toggle" event's
// `source` property. Where that property isn't supported yet, the last
// clicked button is tracked manually as a fallback so the demo still
// reports the right answer.

const supportsToggleSource =
  typeof ToggleEvent !== "undefined" && "source" in ToggleEvent.prototype;

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsToggleSource
      ? "✅ Your browser supports ToggleEvent.source — the log below reads it directly."
      : "⏳ No native ToggleEvent.source detected — falling back to manually tracking the last-clicked button.";
    status.classList.add(supportsToggleSource ? "ok" : "nok");
  }

  const cookiebanner = document.querySelector("#cookiebanner");
  const btnYes = document.querySelector("#btn-yes");
  const btnNo = document.querySelector("#btn-no");
  const log = document.querySelector("#event-log");
  if (!cookiebanner || !btnYes || !btnNo || !log) return;

  let lastInvoker = null;
  if (!supportsToggleSource) {
    [btnYes, btnNo].forEach((btn) => {
      btn.addEventListener("click", () => {
        lastInvoker = btn;
      });
    });
  }

  cookiebanner.addEventListener("toggle", (event) => {
    if (event.newState === "open") {
      log.textContent = "Banner opened — choose Yes or No.";
      return;
    }

    const source = supportsToggleSource ? event.source : lastInvoker;
    lastInvoker = null;

    if (source === btnYes) {
      log.textContent = '🍪 You said YES — event.source was the "Yes, please" button.';
    } else if (source === btnNo) {
      log.textContent = '🚫 You said NO — event.source was the "No, thanks" button.';
    } else {
      log.textContent = "Closed without a source element (e.g. Esc key or a light-dismiss click outside).";
    }
  });
});
