// ======================================================
// EDIT DI SINI AJA DULU
// ======================================================

const namaDia = "Ravi";

// Pesan pribadi.
// Satu paragraf = satu tanda kutip.
const pesanPribadi = [
  "Pi, i'm not always fluent in tenderness, but here's the simplest truth i know: i care for you deeply, quietly, and more honestly than i know how to say.",
  "Gua seneng tiap kali lu hadir, bahkan dalam hal-hal kecil. Cara lu ngobrol, cara lu becanda, cara lu buat jadi diri lu sendiri — itu semua berarti buat gua.",
  "Gua harap lu selalu pilih diri lu dulu. Jangan ngejar sesuatu yang bikin lu terus nebak-nebak posisi lu di hidup seseorang.",
  "You deserve a love that feels certain, not a door left half-open only when someone feels lonely.",
  "Sekali lagi, choose the kind of love that doesn't leave you questioning your place in someone's heart.",
  "Gua bilang gini bukan buat ngatur lu. Gua bilang gini karena gua peduli sama lu, dan gua pengen lu dapet sayang yang nggak bikin lu merasa kecil."
];

// Memory section.
// Taruh foto di folder assets, lalu isi src.
// Contoh: src: "assets/foto1.jpg"
const fotoGallery = [
  {
    src: "assets/9066977841_87333876992724_1779554138246.png",
    label: "little frame",
    caption: "gua disini seneng banget, karena finally kita main lagi, kita main map lain. makasih yaa pi, udah luangin waktu lu buat main bareng gua."
  },
  {
    src: "assets/9066977841_113833408422260_1780085220419.png",
    label: "soft memory",
    caption: "ini juga random banget, tapi waktu nguli itu gua beneran kaya lu bawa ke versi diri lu yang gak pernah gua liat sebelumnya, lucu lu wkwk."
  },
  {
    src: "",
    label: "someday file",
    caption: "foto yang suatu hari mungkin jadi bagian dari cerita Bali"
  }
];

// ======================================================
// KODE DI BAWAH INI NGGAK PERLU DIUBAH
// ======================================================

const messageBoard = document.getElementById("messageBoard");
const memoryGrid = document.getElementById("memoryGrid");
const toast = document.getElementById("toast");
const scrollProgress = document.getElementById("scrollProgress");

pesanPribadi.forEach((pesan, index) => {
  const note = document.createElement("article");
  note.className = "message-note reveal";
  note.dataset.label = `note ${String(index + 1).padStart(2, "0")}`;

  const p = document.createElement("p");
  p.textContent = pesan;

  note.appendChild(p);
  messageBoard.appendChild(note);
});

fotoGallery.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "memory-card reveal";

  const imageBox = document.createElement("div");
  imageBox.className = "memory-image";

  if (item.src && item.src.trim() !== "") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption || `foto ${index + 1}`;
    imageBox.appendChild(img);
  } else {
    imageBox.textContent = `foto ${index + 1}`;
  }

  const textBox = document.createElement("div");
  textBox.className = "memory-text";

  const label = document.createElement("span");
  label.textContent = item.label || `memory ${index + 1}`;

  const caption = document.createElement("p");
  caption.textContent = item.caption || "";

  textBox.appendChild(label);
  textBox.appendChild(caption);

  card.appendChild(imageBox);
  card.appendChild(textBox);
  memoryGrid.appendChild(card);
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.16
});

revealItems.forEach((item) => observer.observe(item));

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function burstPieces(x, y, total = 18) {
  const pieces = ["♡", "✦", "✿", "☾", "✨", "☁️"];

  for (let i = 0; i < total; i++) {
    const piece = document.createElement("div");
    piece.className = "float-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = `${x + Math.random() * 140 - 70}px`;
    piece.style.top = `${y + Math.random() * 50 - 25}px`;
    piece.style.animationDelay = `${Math.random() * 0.22}s`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 1400);
  }
}

document.getElementById("hugBtn").addEventListener("click", (event) => {
  showToast();
  burstPieces(event.clientX, event.clientY, 24);
});

document.getElementById("tinyHugBtn").addEventListener("click", (event) => {
  showToast();
  burstPieces(event.clientX, event.clientY, 16);
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
});

// ======================================================
// PARTICLES
// ======================================================

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

function createParticles() {
  particles = [];
  const total = Math.min(115, Math.floor((window.innerWidth * window.innerHeight) / 11200));
  const shapes = ["dot", "star", "heart", "moon"];

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2.1,
      dx: (Math.random() - 0.5) * 0.38,
      dy: (Math.random() - 0.5) * 0.38,
      alpha: Math.random() * 0.38 + 0.22,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    });
  }
}

function drawDot(p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 248, 241, ${p.alpha})`;
  ctx.fill();
}

function drawStar(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(Date.now() / 2200);
  ctx.beginPath();

  for (let i = 0; i < 8; i++) {
    const radius = i % 2 === 0 ? p.size * 1.3 : p.size / 2.3;
    const angle = (Math.PI * 2 * i) / 8;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fillStyle = `rgba(255, 231, 176, ${p.alpha})`;
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
  ctx.fillStyle = `rgba(255, 157, 191, ${p.alpha})`;
  ctx.fill();
  ctx.restore();
}

function drawMoon(p) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.size * 1.25, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 231, 176, ${p.alpha})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(p.x + p.size * 0.52, p.y - p.size * 0.15, p.size * 1.25, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(25, 24, 39, 0.96)";
  ctx.fill();
  ctx.restore();
}

function drawParticle(p) {
  if (p.shape === "dot") drawDot(p);
  if (p.shape === "star") drawStar(p);
  if (p.shape === "heart") drawHeart(p);
  if (p.shape === "moon") drawMoon(p);
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

      if (distance < 120) {
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

      if (distance < 96) {
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.strokeStyle = `rgba(255, 157, 191, ${0.11 * (1 - distance / 96)})`;
        ctx.lineWidth = 0.75;
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
