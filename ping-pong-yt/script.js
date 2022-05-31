
const {body} = document;



const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;




// paddle
const paddleWidth = 50;
const paddleHeight = 20;
let paddleComputerX = 225;
let paddlePlayerX = 225;
let paddleDiff = 25
let paddleContact = false;

// ball
let ballX = width/2
let ballY = height/2;
let ballRadius = 5;

// Score
let playerScore = 0;
let computerScore = 0;

// Speed
let speedY = -2;
let speedX = -2;
let computerSpeed = 3;
let trajectoryX;

let mouseMoved = false;
let playerMoved = false;
function renderCanvas() {
    context.fillStyle = "white"
    context.fillRect(0,0,width,height)

    context.fillStyle = "black";
    context.fillRect(paddleComputerX, 10,paddleWidth,paddleHeight);
    context.fillRect(paddlePlayerX,height -30, paddleWidth,paddleHeight )

    // Dashed center
    context.beginPath();
    context.setLineDash([4])
    context.moveTo(0,350);
    context.lineTo(500,350)
    context.strokeStyle="grey"
    context.stroke();
    //Ball
    context.beginPath();
    context.arc(ballX, ballY, ballRadius , 2* Math.PI, false);
    context.fillStyle = "black"
    context.fill()
    // Score
    context.font="32px Courier New"
    context.fillText(playerScore, 20, canvas.height/2 + 50);
    context.fillText(computerScore, 20, canvas.height / 2 - 30)


}


function ballMove() {
    ballY += -speedY;
    if(playerMoved && paddleContact) {
        ballX += speedX;
    }
}

function ballReset() {
    ballX = width/2;
    ballY = height/2;
    speedY = -3;
}

function ballBoundaries() {
    if(ballX < 0 && speedX < 0) {
        speedX = -speedX;
    }
    if(ballX > width && speedX > 0) {
        speedX = -speedX
    }
    if(ballY > height -paddleDiff) {
        if(ballX > paddlePlayerX && ballX < paddlePlayerX + paddleWidth) {
            paddleContact = true;
            if(playerMoved){
                speedY -= 1;
            }
            speedY = - speedY
        trajectoryX = ballX - (paddlePlayerX + paddleDiff);
        speedX = trajectoryX * 0.3;
        } else if(ballY > height) {
            ballReset();
            computerScore++;
        }     
        

    }

    if(ballY< paddleDiff) {
        if(ballX > paddleComputerX && ballX < paddleComputerX + paddleWidth) {
            if(playerMoved) {
                speedY +=1;

            }
            speedY = -speedY;
        }else if(ballY < 0) {
            ballReset();
            playerScore++;
        }
        
    }
}

function computerPaddle() {
    if(playerMoved){
        if(paddleComputerX + paddleDiff <ballX) {
            paddleComputerX += computerSpeed;
        }else {
            paddleComputerX -= computerSpeed;
        }
    }
}



function animate(){
    ballBoundaries();
    renderCanvas();
    ballMove();
    computerPaddle();
    window.requestAnimationFrame(animate);
}

function createCanvas(){
    canvas.height = height;
    canvas.width = width;
    body.appendChild(canvas);
    renderCanvas();
}


function startGame(){
    createCanvas();
    animate();

    playerScore = 0;
    computerScore = 0;


    canvas.addEventListener('mousemove', (e) => {
        playerMoved = true;
        paddlePlayerX = e.clientX -width - paddleDiff;

        if(paddlePlayerX < paddleDiff) {
            paddlePlayerX = 0;
        }
        if(paddlePlayerX > width - paddleWidth) {
            paddlePlayerX = width - paddleWidth;
        }
    })
}



startGame();