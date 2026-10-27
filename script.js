document.body.classList.add("has-js");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");
const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
  console.warn("Could not read the saved theme preference.", error);
}
if (savedTheme !== "light" && savedTheme !== "dark") savedTheme = null;
const setTheme = (theme, save = false) => {
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  themeLabel.textContent = `${theme === "dark" ? "Light" : "Dark"} mode`;
  themeIcon.textContent = theme === "dark" ? "☼" : "☾";
  if (save) {
    savedTheme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
    }
  }
};
setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : darkModePreference.matches ? "dark" : "light");
themeToggle.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark", true));
darkModePreference.addEventListener("change", ({ matches }) => {
  if (!savedTheme) setTheme(matches ? "dark" : "light");
});
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
};
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isExpanded));
  siteNav.classList.toggle("is-open", isExpanded);
});
siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 767px)").matches) closeMenu();
}));
window.matchMedia("(min-width: 768px)").addEventListener("change", ({ matches }) => {
  if (matches) closeMenu();
});
