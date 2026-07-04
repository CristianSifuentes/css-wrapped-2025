// Day 11 — scrollIntoView() container
// Detects real support for the `container: "nearest"` option with a tiny
// hidden probe (unknown dictionary members are silently ignored by
// non-supporting browsers, so a try/catch alone can't tell us anything —
// we have to actually measure whether an ancestor scroller moved).
// Wires up a nested-scroll-container carousel demo: the outer box scrolls
// vertically, the carousel scrolls horizontally, and a toggle switches
// between the old "scroll every ancestor" default and a "nearest ancestor
// only" behavior (native where supported, manual fallback otherwise).

function detectContainerNearestSupport() {
  const outer = document.createElement("div");
  Object.assign(outer.style, {
    position: "fixed",
    top: "-9999px",
    left: "-9999px",
    width: "40px",
    height: "40px",
    overflow: "auto",
    visibility: "hidden",
  });

  const spacerTop = document.createElement("div");
  spacerTop.style.height = "200px";

  const inner = document.createElement("div");
  Object.assign(inner.style, { width: "40px", height: "40px", overflow: "auto" });

  const target = document.createElement("div");
  Object.assign(target.style, { width: "10px", height: "10px" });

  inner.appendChild(target);

  const spacerBottom = document.createElement("div");
  spacerBottom.style.height = "200px";

  outer.append(spacerTop, inner, spacerBottom);
  document.body.appendChild(outer);

  let supported = false;
  try {
    target.scrollIntoView({ container: "nearest", behavior: "auto" });
    // If the option is honored, only `inner` (the nearest scroller) may
    // move — `outer` should stay put even though the default algorithm
    // would otherwise scroll it to bring `target`'s row into view.
    supported = outer.scrollTop === 0;
  } catch (e) {
    supported = false;
  }

  document.body.removeChild(outer);
  return supported;
}

function scrollWithinCarouselOnly(track, slide) {
  const targetLeft = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
  track.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const supportsContainerNearest = detectContainerNearestSupport();

  const status = document.querySelector("#support-status");
  if (status) {
    status.textContent = supportsContainerNearest
      ? "✅ Your browser supports scrollIntoView({ container: \"nearest\" }) natively."
      : "⏳ No native support detected — the \"nearest\" toggle uses a manual fallback that scrolls only the carousel.";
    status.classList.add(supportsContainerNearest ? "ok" : "nok");
  }

  const track = document.querySelector("#carousel-track");
  const outer = document.querySelector("#outer-scroller");
  const toggle = document.querySelector("#nearest-toggle");
  const thumbs = document.querySelectorAll(".thumb-btn");
  if (!track || !outer || !toggle || !thumbs.length) return;

  function setActiveThumb(index) {
    thumbs.forEach((thumb, i) => thumb.classList.toggle("is-active", i === index));
  }

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
      const slide = track.children[i];
      if (!slide) return;

      setActiveThumb(i);

      if (toggle.checked) {
        if (supportsContainerNearest) {
          slide.scrollIntoView({ container: "nearest", behavior: "smooth" });
        } else {
          scrollWithinCarouselOnly(track, slide);
        }
      } else {
        // The universally supported default: scrolls *every* ancestor
        // scroll container needed to bring the element into view —
        // including `outer`, which is what causes the visible jump.
        slide.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    });
  });
});
