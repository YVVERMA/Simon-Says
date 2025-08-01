let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0; // Add this at the top

document.querySelector('h2').addEventListener("click", function () {
  if (started == false) {
    console.log("Game is Started");
    started = true;

    levelUp();
  }
});

let h2 = document.querySelector("h2");

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.textContent = `Level: ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Update highest score if needed
    if (level > highestScore) {
      highestScore = level;
    }
    h2.innerHTML = `Game Over! <b>Your score was: ${level}</b> <br>Highest Score: <b>${highestScore}</b><br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 800);
    reset();
  }
}

function btnPress() {
  let btn = this;

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");

for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
