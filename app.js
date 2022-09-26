const table = document.querySelector(".gameTable");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const ball = document.querySelector(".ball");
const pscore = document.querySelector(".playerScore");
const cscpre = document.querySelector(".computerScore");
const btn = document.querySelector('.btn');

let right = false;
let up = false;
let isGoal = false;
let ballVelocity = 1.02;

let goal = new Audio("./sounds/goal.ogg");
let bounce = new Audio("./sounds/bounce.ogg");
let beep = new Audio("./sounds/beep.ogg");

let scorep = 0;
let scorec = 0;

for (let i = 1; i <= 30; i++) {
  let net = document.createElement("div");
  net.classList.add("net");
  net.style.top = 16 * i + "px";
  table.appendChild(net);
}

btn.addEventListener("click", () => {
    Play();
});

function Play() {
  let tableBounds = table.getBoundingClientRect();

  window.addEventListener("mousemove", (e) => {
    let playerTop = parseInt(
      window.getComputedStyle(player).getPropertyValue("top")
    );
    let computerTop = parseInt(
      window.getComputedStyle(computer).getPropertyValue("top")
    );

    let playerBounds = player.getBoundingClientRect();
    tableBounds = table.getBoundingClientRect();

    let playerY = e.clientY;
    if (playerY >= 55 && playerY <= 440) {
      player.style.top = playerY + "px";
    }
  });

  let leftRight = Math.floor(Math.random() * 2);
  let upDown = Math.floor(Math.random() * 2);
  leftRight ? (right = true) : (right = false);
  upDown ? (up = true) : (up = false);

  let ballMove = setInterval(() => {
    let playerBounds = player.getBoundingClientRect();
    let computerBounds = computer.getBoundingClientRect();
    let ballBound = ball.getBoundingClientRect();

    let ballLeft = parseInt(
      window.getComputedStyle(ball).getPropertyValue("left")
    );
    let ballTop = parseInt(
      window.getComputedStyle(ball).getPropertyValue("top")
    );

    let computerY = Math.floor(ballBound.top);
    computer.style.top = ballTop + 1.1 + "px";

    if (right && up) {
      ball.style.left = ballLeft + 1 * ballVelocity + "px";
      ball.style.top = ballTop - 1 * ballVelocity + "px";
    } else if (right && !up) {
      ball.style.left = ballLeft + 1 * ballVelocity + "px";
      ball.style.top = ballTop + 1 * ballVelocity + "px";
    } else if (!right && !up) {
      ball.style.left = ballLeft - 1 * ballVelocity + "px";
      ball.style.top = ballTop + 1 * ballVelocity + "px";
    } else if (!right && up) {
      ball.style.left = ballLeft - 1 * ballVelocity + "px";
      ball.style.top = ballTop - 1 * ballVelocity + "px";
    }

    if (Math.floor(ballBound.bottom) > tableBounds.bottom && right) {
      bounce.play();
      bounce.currentTime = 0;
      up = true;
      right = true;
    } else if (Math.floor(ballBound.bottom) > tableBounds.bottom && !right) {
      bounce.play();
      bounce.currentTime = 0;
      up = true;
      right = false;
    } else if (Math.floor(ballBound.top) < tableBounds.top && !right) {
      bounce.play();
      bounce.currentTime = 0;
      up = false;
      right = false;
    } else if (Math.floor(ballBound.top) < tableBounds.top && right) {
      bounce.play();
      bounce.currentTime = 0;
      up = false;
      right = true;
    }

    if (
      Math.floor(ballBound.left) < Math.floor(playerBounds.right) &&
      Math.floor(ballBound.top) >= Math.floor(playerBounds.top) &&
      Math.floor(ballBound.bottom) < Math.floor(playerBounds.bottom) &&
      !right
    ) {
      beep.play();
      beep.currentTime = 0;
      ballVelocity = ballVelocity + 0.32;
      let upDown = Math.floor(Math.random() * 2);
      up = upDown === 0 ? false : true;
      right = true;
    }

    if (
      Math.floor(ballBound.right) > Math.floor(computerBounds.left) &&
      Math.floor(ballBound.top) >= Math.floor(computerBounds.top) &&
      Math.floor(ballBound.bottom) <= Math.floor(computerBounds.bottom) &&
      right
    ) {
      beep.play();
      beep.currentTime = 0;
      ballVelocity = ballVelocity + 0.32;
      let upDown = Math.floor(Math.random() * 2);
      up = upDown === 0 ? false : true;
      right = false;
    }

    if (Math.floor(ballBound.right) >= tableBounds.right) {
      goal.play();
      goal.currentTime = 0;
      scorep++;
      pscore.textContent = scorep;
      isGoal = true;
    }
    if (Math.floor(ballBound.left) <= tableBounds.left) {
      goal.play();
      goal.currentTime = 0;
      scorec++;
      cscpre.textContent = scorec;
      isGoal = true;
    }

    if (isGoal) {
      setTimeout(() => {
        isGoal = false;
      }, 650);
      initialPositions();
    }
  }, 1);

  const initialPositions = () => {
    ball.style.left = "50%";
    ball.style.top = "50%";
    ballVelocity = 1.02;
    leftRight = Math.floor(Math.random() * 2);
    upDown = Math.floor(Math.random() * 2);

    leftRight ? (right = true) : (right = false);
    upDown ? (up = true) : (up = false);
  };
}
