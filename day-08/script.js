// Day 08 — Interest invokers
// Feature-detects `interestfor` (interest invokers) support. Where it's
// missing, wires up the same hover/focus-to-open behavior by hand, so the
// product callouts above still work everywhere.

const supportsInterestFor = "interestForElement" in HTMLButtonElement.prototype;

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsInterestFor
      ? "✅ Your browser supports interestfor natively — the callouts above use interest-delay."
      : "⏳ No native support detected — callouts are polyfilled with hover/focus listeners.";
    status.classList.add(supportsInterestFor ? "ok" : "nok");
  }

  if (supportsInterestFor) return;

  document.querySelectorAll("[interestfor]").forEach((trigger) => {
    const popover = document.querySelector(`#${trigger.getAttribute("interestfor")}`);
    if (!popover) return;

    let hideTimer = null;
    const open = () => {
      clearTimeout(hideTimer);
      popover.showPopover?.();
    };
    const scheduleClose = () => {
      hideTimer = setTimeout(() => popover.hidePopover?.(), 150);
    };

    trigger.addEventListener("mouseenter", open);
    trigger.addEventListener("focus", open);
    trigger.addEventListener("mouseleave", scheduleClose);
    trigger.addEventListener("blur", scheduleClose);
    popover.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    popover.addEventListener("mouseleave", scheduleClose);
  });
});
