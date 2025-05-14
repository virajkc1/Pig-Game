'use strict';
//get the most points
//roll as many times as you want but if you roll a 1 then you lose all the points

//Selecting Players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
//the hashtag is to store an id
const score1El = document.getElementById('score--1'); //this is another way to get the element if its an id

const diceEl = document.querySelector('.dice'); //this is an img element
//created a varaible that stores the element with the .dice class

//the above are the DOM elements, nothing else

//Selecting our 3 buttons  with the classes
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//these are the temporary scores until they hold
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

const scores = [0, 0]; // these are the big scores - its an array hence using 0 & 1 is more useful

let currentScore = 0; //this will change but dont want to reset to 0 each button roll so we put it outside the function

//const dice will change after each roll so we put it in the function
let activePlayer = 0; //player 1 is 0 , player 2 is 1

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //activePlayer is if activePlayer is 0 then its 1 else its 0
  player0El.classList.toggle('player--active'); //adds class if its not there but removes it if it is
  player1El.classList.toggle('player--active');
};

//changes the textContent of the score elements
score0El.textContent = 0;
score1El.textContent = 0;

diceEl.classList.add('hidden');
//above line will add the hidden class to the dice

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  // 1. need a random dice roll
  // 2. display the dice
  // 3. check for rolled 1
  //if true look for next player

  const dice = Math.trunc(Math.random() * 6) + 1; //dice between 1 & 6
  diceEl.classList.remove('hidden'); //now we can see the dice
  //manipulate the src attr from img
  diceEl.src = `dice-${dice}.png`; //img element has a src so we changed it

  //Checking for the rolled 1
  if (dice !== 1) {
    //Add dice to the current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to the next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //this is a boolean value so if just checking if its true
    //1. Add current score to active player score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if active player score >100 if so finish game
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});
