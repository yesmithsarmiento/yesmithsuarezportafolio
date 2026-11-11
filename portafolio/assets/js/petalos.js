/* Pétalos de cerezo cayendo */
(function () {
  const caja = document.querySelector("[data-petalos]");
  if (!caja || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cantidad = window.innerWidth < 600 ? 16 : 32;   // cambia estos números para más o menos pétalos
  const rand = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement("span");
    const tam = rand(9, 20);
    p.className = "petalo";
    p.style.left = rand(0, 100) + "%";
    p.style.width = tam + "px";
    p.style.height = tam * 1.3 + "px";
    p.style.opacity = rand(0.55, 0.95).toFixed(2);
    // [caída, vaivén]: la caída es lenta y el vaivén más rápido
    p.style.animationDuration = rand(9, 19).toFixed(1) + "s, " + rand(2.5, 5.5).toFixed(1) + "s";
    p.style.animationDelay = (-rand(0, 19)).toFixed(1) + "s, " + (-rand(0, 5)).toFixed(1) + "s";
    caja.appendChild(p);
  }
})();
