var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;
//player scores
var player1Score = 0;
var player2Score = 0;
//paddle starting positions and height
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 150;
//calculating mouse position
function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

//loading the canvas
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    })
}
//ball reset function
function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

function computerMovement() {
  var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
  if (paddle2YCenter < ballY-35) {
    paddle2Y += 6;
} else if (paddle2YCenter > ballY+35){
  paddle2Y -= 6;
}
}

function computerMovement2() {
  var paddle1YCenter = paddle1Y + (PADDLE_HEIGHT/2);
  if (paddle1YCenter < ballY-35) {
    paddle1Y += 6;
} else if (paddle1YCenter > ballY+35){
  paddle1Y -= 6;
}
}

function moveEverything() {
  computerMovement();
  computerMovement2();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < 0) {
    if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;

        var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
        ballSpeedY= deltaY * 0.35;

    } else {
        ballReset();
        player2Score++;
      }
  }
  if (ballX > canvas.width) {
    if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
        ballSpeedX = -ballSpeedX;

        var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
        ballSpeedY= deltaY * 0.35;

    } else {
        ballReset();
        player1Score++;
      }
    }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // blanks out canvas with black
  colorRect(0,0,canvas.width,canvas.height,'black');
  //left player paddle
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //right player paddle
  colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //draws the ball
  colorCircle(ballX, ballY, 10, 'white');

  canvasContext.fillText(player1Score,100,100)
  canvasContext.fillText(player2Score,canvas.width-100,100)
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
