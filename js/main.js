/* 1on1 小林レッスン塾 — 確認用の試作。送信・申し込みは動かさず、お知らせだけ出す。 */
(function () {
  "use strict";

  var MOCK_MESSAGE = "確認用の試作のため、まだ送信できません";

  /* メニュー（スマホ・タブレット） */
  var header = document.querySelector(".site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");

  if (header && menuBtn && nav) {
    var label = menuBtn.querySelector(".menu-label");
    var setOpen = function (open) {
      header.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (label) label.textContent = open ? "CLOSE" : "MENU";
    };
    menuBtn.addEventListener("click", function () {
      setOpen(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        menuBtn.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (header.classList.contains("is-open") && !header.contains(event.target)) setOpen(false);
    });
  }

  /* 確認用のお知らせ */
  var toast = document.querySelector(".toast");
  var timer = 0;
  var showToast = function () {
    if (!toast) return;
    toast.textContent = "";
    window.requestAnimationFrame(function () {
      toast.textContent = MOCK_MESSAGE;
      toast.classList.add("is-visible");
    });
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2800);
  };

  Array.prototype.forEach.call(document.querySelectorAll("[data-mock]"), function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      showToast();
    });
  });

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      showToast();
    });
  }

  /* 「〜について問い合わせる」から来たら、内容の欄を先に選んでおく */
  var topic = document.getElementById("f-topic");
  Array.prototype.forEach.call(document.querySelectorAll("[data-topic]"), function (link) {
    link.addEventListener("click", function () {
      if (topic) topic.value = link.getAttribute("data-topic");
    });
  });
})();
