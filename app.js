const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //이 안에서 픽셀들을 컨트롤 한다.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;  //픽셀 modifier에 사이즈를 준다.
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; //우리가 그릴 선(이context안에 있는 모든선)들이 모두 이 색을 갖는다.
ctx.lineWidth = 2.5;  // 그 선의 너비가 2.5px


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
    if(!painting){  //painting === false
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else{
      ctx.lineTo(x, y); //현재 sub-path에서 마지막 지점을 특정좌표와 직선으로 연결한다.
      ctx.stroke();  //현재의 stroke style로 현재의 sub-path에 획을 그음. 라인투와,스트로크는 마우스를 움직이는 내내 발생.
    }    
      
  }

/*function onMouseDown(event) {
    painting = true;
}*/

function handleColorClick(event) {
  //console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  //console.log(color);
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  //console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() { //현재가 필링모드인지 아닌지 알수 있는게 필요.
  if(filling === true){
    //console.log(filling); true
    filling = false;
    //console.log(filling); false
    mode.innerText = "Fill";
  } else {
    //console.log(filling); false
    filling = true;
    //console.log(filling); true
    mode.innerText = "Paint";
  }
}


if(canvas){ //캔버스가 있는지 없는지 체크
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

//console.log(Array.from(colors)); //array.from 메소드는 object로 부터 array를 만든다.
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); //어레이를 주면 그 어레이 안에서 forEach로 color를 가질수있다.
//이안에 color를 potato로 바꿔도 된다. 이건 그냥 그 array 안에 있는 각각의 아이템들을 대표하는것뿐)

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}