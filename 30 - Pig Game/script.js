"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const modalInit = document.querySelector(".modal-init");
const crossBtn = document.querySelector(".cross-btn");

// alert("Player scoring 25 firs wins!");

// Starting Conditions
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  currentScore = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  scores = [0, 0];
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  current0El.textContent = 0;
  current1El.textContent = 0;
  modal.classList.add("hidden");
  modalInit.classList.remove("hidden");
};
init();

crossBtn.addEventListener("click", function (e) {
  modalInit.style.display = "none";
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modalInit.style.display = "none";
});
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  modal.classList.add("hidden");
};

// Rolling Dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    // Check for rolled 1
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switching player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // Add current score to player's total score
    scores[activePlayer] += currentScore;

    // Update player's total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player won
    if (scores[activePlayer] >= 25) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");

      modal.classList.remove("hidden");
      modal.textContent = `Player ${activePlayer + 1} won!`;
    } else {
      // if not won then, switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init();
});
