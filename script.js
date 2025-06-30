const audio = document.getElementById("backgroundMusic");
audio.loop = true;
audio.volume = 0.7;

function scrollToContent() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) loadingScreen.style.display = "none";

  const sampul = document.getElementById("sampul");
  const isi = document.getElementById("isi-undangan");

  // Tambahkan animasi slide up
  sampul.classList.add("sampul-slide-up");

  // Setelah animasi selesai, baru munculkan isi
  setTimeout(() => {
    sampul.style.display = "none";
    isi.style.display = "block";
    isi.classList.add("fadeIn");

    document.getElementById("audio-toggle").style.display = "block";
    document.getElementById("beranda").scrollIntoView({ behavior: "smooth" });
    document.body.classList.remove("noscroll");
    audio.play().catch(e => console.log("Autoplay ditolak:", e));
  }, 800); // waktu sesuai durasi animasi
}

window.addEventListener("load", () => {
  document.getElementById("loading-screen").style.display = "none";
});

function toggleAudio(btn) {
  if (audio.paused) {
    audio.play();
    btn.innerHTML = "🔊";
    btn.setAttribute("aria-label", "Musik aktif");
  } else {
    audio.pause();
    btn.innerHTML = "🔇";
    btn.setAttribute("aria-label", "Musik nonaktif");
  }
}

// Countdown ke 17 Agustus 2025 pukul 08.00 WIB
const countdownDate = new Date("Aug 17, 2025 08:00:00").getTime();
const countdownEl = document.getElementById("countdown");

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;

  if (distance < 0) {
    clearInterval(x);
    countdownEl.innerHTML = "Hari ini adalah hari pernikahan!";
  }
}, 1000);

// RSVP ke WhatsApp
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const kehadiran = document.getElementById("kehadiran").value;
  const nomorWA = "6281299427944"; // Ganti dengan nomor WA kamu
  const pesan = `Halo, saya *${nama}* ingin mengkonfirmasi bahwa saya *${kehadiran}* menghadiri acara pernikahan Bagas & Arum.`;
  const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  window.open(url, "_blank");
});

// Ambil nama dari URL path
const path = window.location.pathname.split("/").filter(Boolean);
let namaTamu = "";
const last = path[path.length - 1];
if (last && !last.endsWith(".html")) {
  namaTamu = decodeURIComponent(last);
}
const spanNama = document.getElementById("namaTamu");
if (spanNama) {
  spanNama.textContent = namaTamu || "Tamu";
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fadeIn');
  });
});
document.querySelectorAll('.section').forEach(el => observer.observe(el));

function copyRekening(id) {
  const rekening = document.getElementById(id).innerText;
  navigator.clipboard.writeText(rekening).then(() => {
    showToast("Nomor rekening berhasil disalin!");
  }).catch(err => {
    showToast("Gagal menyalin nomor.");
  });
}

function showToast(pesan) {
  const toast = document.getElementById("toast");
  toast.textContent = pesan;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Toast hilang dalam 3 detik
}

function toggleGift() {
  const giftSection = document.getElementById("gift-content");
  const button = document.querySelector(".gift-toggle-button");

  if (giftSection.style.display === "none" || giftSection.style.display === "") {
    giftSection.style.display = "block";
    button.textContent = "💝 Sembunyikan Info Wedding Gift";
  } else {
    giftSection.style.display = "none";
    button.textContent = "💝 Lihat Info Wedding Gift";
  }
}

// Ambil parameter dari URL
function getNamaDariURL() {
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("to");
  const spanNama = document.getElementById("namaTamu");
  if (spanNama) {
    spanNama.textContent = nama ? decodeURIComponent(nama) : "Tamu";
  }
}

// Jalankan setelah halaman dimuat
window.addEventListener("DOMContentLoaded", getNamaDariURL);
