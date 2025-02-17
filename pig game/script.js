"use strict";
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("currentScore--0");
const current1El = document.getElementById("currentScore--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".new");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
let scores, currentScore, activePlayer, playing;
let init = function () {
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
};
init();

const switchPlayer = function () {
  document.getElementById(`currentScore--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //chech the dice is 1
    if (dice !== 1) {
      // adding add score to the current score of the active player
      currentScore += dice;
      document.getElementById(`currentScore--${activePlayer}`).textContent =
        currentScore;
      //current0El.textContent = currentScore;
    } else {
      // switching to the next person function
      switchPlayer();
    }
  }
});
//hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore; // adding current score to the main score board
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // storing the vadding vavle to the main score variable
    if (scores[activePlayer] >= 100) {
      //finish the game

      playing = false;
      diceEl.classList.add("hidden");
      //add play winner class to the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
