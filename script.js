const intro = document.getElementById("intro");
const booth = document.getElementById("booth");
const enterBtn = document.getElementById("enterBtn");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frameImg = document.getElementById("frame");
const countdown = document.getElementById("countdown");

const icons = ["⭐","🎸","🥁"];
let photos = [];

enterBtn.onclick = async () => {
  intro.style.display = "none";
  booth.hidden = false;
  const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"}});
  video.srcObject = stream;
};

document.querySelectorAll(".star").forEach(s=>{
  s.onclick = ()=> frameImg.src = "frames/" + s.dataset.frame;
});

async function wait(ms){return new Promise(r=>setTimeout(r,ms))}

async function takeStrip(){
  photos = [];
  for(let i=0;i<4;i++){
    countdown.textContent = icons[i%icons.length];
    await wait(1000);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video,0,0);
    photos.push(canvas.toDataURL("image/png"));
  }
  countdown.textContent = "";
  exportStrip();
}

function exportStrip(){
  const strip = document.createElement("canvas");
  strip.width = canvas.width;
  strip.height = canvas.height*4;
  const sctx = strip.getContext("2d");
  photos.forEach((p,i)=>{
    const img = new Image();
    img.onload=()=> sctx.drawImage(img,0,i*canvas.height);
    img.src=p;
  });
  const link = document.createElement("a");
  link.download="fangirl-strip.png";
  link.href = strip.toDataURL("image/png");
  link.click();
}

document.getElementById("snap").onclick = takeStrip;
