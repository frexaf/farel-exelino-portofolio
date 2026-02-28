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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active-scroll");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active-scroll");
            }
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px", // aktif saat section di tengah viewport
    },
  );

  sections.forEach((section) => observer.observe(section));
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
    const imgSrc = this.getAttribute("data-img");
    modalImg.src = imgSrc;
    modal.show();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.querySelector(".info-home h2");
  const words = ["Junior Frontend Dev", "UI/UX Designer", "Web Enthusiast"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, typingSpeed / 2);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, 1000);
    }
  }

  // Mulai animasi
  type();
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
        confirmButtonColor: "rgba(255, 179, 0, 0.75)",
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
