// CSS Wrapped 2025 — shared site script
// Global dark/light theme switch: injected on every page, persisted
// across visits, and animated with a circular View Transitions reveal
// (with a plain-fade fallback for browsers that don't support it).

(() => {
  const STORAGE_KEY = "css-wrapped-theme";
  const root = document.documentElement;

  const ICON_SUN =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4"></circle>' +
    '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>' +
    "</svg>";

  const ICON_MOON =
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z"></path>' +
    "</svg>";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  }

  function preferredTheme() {
    const stored = getStoredTheme();
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-checked", String(theme === "light"));
      toggle.setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  function buildToggle() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.setAttribute("role", "switch");
    button.innerHTML =
      '<span class="theme-toggle__track">' +
      '<span class="theme-toggle__stars"></span>' +
      '<span class="theme-toggle__thumb">' +
      ICON_SUN +
      ICON_MOON +
      "</span>" +
      "</span>";
    return button;
  }

  function toggleTheme(event) {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";

    const toggle = event.currentTarget;
    const rect = toggle.getBoundingClientRect();
    root.style.setProperty("--theme-toggle-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--theme-toggle-y", `${rect.top + rect.height / 2}px`);

    const commit = () => {
      applyTheme(next);
      storeTheme(next);
    };

    const supportsViewTransitions =
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (supportsViewTransitions) {
      document.startViewTransition(commit);
    } else {
      commit();
    }
  }

  function mountThemeToggle() {
    if (document.querySelector(".theme-toggle")) return;
    const toggle = buildToggle();
    toggle.addEventListener("click", toggleTheme);
    document.body.appendChild(toggle);
    applyTheme(root.getAttribute("data-theme") || preferredTheme());
  }

  // Apply the theme before first paint to avoid a flash of the wrong theme.
  applyTheme(preferredTheme());

  document.addEventListener("DOMContentLoaded", () => {
    mountThemeToggle();
    console.log("CSS Wrapped 2025 loaded");
  });

  // Follow the OS setting live, unless the visitor picked a theme explicitly.
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (event) => {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? "light" : "dark");
    });
})();
