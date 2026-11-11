/* Estrellas brillantes flotando de fondo */
(function () {
  const caja = document.querySelector("[data-estrellas]");
  if (!caja || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cantidad = window.innerWidth < 600 ? 8 : 16;   // cambia estos números para más o menos estrellas
  const rand = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < cantidad; i++) {
    const e = document.createElement("span");
    const tam = rand(40, 130);
    e.className = "estrella";
    e.style.left = rand(0, 96) + "%";
    e.style.top = rand(0, 96) + "%";
    e.style.width = e.style.height = tam + "px";
    e.style.setProperty("--dx", rand(-50, 50).toFixed(0) + "px");
    e.style.setProperty("--dy", rand(-60, 60).toFixed(0) + "px");
    // [deriva lenta, titileo]
    e.style.animationDuration = rand(8, 16).toFixed(1) + "s, " + rand(2.5, 5).toFixed(1) + "s";
    e.style.animationDelay = (-rand(0, 12)).toFixed(1) + "s, " + (-rand(0, 5)).toFixed(1) + "s";
    caja.appendChild(e);
  }
})();
