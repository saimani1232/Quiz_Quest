'use strict';

// Game state variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let gameActive = true;

// DOM elements
const bodyEl = document.querySelector('body');
const numberEl = document.querySelector('.number');
const guessInputEl = document.querySelector('.guess');
const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const checkBtnEl = document.querySelector('.check');
const againBtnEl = document.querySelector('.again');

// Function to display message with animation
const displayMessage = function (message) {
  // Add fade out effect
  messageEl.style.opacity = 0;
  
  // Change message and fade in after a short delay
  setTimeout(() => {
    messageEl.textContent = message;
    messageEl.style.opacity = 1;
  }, 300);
};

// Function to update UI based on game state
const updateUI = function(state) {
  switch(state) {
    case 'win':
      bodyEl.classList.add('win-state');
      numberEl.textContent = secretNumber;
      numberEl.style.width = '15rem';
      numberEl.style.height = '15rem';
      numberEl.style.fontSize = '7rem';
      break;
    case 'reset':
      bodyEl.classList.remove('win-state');
      numberEl.textContent = '?';
      numberEl.style.width = '12rem';
      numberEl.style.height = '12rem';
      numberEl.style.fontSize = '5rem';
      guessInputEl.value = '';
      gameActive = true;
      break;
    default:
      break;
  }
};

// Function to handle check button click
const checkGuess = function() {
  if (!gameActive) return;
  
  const guess = Number(guessInputEl.value);
  
  // No input
  if (!guess) {
    displayMessage('⛔️ No number!');
    guessInputEl.focus();
    return;
  }
  
  // Out of range
  if (guess < 1 || guess > 20) {
    displayMessage('⚠️ Number must be between 1 and 20!');
    guessInputEl.value = '';
    guessInputEl.focus();
    return;
  }

  // When player wins
  if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    updateUI('win');
    gameActive = false;
    
    // Add confetti effect (just visual animation indicator)
    bodyEl.style.animation = 'gradientBG 5s ease infinite';

    // Update highscore
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      // Add pulsing effect to highscore
      highscoreEl.style.animation = 'pulse 1s';
      setTimeout(() => {
        highscoreEl.style.animation = '';
      }, 1000);
    }
  } 
  // When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreEl.textContent = score;
      
      // Add slight shake to the input
      guessInputEl.classList.add('shake');
      setTimeout(() => {
        guessInputEl.classList.remove('shake');
      }, 500);
    } else {
      displayMessage('💥 You lost the game!');
      scoreEl.textContent = 0;
      gameActive = false;
      
      // Visual indication of game over
      bodyEl.style.animation = 'none';
      bodyEl.style.background = 'linear-gradient(135deg, #4a0404, #1a1a2e, #4a0404)';
    }
  }
  
  // Auto select input content for easier next guess
  guessInputEl.select();
};

// Function to reset game
const resetGame = function() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  
  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  updateUI('reset');
  
  // Reset background if in game over state
  if (!gameActive) {
    bodyEl.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e, #1a1a2e)';
    bodyEl.style.animation = 'gradientBG 15s ease infinite';
  }
  
  // Focus input for better UX
  guessInputEl.focus();
};

// Event listeners
checkBtnEl.addEventListener('click', checkGuess);
againBtnEl.addEventListener('click', resetGame);

// Allow Enter key to trigger check
guessInputEl.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

// Initialize game
guessInputEl.focus();
