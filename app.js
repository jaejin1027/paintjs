const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");  //이 안에서 픽셀들을 컨트롤 한다.

canvas.width = 700;  //픽셀 modifier에 사이즈를 준다.
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; //우리가 그릴 선(이context안에 있는 모든선)들이 모두 이 색을 갖는다.
ctx.lineWidth = 2.5;  // 그 선의 너비가 2.5px


let painting = false;

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

function onMouseDown(event) {
    painting = true;
}



if(canvas){ //캔버스가 있는지 없는지 체크
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}