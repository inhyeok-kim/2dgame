const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 70;
let brickHeight = 20;
let colorSet = ['red','blue','green'];
let colorIdx= 0;
let brickCount = brickRowCount*brickColumnCount;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, color : colorSet[colorIdx++]};
        if(colorIdx >= colorSet.length) colorIdx = 0;
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r< bricks[c].length; r++) {
            bricks[c][r].x = c*(brickWidth) ;
            bricks[c][r].y = r*(brickHeight) ;
            ctx.beginPath();
            ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
            ctx.fillStyle = bricks[c][r].color;
            ctx.fill();
            ctx.closePath();
        }
    }
}

function collisionDetection(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<bricks[c].length; r++) {
            var b = bricks[c][r];
            if(x >= b.x && x <= b.x+brickWidth && (y-ballRadius <= b.y+brickHeight && y+ballRadius >= b.y)){
                bricks[c].splice(r,1);
                brickCount--;
                return 'y';
            } else if(y >= b.y && y <= b.y+brickHeight && (x + ballRadius >= b.x && x-ballRadius < b.x+brickWidth)){
                bricks[c].splice(r,1);
                brickCount--
                return 'x';
            }
        }
    }
    return 'none';
}

let x = canvas.width/2;
let y = canvas.height-30;
let ballRadius = 10;
let dx = 1;
let dy = -1;

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = canvas.height/2 -paddleWidth/2;
let paddleY = canvas.height-paddleHeight;
let leftPressed = false;
let rightPressed = false;
let paddleDx = 3;

document.addEventListener('keydown',(e)=>{
    if(e.keyCode == 39){
        rightPressed = true;
    } else if(e.keyCode == 37){
        leftPressed = true;
    }
});
document.addEventListener('keyup',(e)=>{
    if(e.keyCode == 39){
        rightPressed = false;
    } else if(e.keyCode == 37){
        leftPressed = false;
    }
});


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function ballMoving(){
    if(x + ballRadius >= canvas.width || x-ballRadius <= 0){ // 좌우 벽
        dx = -dx;
    }
    if(y-ballRadius <= 0){ // 윗 벽
        dy = -dy;
    } else if (y+ballRadius >= paddleY && x >= paddleX && x <= paddleX + paddleWidth){ // 막대를 만나면
        dy = -dy;
    } else if(y+ballRadius >= canvas.height){ // 바닥을 만나면
        lose();
    } else { // 다 아니면
        const col = collisionDetection();
        if(col == 'y'){
            dy = -dy;
        } else if(col =='x'){
            dx = -dx;
        }
    }

    
    x += dx;
    y += dy;
}

function paddleMoving(){
    if(rightPressed){
        if( paddleX+paddleWidth+paddleDx <= canvas.width){
            paddleX += paddleDx;
        } else {
            paddleX = canvas.width - paddleWidth;
        }
    } else if(leftPressed){
        if(paddleX-paddleDx >= 0){
            paddleX -= paddleDx;
        } else {
            paddleX = 0;
        }
    }
}

function draw(){

        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        if(brickCount <= 25 && brickCount > 18){
            setBallTime(1.2);
        } else if(brickCount <= 18 && brickCount > 13){
            setBallTime(1.4);
        } else if(brickCount < 13 && brickCount > 5){
            setBallTime(1.6);
        } else if(brickCount <= 5 && brickCount > 0){
            setBallTime(1.8);
        } else if(brickCount == 0){
            win();
        }

}

function lose(){
    clearInterval(drawIntv);
    clearInterval(ballIntv);
    clearInterval(padIntv);
    alert('패배!');
    document.location.reload();
}

function win(){
    clearInterval(drawIntv);
    clearInterval(ballIntv);
    clearInterval(padIntv);
    alert('승리하셨습니다.');
    document.location.reload();
}

var drawIntv = setInterval(draw, 1000/60);
var ballIntv = setInterval(ballMoving, 5);
var padIntv = setInterval(paddleMoving, 10);

function setBallTime(time){
    if(dx < 0){
        dx = -time;
    } else{
        dx = time;
    }
    if(dy < 0){
        dy = -time;
    } else{
        dy = time;
    }
}

