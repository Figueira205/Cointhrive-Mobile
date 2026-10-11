(function () {
  var doc = document, body = doc.body;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Arranque: las animaciones del hero esperan a que carguen las fuentes */
  var fonts = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(function (r) { setTimeout(r, 1500); })])
    .then(function () { body.classList.remove("is-loading"); });

  /* Titulares: cada palabra sube desde una máscara */
  doc.querySelectorAll("[data-split]").forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.textContent = "";
    words.forEach(function (word, i) {
      var w = doc.createElement("span"); w.className = "wd"; w.setAttribute("aria-hidden", "true");
      var s = doc.createElement("span"); s.textContent = word; s.style.setProperty("--i", i);
      w.appendChild(s); el.appendChild(w); el.appendChild(doc.createTextNode(" "));
    });
  });

  /* Revelado al entrar en pantalla + contador de precios */
  function countUp(el) {
    var end = +el.dataset.count, t0 = null, dur = 1100;
    if (reduce) { el.textContent = end; return; }
    (function step(t) {
      t0 = t0 || t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
  doc.querySelectorAll(".rv:not(.hero .rv), .know__title").forEach(function (el) { io.observe(el); });

  /* Barra de navegación: cristal al salir de lo más alto */
  var nav = doc.getElementById("nav");
  var sentinel = doc.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;left:0;height:60px;width:1px;pointer-events:none";
  body.prepend(sentinel);
  new IntersectionObserver(function (e) { nav.classList.toggle("is-solid", !e[0].isIntersecting); }).observe(sentinel);

  if (reduce || !fine) return;

  /* Botones magnéticos */
  doc.querySelectorAll("[data-magnetic]").forEach(function (btn) {
    var raf = 0;
    btn.addEventListener("pointermove", function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.28, y = (e.clientY - r.top - r.height / 2) * 0.4;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { btn.style.setProperty("--bx", x + "px"); btn.style.setProperty("--by", y + "px"); });
    });
    btn.addEventListener("pointerleave", function () {
      cancelAnimationFrame(raf);
      btn.style.setProperty("--bx", "0px"); btn.style.setProperty("--by", "0px");
    });
  });

  /* Inclinación 3D suave de la foto del hero */
  var visual = doc.querySelector(".hero__visual"), photo = doc.getElementById("tilt");
  if (visual && photo) {
    var raf2 = 0;
    visual.addEventListener("pointermove", function (e) {
      var r = visual.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf2);
      raf2 = requestAnimationFrame(function () { photo.style.setProperty("--ry", px * 9 + "deg"); photo.style.setProperty("--rx", -py * 9 + "deg"); });
    });
    visual.addEventListener("pointerleave", function () { photo.style.setProperty("--ry", "0deg"); photo.style.setProperty("--rx", "0deg"); });
  }
})();
