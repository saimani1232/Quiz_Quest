'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const nameEl0 = document.getElementById('name--0');
const nameEl1 = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewAfterWin = document.querySelector('.btn--new-after-win');
const winnerMessageEl = document.querySelector('.winner-message');
const winnerTextEl = document.getElementById('winner-text');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  // Reset game state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Reset player names (in case they were changed)
  nameEl0.textContent = 'Player 1';
  nameEl1.textContent = 'Player 2';

  // Hide dice and winner message
  diceEl.classList.add('hidden');
  winnerMessageEl.classList.add('hidden');

  // Reset player classes
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Add smooth transition after reset
  setTimeout(() => {
    diceEl.classList.remove('hidden');
    diceEl.src = 'dice-6.png';
  }, 300);
};

const switchPlayer = function () {
  // Reset current player score
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  
  // Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  
  // Toggle active player UI
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  
  // Add animation to dice on player switch
  diceEl.classList.add('hidden');
  setTimeout(() => {
    diceEl.classList.remove('hidden');
  }, 150);
};

// Show winner message
const showWinner = function(player) {
  winnerTextEl.textContent = `${document.getElementById(`name--${player}`).textContent} Wins!`;
  winnerMessageEl.classList.remove('hidden');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Add button click effect
    btnRoll.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btnRoll.style.transform = '';
    }, 100);

    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice with animation
    diceEl.classList.add('hidden');
    setTimeout(() => {
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
    }, 100);

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score with animation
      currentScore += dice;
      
      // Update current score with animation
      const currentEl = document.getElementById(`current--${activePlayer}`);
      currentEl.style.transform = 'scale(1.1)';
      currentEl.textContent = currentScore;
      
      setTimeout(() => {
        currentEl.style.transform = '';
      }, 150);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add button click effect
    btnHold.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btnHold.style.transform = '';
    }, 100);
    
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    
    // Update the score in UI with animation
    const scoreEl = document.getElementById(`score--${activePlayer}`);
    scoreEl.style.transform = 'scale(1.1)';
    scoreEl.textContent = scores[activePlayer];
    
    setTimeout(() => {
      scoreEl.style.transform = '';
    }, 150);

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      
      // Hide dice
      diceEl.classList.add('hidden');
      
      // Add winner class to player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        
      // Show winner message
      setTimeout(() => {
        showWinner(activePlayer);
      }, 500);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Start new game
btnNew.addEventListener('click', init);
btnNewAfterWin.addEventListener('click', init);

// Initialize game on page load
init();

// Optional: Allow players to set their names
document.querySelectorAll('.name').forEach(nameEl => {
  nameEl.addEventListener('dblclick', function() {
    if (playing) {
      const playerId = this.getAttribute('id').split('--')[1];
      const newName = prompt('Enter player name:', this.textContent);
      if (newName && newName.trim() !== '') {
        this.textContent = newName.trim().substring(0, 15); // Limit name length
      }
    }
  });
});

// Add keyboard support
document.addEventListener('keydown', function(e) {
  if (playing) {
    if (e.key === 'r' || e.key === 'R') {
      // Roll dice
      btnRoll.click();
    } else if (e.key === 'h' || e.key === 'H') {
      // Hold score
      btnHold.click();
    } else if (e.key === 'n' || e.key === 'N') {
      // New game
      btnNew.click();
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    // Start new game after win
    init();
  }
});
