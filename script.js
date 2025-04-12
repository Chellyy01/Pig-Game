"use strict";
//selection of elements
const diceEl = document.querySelector(".dice");
const currentScoreEl = [
  document.querySelector(".current-score-1"),
  document.querySelector(".current-score-2"),
];
const playerEl = [
  document.querySelector(".section-1"),
  document.querySelector(".section-2"),
];
const scoreEl = document.querySelectorAll(".score");
const rollDice = document.querySelector(".roll-dice");
const holdButton = document.querySelector(".hold");
const newGame = document.querySelector(".new-game");

let activePlayer = 0;
let currentScore = 0;
let scores = [0, 0];

const switchPlayer = function () {
  currentScore = 0;
  currentScoreEl[activePlayer].textContent = currentScore;

  // Toggle active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerEl[0].classList.toggle("active-player");
  playerEl[1].classList.toggle("active-player");
};

//roll d dice and generate a random no
rollDice.addEventListener("click", function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(randomNumber);

  // display the random dice no
  diceEl.src = `images/dice-${randomNumber}.png`;

  if (randomNumber === 1) {
    switchPlayer();
  } else {
    // add the random dice no to current score
    currentScore += randomNumber;
    currentScoreEl[activePlayer].textContent = currentScore;
  }
});

// hold button: add current score to score
holdButton.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  scoreEl[activePlayer].textContent = scores[activePlayer];

  currentScore = 0;
  currentScoreEl[activePlayer].textContent = currentScore;

  //check if score >= 100
  if (scores[activePlayer] >= 20) {
    //end game
    diceEl.classList.add("hidden");
    playerEl[activePlayer].classList.add("winner");
    rollDice.disabled = true;
    holdButton.disabled = true;
  } else {
    // switch to the next player
    switchPlayer();
  }
});

//new game reset all variables
newGame.addEventListener("click", function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  currentScoreEl.forEach(el => el.textContent = 0);
  scoreEl.forEach(el => el.textContent = 0);

  diceEl.classList.remove("hidden");
  playerEl.forEach(el => {
    el.classList.remove("winner", "active-player")
  });
 
  playerEl[0].classList.add("active-player");

  rollDice.disabled = false;
  holdButton.disabled = false;
});
