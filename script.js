// AOS Inisialisasi
AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 120,
});

// Navbar ganti warna saat scroll
const navbar = document.getElementsByTagName("nav")[0];
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > 1) {
    navbar.classList.replace("bg-transparent", "nav-color");
  } else if (this.window.scrollY <= 0) {
    navbar.classList.replace("nav-color", "bg-transparent");
  }
});
// Scrollspy
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateNavLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update class "active" pada navbar
    navLinks.forEach((link) => {
      link.classList.remove("active-scroll");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active-scroll");
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
});
// Swiper
new Swiper(".portofolio-swiper", {
  loop: true,
  spaceBetween: 24,
  grabCursor: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// Pop Up dinamis untuk gambar certificate
const modal = new bootstrap.Modal(document.getElementById("sertifModal"));
const modalImg = document.getElementById("modalSertifImg");

document.querySelectorAll(".preview-sertif").forEach((img) => {
  img.addEventListener("click", function () {
    const imgSrc = this.getAttribute("data-img"); // ambil sumber gambar
    modalImg.src = imgSrc; // ganti isi gambar di modal
    modal.show(); // tampilkan modal
  });
});

// Animasi Ketik
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.querySelector(".typing-text");

  const roles = [
    "Junior Frontend Dev",
    "UI / UX Enthusiast",
    "Web Technology Learner",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  const typingSpeed = 85;
  const pauseAfterWord = 1600;
  const fadeDuration = 400;

  function startTyping() {
    const currentRole = roles[roleIndex];

    if (isTyping && charIndex <= currentRole.length) {
      textEl.textContent = currentRole.slice(0, charIndex);
      charIndex++;
      setTimeout(startTyping, typingSpeed);
    } else {
      // Pause setelah satu kata selesai
      setTimeout(() => {
        textEl.style.opacity = "0";

        setTimeout(() => {
          charIndex = 0;
          roleIndex = (roleIndex + 1) % roles.length;
          textEl.textContent = "";
          textEl.style.opacity = "1";
          startTyping();
        }, fadeDuration);
      }, pauseAfterWord);
    }
  }

  startTyping();
});

// sweetalert
const form = document.getElementById("my-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  // Popup langsung muncul (loading)
  Swal.fire({
    title: "Mengirim pesan...",
    text: "Mohon tunggu sebentar",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // Ganti popup jadi sukses
      Swal.fire({
        icon: "success",
        title: "Pesan terkirim!",
        text: "Terima kasih, saya akan segera menghubungi Anda.",
        confirmButtonColor: "#c88700",
      });

      form.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal mengirim",
        text: "Coba lagi nanti ya.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Terjadi kesalahan",
      text: "Tidak bisa mengirim pesan.",
    });
  }
});
