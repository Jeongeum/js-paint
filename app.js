const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const ClearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  //
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
  console.log(link);
}

function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", changeColor)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (ClearBtn) {
  ClearBtn.addEventListener("click", handleClearClick);
}
/* 
canvas.width = 700;
canvas.height = 700;
css에서도 크기를 정해줘야 눈에 보이지만 그거 외에도 
픽셀을 다루는 윈도우가 얼마나 큰지 캔버스에게 알려주기 위해서도 크기를 정해야 한다.
캔버스의 context는 픽셀들을 컨트롤함.


ctx.strokeStyle = "#2c2c2c";
context 안에 있는 모든 선들의 색상은 #2c2c2c 이다.
ctx.lineWidth = 2.5;
선의 너비가 2.5px이다.


클릭하지 않고 그냥 마우스가 움직일 때에는 if문에서 true의 상태이다.
눈에는 안보이지만 계속해서 path를 만들어내고 있다.
path를 만들면 마우스의 x와 y좌표로 path를 옮김.
마우스를 움직이는 모든 순간에 path를 만든다.

그러다가 내가 마우스를 클릭하면 (mouse down) if문이 false가 되면서 그리는 것을 시작한다. \
여기서 path는 선!!!
path의 시작점은 마우스가 있는 곳! 

lineTo() 메소드가 호출된다.
lineTo는 path의 전 위치 (처음 클릭된 위치)에서 지금 위치까지 선을 만들어준다.
만약에 처음 6,6 위치에서 클릭해서 선을 만들기 시작하고 7,7 위치까지 클릭한다면 6,6 부터 7,7까지 선이 만들어짐.
하지만 선이 눈에 보이지는 않는상황!

stroke()을 이용해서 현재의 path를 현재의 strokeStyle로 획을 그어줘야 눈에 보인다.

우리느 #2c2c2c를 스타일로 정했으니까 그 색으로 내 마우스가 클릭되어 움직인 곳을 선으로 그려준다.

lineTo와 stroke는 내 마우스가 클릭되어 움직이는 동안 계속 실행된다. 마우스 움직이면 바로바로 선이 내 눈에 보이니까!!

*/
