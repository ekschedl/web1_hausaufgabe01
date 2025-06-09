// === Swiper-Galerie nur aktivieren, wenn .mySwiper vorhanden ist ===
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    preloadImages: false,
  });

  // Autoplay pausieren bei Hover
  const swiperContainer = document.querySelector(".swiper");
  swiperContainer.addEventListener("mouseenter", () => {
    swiper.autoplay.stop();
  });
  swiperContainer.addEventListener("mouseleave", () => {
    swiper.autoplay.start();
  });
}

// === Funktion zum Laden von Dessert-Bild nur auf index.html ausführen ===
if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/" // für root (z. B. localhost)
) {
  async function ladeDessertBild() {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/random?query=dessert&client_id=sxkQE1DxzX5T0WPsF7v3LUjMDBdsajqJLrgXflhsW80"
      );
      const bild = await response.json();

      if (bild && bild.urls && bild.urls.regular) {
        const altText = bild.alt_description
          ? bild.alt_description.charAt(0).toUpperCase() +
            bild.alt_description.slice(1)
          : "Überraschung aus der Vitrine";

        document.getElementById("dessert-img").src = bild.urls.small;
        document.getElementById("dessert-img").alt =
          bild.alt_description || "Foto eines Desserts";
        document.getElementById("dessert-name").textContent = altText;
        document.getElementById("dessert-beschreibung").textContent =
          "Frisch serviert für deinen Kaffeegenuss.";
        document.getElementById(
          "bild-credit"
        ).innerHTML = `Foto von <a href="${bild.user.links.html}?utm_source=deinprojekt&utm_medium=referral" target="_blank">${bild.user.name}</a> auf <a href="https://unsplash.com" target="_blank">Unsplash</a>`;
      } else {
        throw new Error("Ungültige Antwort");
      }
    } catch (error) {
      // Fallback bei Fehler
      console.error("Fehler beim Laden:", error);
      const dessertImg = document.getElementById("dessert-img");
      const dessertName = document.getElementById("dessert-name");
      const dessertBeschreibung = document.getElementById(
        "dessert-beschreibung"
      );
      const bildCredit = document.getElementById("bild-credit");

      if (dessertImg) {
        dessertImg.src = "src/fallback-dessert.jpg";
        dessertImg.alt = "Hausgemachtes Dessert";
      }
      if (dessertName) dessertName.textContent = "Kuchen der Saison";
      if (dessertBeschreibung)
        dessertBeschreibung.textContent =
          "Mit Liebe gebacken – direkt aus unserer Küche.";
      if (bildCredit) bildCredit.textContent = "Foto: MOKKA-Team";
    }
  }

  ladeDessertBild();
}

// === Mobilmenü ===
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}
