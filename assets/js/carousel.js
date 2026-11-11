'use strict';

// Carrusel de tarjetas: scroll con snap + flechas + puntos + avance automático
(function () {
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dotsBox = carousel.querySelector("[data-carousel-dots]");
    if (!track) return;

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots = [];
    let timer = null;

    const paso = function () {
      const slide = track.firstElementChild;
      if (!slide) return track.clientWidth;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slide.getBoundingClientRect().width + gap;
    };
    const maxScroll = function () { return track.scrollWidth - track.clientWidth; };
    const paginas = function () { return Math.max(1, Math.round(maxScroll() / paso()) + 1); };
    const actual = function () { return Math.min(paginas() - 1, Math.round(track.scrollLeft / paso())); };

    const irA = function (i) {
      track.scrollTo({ left: i * paso(), behavior: reducirMovimiento ? "auto" : "smooth" });
    };

    const pintarPuntos = function () {
      if (!dotsBox) return;
      const total = paginas();
      if (dots.length !== total) {
        dotsBox.innerHTML = "";
        dots = [];
        for (let i = 0; i < total; i++) {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "roles-dot";
          dot.tabIndex = -1;
          dot.addEventListener("click", function () { irA(i); reiniciar(); });
          dotsBox.appendChild(dot);
          dots.push(dot);
        }
      }
      const a = actual();
      dots.forEach(function (d, i) { d.classList.toggle("active", i === a); });
    };

    const siguiente = function () { irA(actual() >= paginas() - 1 ? 0 : actual() + 1); };
    const anterior = function () { irA(actual() <= 0 ? paginas() - 1 : actual() - 1); };

    // Avance automático (se detiene al pasar el mouse, tocar o enfocar)
    const parar = function () { clearInterval(timer); timer = null; };
    const iniciar = function () {
      if (reducirMovimiento || timer) return;
      timer = setInterval(siguiente, 5000);
    };
    const reiniciar = function () { parar(); iniciar(); };

    if (next) next.addEventListener("click", function () { siguiente(); reiniciar(); });
    if (prev) prev.addEventListener("click", function () { anterior(); reiniciar(); });

    track.addEventListener("scroll", pintarPuntos, { passive: true });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); siguiente(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); anterior(); }
    });
    ["mouseenter", "focusin", "touchstart"].forEach(function (ev) {
      carousel.addEventListener(ev, parar, { passive: true });
    });
    ["mouseleave", "focusout", "touchend"].forEach(function (ev) {
      carousel.addEventListener(ev, iniciar, { passive: true });
    });
    window.addEventListener("resize", pintarPuntos);

    pintarPuntos();
    iniciar();
  });
})();
