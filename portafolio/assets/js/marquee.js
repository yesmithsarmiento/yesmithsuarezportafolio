/* Carrusel continuo: duplica las tarjetas para que el bucle no tenga saltos */
(function () {
  document.querySelectorAll("[data-marquee]").forEach(function (marquee) {
    const track = marquee.querySelector("[data-marquee-track]");
    if (!track) return;
    Array.from(track.children).forEach(function (card) {
      const copia = card.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");   // las copias no se leen dos veces con lector de pantalla
      track.appendChild(copia);
    });
  });
})();
