const startDate = new Date("2025-04-13");

/* NAV */
function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ================= COUNTDOWN + LOVE STATS ================= */

function updateTime(){

  const now = new Date();

  let diff = now - startDate;

  let days = Math.floor(diff / (1000*60*60*24));
  let weeks = Math.floor(days / 7);
  let months = Math.floor(days / 30.44);
  let years = Math.floor(days / 365);

  document.getElementById("timeBox").innerHTML = `
    <b>${days}</b> Tage ❤️<br>
    <b>${weeks}</b> Wochen 💞<br>
    <b>${months}</b> Monate 🌸<br>
    <b>${years}</b> Jahr/e 💍
  `;

  /* next anniversary logic */
  let year = now.getFullYear();
  let nextAnniv = new Date(year, 3, 13);

  if(now > nextAnniv){
    nextAnniv = new Date(year+1, 3, 13);
  }

  let diff2 = nextAnniv - now;
  let daysLeft = Math.floor(diff2 / (1000*60*60*24));

  document.getElementById("loveText").innerHTML =
    "💖 Nächster Jahrestag in <b>" + daysLeft + "</b> Tagen";
}

setInterval(updateTime, 1000);
updateTime();

/* ================= REAL BOOK ================= */

let currentPage = 0;
const pages = document.querySelectorAll(".pageBook");

function updateBook(){
  pages.forEach((p,i)=>{
    p.classList.remove("activePage");
    p.style.transform = "rotateY(180deg)";
  });

  const active = pages[currentPage];
  active.classList.add("activePage");
  active.style.transform = "rotateY(0deg)";
}

function nextPage(){
  if(currentPage < pages.length - 1){
    currentPage++;
    updateBook();
  }
}

function prevPage(){
  if(currentPage > 0){
    currentPage--;
    updateBook();
  }
}
function goToPage(page) {
  if (page >= 0 && page < pages.length) {
    currentPage = page;
    updateBook();
  }
}
updateBook();

/* ================= FALLING HEARTS ================= */

const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart(){
  hearts.push({
    x: Math.random()*canvas.width,
    y: -10,
    s: Math.random()*2+1
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#ff4d6d";

  hearts.forEach(h=>{
    h.y += h.s;
    ctx.font = "20px serif";
    ctx.fillText("❤️",h.x,h.y);
  });

  hearts = hearts.filter(h=>h.y < canvas.height);
  requestAnimationFrame(draw);
}

setInterval(createHeart, 300);
draw();