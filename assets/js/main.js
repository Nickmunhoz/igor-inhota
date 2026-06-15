/* ===================================================================
   IGOR INHOTA — Interações
   =================================================================== */
(function () {
  "use strict";

  /* --- 1. Navegação: estado ao rolar --------------------------------- */
  const nav = document.querySelector("[data-nav]");
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- 2. Menu mobile ------------------------------------------------- */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("menu");

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  };

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar num link
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // Fecha ao apertar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* --- 3. Text reveal: divide o título em palavras (máscara) ---------- */
  document.querySelectorAll("[data-reveal-text]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    el.classList.add("tr");
    words.forEach((w, i) => {
      const outer = document.createElement("span");
      outer.className = "tr-word";
      const inner = document.createElement("span");
      inner.textContent = w;
      inner.style.transitionDelay = (i * 0.06).toFixed(2) + "s";
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  });

  /* --- 3b. Reveal on scroll — fade in/out bidirecional --------------- */
  const revealEls = document.querySelectorAll(".reveal, .tr");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- 4. Contadores animados (Seção 2) ------------------------------ */
  const counters = document.querySelectorAll("[data-count]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const formatVal = (el, value) => {
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const num = value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return prefix + num + suffix;
  };

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1700;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatVal(el, target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = formatVal(el, target);
    };
    requestAnimationFrame(step);
  };

  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    counters.forEach((el) => (el.textContent = formatVal(el, 0)));
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => co.observe(el));
  }

  /* --- 5. Imagens: fallback elegante se ainda não foram adicionadas --- */
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      img.parentElement.classList.add("img-missing");
    });
  });

  /* --- 6. Parallax sutil nas luzes de fundo (glows) ------------------- */
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length && !reduceMotion) {
    let ticking = false;
    const updateParallax = () => {
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0;
        const host = el.parentElement;
        const rect = host.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = "translate3d(0," + (offset * speed).toFixed(1) + "px,0)";
      });
      ticking = false;
    };
    const onParallaxScroll = () => {
      if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
    };
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    window.addEventListener("resize", onParallaxScroll, { passive: true });
    updateParallax();
  }

  /* --- 7. FAQ accordion (abre um, fecha os demais) ------------------- */
  document.querySelectorAll(".faq-item__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const willOpen = !item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        openItem.classList.remove("is-open");
        const b = openItem.querySelector(".faq-item__q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --- 8. Ano automático no rodapé ----------------------------------- */
  const yearEl = document.getElementById("ano");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
