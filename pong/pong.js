var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
}

function moveEverything() {
  ballX = ballX + ballSpeedX;
  ballY = ballY + ballSpeedY;
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballY > canvas.width) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballX < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  // blanks out canvas with black
  colorRect(0,0,canvas.width,canvas.height,'black');
  //left player paddle
  colorRect(0,210,10,100,'white');
  //draws the ball
  colorCircle(ballX, ballY, 10, 'white');
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
