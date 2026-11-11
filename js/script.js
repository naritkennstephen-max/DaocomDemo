"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  /* Nav: solid background after scrolling, mobile menu */
  const nav = $("nav");
  const menu = $("menu");
  const menuBtn = $("menuBtn");

  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  /* Hero: power on / off the PC photo */
  const powerBtn = $("powerBtn");
  const media = document.querySelector(".hero__media");
  const heroCap = $("heroCap");
  powerBtn.addEventListener("click", () => {
    const on = media.classList.toggle("is-on");
    powerBtn.textContent = on ? "Power off" : "Power on";
    powerBtn.setAttribute("aria-pressed", String(on));
    heroCap.textContent = on ? "Powered on. Cyan fans, RTX card, glass panel." : "Lights off. Press Power on.";
  });

  /* Lightbox */
  const lb = $("lightbox");
  const lbImg = $("lbImg");
  const lbCap = $("lbCap");
  const lbClose = $("lbClose");
  let lastFocus = null;

  const openLb = (btn) => {
    lastFocus = btn;
    lbImg.src = btn.dataset.full;
    lbImg.alt = btn.querySelector("img").alt;
    lbCap.textContent = btn.dataset.cap || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll(".shot").forEach((b) => b.addEventListener("click", () => openLb(b)));
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!lb.hidden) closeLb();
      else setMenu(false);
    }
  });

  /* Contact form (demo only, nothing is sent) */
  const form = $("form");
  const status = $("status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstBad = null;
    form.querySelectorAll("input, textarea").forEach((f) => {
      const empty = !f.value.trim();
      const badMail = f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value.trim());
      const bad = empty || badMail;
      f.setAttribute("aria-invalid", String(bad));
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) {
      status.textContent = firstBad.type === "email" ? "Enter a valid email address." : "Fill in every field.";
      firstBad.focus();
      return;
    }
    const name = form.elements.name.value.trim().split(" ")[0];
    status.textContent = "Thanks, " + name + ". This is a demo site, so your message was not sent.";
    form.reset();
  });

  /* Footer year */
  $("year").textContent = "© " + new Date().getFullYear() + " Dāo Computers (concept)";
});
