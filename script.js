// ====== BAGIAN YANG BOLEH KAMU GANTI ======
const namaPacar = "Sunday";
const namaKamu = "Drew";

const kataKetik = [// ======================================================
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

  "aku cuma mau bilang: kamu itu spesial.",
  "semoga kamu senyum waktu buka ini.",
  "jangan lupa buat bahagia.",
  "web kecil ini khusus buat kamu."
];
// ==========================================

document.querySelectorAll(".nama-pacar").forEach((el) => {
  el.textContent = namaPacar;
});

document.getElementById("namaKamuFooter").textContent = namaKamu;

const opening = document.getElementById("opening");
const content = document.getElementById("content");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", () => {
  opening.classList.add("hide");
  content.classList.remove("hidden");

  setTimeout(() => {
    opening.style.display = "none";
  }, 760);

  burstHearts(window.innerWidth / 2, window.innerHeight / 2, 18);
});

const typingText = document.getElementById("typingText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
  const word = kataKetik[wordIndex];

  if (deleting) {
    typingText.textContent = word.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = word.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = deleting ? 38 : 68;

  if (!deleting && charIndex === word.length) {
    speed = 1300;
    deleting = true;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % kataKetik.length;
    speed = 420;
  }

  setTimeout(typingEffect, speed);
}

typingEffect();

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.16 });

revealEls.forEach((el) => observer.observe(el));

const toast = document.getElementById("toast");
const kangenBtn = document.getElementById("kangenBtn");

kangenBtn.addEventListener("click", (event) => {
  toast.classList.add("show");
  burstHearts(event.clientX, event.clientY, 12);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

surpriseBtn.addEventListener("click", (event) => {
  surpriseText.classList.toggle("show");
  burstHearts(event.clientX, event.clientY, 16);
});

function burstHearts(x, y, total) {
  const hearts = ["💗", "💖", "💕", "🌷", "✨"];

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${x + (Math.random() * 120 - 60)}px`;
    heart.style.top = `${y + (Math.random() * 50 - 25)}px`;
    heart.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1400);
  }
}

// ====== PARTICLE BACKGROUND LOVE ======
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  makeParticles();
}

function makeParticles() {
  particles = [];
  const amount = Math.min(95, Math.floor((window.innerWidth * window.innerHeight) / 13000));

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 0.55,
      speedY: (Math.random() - 0.5) * 0.55,
      alpha: Math.random() * 0.5 + 0.25
    });
  }
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 18, size / 18);
  ctx.beginPath();
  ctx.moveTo(0, 6);
  ctx.bezierCurveTo(-14, -6, -8, -18, 0, -10);
  ctx.bezierCurveTo(8, -18, 14, -6, 0, 6);
  ctx.fillStyle = `rgba(255, 79, 143, ${alpha})`;
  ctx.fill();
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < -20 || p.x > canvas.width + 20) p.speedX *= -1;
    if (p.y < -20 || p.y > canvas.height + 20) p.speedY *= -1;

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        p.x -= dx / 80;
        p.y -= dy / 80;
      }
    }

    drawHeart(p.x, p.y, p.size * 4, p.alpha);
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 105) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255, 111, 174, ${0.18 * (1 - distance / 105)})`;
        ctx.lineWidth = 1;
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

window.addEventListener("resize", resize);

resize();
animateParticles();
