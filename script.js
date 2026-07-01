(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Nav scroll state ---------- */
  var nav = document.querySelector("[data-nav]");
  function updateNavScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  updateNavScroll();
  window.addEventListener("scroll", updateNavScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var menuBack = document.querySelector("[data-menu-back]");

  function openMenu() {
    if (!mobileMenu || !menuBack) return;
    mobileMenu.classList.add("is-open");
    menuBack.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!mobileMenu || !menuBack) return;
    mobileMenu.classList.remove("is-open");
    menuBack.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (menuBack) menuBack.addEventListener("click", closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---------- Modal (kennismaking) ---------- */
  var modalBack = document.querySelector("[data-modal]");
  var modalOpeners = document.querySelectorAll("[data-open-modal]");
  var modalClosers = document.querySelectorAll("[data-modal-close]");

  function openModal(e) {
    if (e) e.preventDefault();
    if (!modalBack) return;
    closeMenu();
    modalBack.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modalBack) return;
    modalBack.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  modalOpeners.forEach(function (btn) { btn.addEventListener("click", openModal); });
  modalClosers.forEach(function (btn) { btn.addEventListener("click", closeModal); });
  if (modalBack) {
    modalBack.addEventListener("click", function (e) {
      if (e.target === modalBack) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeModal(); closeMenu(); }
  });

  /* ---------- Contact form ---------- */
  var form = document.querySelector("[data-form]");
  var toast = document.querySelector(".toast");
  var toastTimer = null;

  function showToast() {
    if (!toast) return;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 4200);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      closeModal();
      form.reset();
      showToast();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-img");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      item.closest(".faq-list").querySelectorAll(".faq-item").forEach(function (i) {
        i.classList.remove("is-open");
      });
      if (!wasOpen) item.classList.add("is-open");
    });
  });
})();
