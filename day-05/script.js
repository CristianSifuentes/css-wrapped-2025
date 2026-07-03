// Day 05 — scroll-target-group
// Feature-detects native `scroll-target-group` support and reports it.
// Where it's missing, an IntersectionObserver drives the same
// "currently visible section" highlight on the table of contents.

const supportsScrollTargetGroup =
  typeof CSS !== "undefined" && CSS.supports("scroll-target-group", "auto");

document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsScrollTargetGroup
      ? "✅ Your browser supports scroll-target-group — the highlight above is fully native."
      : "⏳ No native support detected — the highlight is polyfilled with an IntersectionObserver.";
    status.classList.add(supportsScrollTargetGroup ? "ok" : "nok");
  }

  if (supportsScrollTargetGroup) return;

  const panel = document.querySelector(".scrollspy-panel");
  const links = document.querySelectorAll(".toc a");
  if (!panel || !links.length) return;

  const linkByTargetId = new Map(
    [...links].map((link) => [link.getAttribute("href").slice(1), link])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkByTargetId.get(entry.target.id);
        if (!link) return;
        link.classList.toggle("is-current", entry.isIntersecting);
      });
    },
    { root: panel, threshold: 0.6 }
  );

  document.querySelectorAll(".scrollspy-section").forEach((section) => {
    observer.observe(section);
  });
});
