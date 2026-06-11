// ======================================================
// EDIT DI SINI AJA DULU, BAGIAN LAIN NGGAK USAH DISENTUH
// ======================================================

const namaDia = "Ravi";

// Pesan pribadi dari kamu.
// Mau paste pesan panjang juga boleh.
// Satu paragraf = satu baris di dalam tanda kutip.
const pesanPribadi = [
  "Rav, gua nggak tau hari ini lu lagi berat atau biasa aja. Tapi gua cuma mau bilang, gua bangga sama cara lu terus jalan meskipun mungkin capeknya nggak selalu keliatan.",
  "Gua seneng lu hadir di hidup gua. Bukan karena lu harus jadi siapa-siapa, tapi karena ada lu aja udah bikin banyak hal terasa lebih hangat.",
  "Kalau suatu hari lu mikir lu nggak deserve to be loved, please inget halaman ini. Menurut gua, lu pantas disayang dengan tenang, bukan cuma saat lu kuat atau saat semuanya baik-baik aja.",
  "I like you as you are, Ravi. Not as a version that needs to prove something first."
];

// Foto gallery.
// Cara pakai:
// 1. Masukkan foto ke folder assets.
// 2. Ganti src kosong menjadi nama file foto.
// Contoh: src: "assets/foto1.jpg"
const fotoGallery = [
  {
    src: "",
    caption: "foto pertama yang mau lu taruh di sini"
  },
  {
    src: "",
    caption: "momen kecil yang rasanya worth remembering"
  },
  {
    src: "",
    caption: "maybe one day: Bali, us, and a slow afternoon"
  }
];

// ======================================================
// KODE DI BAWAH INI NGGAK PERLU DIUBAH
// ======================================================

const pages = Array.from(document.querySelectorAll(".page"));
const progressFill = document.getElementById("progressFill");
const dotsContainer = document.getElementById("dots");
const pageMiniTitle = document.getElementById("pageMiniTitle");
const messageList = document.getElementById("messageList");
const gallery = document.getElementById("gallery");
const toast = document.getElementById("toast");

let currentPage = 0;

const pageNames = [
  "for ravi",
  "hardworker note",
  "soft reminder",
  "little things",
  "tiny gallery",
  "bali someday",
  "pesan dari gua",
  "last page"
];

function makeDots() {
  pages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `buka halaman ${index + 1}`);
    dot.addEventListener("click", () => showPage(index));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(document.querySelectorAll(".dot"));
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });
}

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  pages[currentPage].classList.remove("active");
  currentPage = index;
  pages[currentPage].classList.add("active");

  progressFill.style.width = `${((currentPage + 1) / pages.length) * 100}%`;
  pageMiniTitle.textContent = pageNames[currentPage] || "for ravi";

  updateDots();
  burstPieces(window.innerWidth / 2, window.innerHeight - 90, 9);
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage + 1));
});

document.querySelectorAll("[data-prev]").forEach((button) => {
  button.addEventListener("click", () => showPage(currentPage - 1));
});

document.querySelectorAll("[data-restart]").forEach((button) => {
  button.addEventListener("click", () => showPage(0));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showPage(currentPage + 1);
  if (event.key === "ArrowLeft") showPage(currentPage - 1);
});

makeDots();
showPage(0);

pesanPribadi.forEach((isiPesan) => {
  const p = document.createElement("p");
  p.textContent = isiPesan;
  messageList.appendChild(p);
});

fotoGallery.forEach((item, index) => {
  const frame = document.createElement("div");
  frame.className = "frame";

  const imageBox = document.createElement("div");
  imageBox.className = "frame-image";

  if (item.src && item.src.trim() !== "") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || `foto ${index + 1}`;
    imageBox.appendChild(img);
  } else {
    imageBox.textContent = `taruh foto ${index + 1} di sini`;
  }

  const caption = document.createElement("p");
  caption.textContent = item.caption;

  frame.appendChild(imageBox);
  frame.appendChild(caption);
  gallery.appendChild(frame);
});

document.getElementById("hugBtn").addEventListener("click", (event) => {
  toast.classList.add("show");
  burstPieces(event.clientX, event.clientY, 22);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2300);
});

function burstPieces(x, y, total) {
  const pieces = ["♡", "✦", "✿", "✨", "🫧", "☁️", "🌷"];

  for (let i = 0; i < total; i++) {
    const piece = document.createElement("div");
    piece.className = "float-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${x + Math.random() * 150 - 75}px`;
    piece.style.top = `${y + Math.random() * 55 - 25}px`;
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 1500);
  }
}

// ======================================================
// PARTICLES LUCU: BINTANG, BUBBLE, HEART KECIL
// ======================================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
  x: null,
  y: null
};

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

function createParticles() {
  particles = [];
  const total = Math.min(115, Math.floor((window.innerWidth * window.innerHeight) / 11000));
  const shapes = ["circle", "star", "heart"];

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 3,
      dx: (Math.random() - 0.5) * 0.45,
      dy: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.42 + 0.25,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    });
  }
}

function drawCircle(p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255, 143, 189, ${p.alpha * 0.45})`;
  ctx.stroke();
}

function drawStar(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(Date.now() / 1800);
  ctx.beginPath();

  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? p.size : p.size / 2.4;
    const angle = (Math.PI * 2 * i) / 10;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fillStyle = `rgba(255, 234, 167, ${p.alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawHeart(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.scale(p.size / 18, p.size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-14, -5, -8, -17, 0, -9);
  ctx.bezierCurveTo(8, -17, 14, -5, 0, 6);
  ctx.fillStyle = `rgba(255, 143, 189, ${p.alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawParticle(p) {
  if (p.shape === "circle") drawCircle(p);
  if (p.shape === "star") drawStar(p);
  if (p.shape === "heart") drawHeart(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < -30 || p.x > canvas.width + 30) p.dx *= -1;
    if (p.y < -30 || p.y > canvas.height + 30) p.dy *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 115) {
        p.x -= dx / 95;
        p.y -= dy / 95;
      }
    }

    drawParticle(p);
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 95) {
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.strokeStyle = `rgba(255, 143, 189, ${0.13 * (1 - distance / 95)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateParticles();
