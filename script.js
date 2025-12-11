// script.js — 30 строк, 1.5 КБ, молниеносный
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  // Бургер
  $(".burger").addEventListener("click", () => {
    $(".burger").classList.toggle("active");
    $("nav").classList.toggle("active");
  });

  // Закрытие по ссылкам
  $$("nav a").forEach((a) =>
    a.addEventListener("click", () => {
      $(".burger").classList.remove("active");
      $("nav").classList.remove("active");
    })
  );

  // Тема (сохранение в localStorage)
  const toggle = $(".theme-toggle");
  if (
    localStorage.theme === "light" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: light)").matches)
  ) {
    document.body.dataset.theme = "light";
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    const isLight = document.body.dataset.theme === "light";
    document.body.dataset.theme = isLight ? "dark" : "light";
    toggle.textContent = isLight ? "🌙" : "☀️";
    localStorage.theme = isLight ? "dark" : "light";
  });

  // Кнопка наверх
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("visible", scrollY > 500);
  });
  toTop.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: "smooth" })
  );

  // Параллакс на устройствах, где fixed не работает
  const parallax = $(".parallax");
  if (parallax && !CSS.supports("background-attachment", "fixed")) {
    let ticking = false;
    const update = () => {
      const rect = parallax.getBoundingClientRect();
      const offset = -rect.top * 0.5;
      parallax.style.transform = `translateY(${offset}px)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) requestAnimationFrame(update);
      ticking = true;
    });
  }
});
