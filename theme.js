"use strict";
/* Manual dark/light toggle, shared by index.html and how.html. Loaded
   synchronously at the top of <head> so the right theme applies before
   first paint. Falls back to the system prefers-color-scheme when the
   visitor hasn't picked a theme explicitly. */
(function () {
  const STORAGE_KEY = "b2b-theme";

  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* storage unavailable (private browsing, etc.). fall back to system preference */
  }

  function apply(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  apply(stored);

  function effectiveTheme() {
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function wireToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function updateButton() {
      const eff = effectiveTheme();
      btn.textContent = eff === "dark" ? "☀️ Light" : "🌙 Dark";
      btn.setAttribute("aria-label", eff === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    btn.addEventListener("click", () => {
      stored = effectiveTheme() === "dark" ? "light" : "dark";
      apply(stored);
      try {
        localStorage.setItem(STORAGE_KEY, stored);
      } catch (e) {
        /* ignore. theme just won't persist across reloads */
      }
      updateButton();
    });

    updateButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireToggle);
  } else {
    wireToggle();
  }
})();
