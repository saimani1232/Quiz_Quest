'enable strict'
// Game constants and variables
const buttonColors = ["red", "blue", "green", "yellow"];
const audioFiles = {
  red: new Audio("sounds/red.mp3"),
  blue: new Audio("sounds/blue.mp3"),
  green: new Audio("sounds/green.mp3"),
  yellow: new Audio("sounds/yellow.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
  levelUp: new Audio("sounds/levelUp.mp3"), // Add this sound file
  success: new Audio("sounds/success.mp3") // Add this sound file
};

// Game state
let gamePattern = [];
let userClickedPattern = [];
let highScore = 0;
let started = false;
let level = 0;
let hardMode = false;
let sequenceSpeed = 600; // Normal speed (ms)
let canClick = false;

// DOM Elements
const $levelTitle = $("#game-subtitle");
const $currentLevel = $("#current-level");
const $highScore = $("#high-score");
const $gameMessage = $("#game-message");
const $difficultyToggle = $("#difficulty-toggle");
const $startBtn = $("#start-btn");
const $resetBtn = $("#reset-btn");

// Initialize game
$(document).ready(function() {
  // Load high score from local storage if available
  if (localStorage.getItem("simonHighScore")) {
    highScore = parseInt(localStorage.getItem("simonHighScore"));
    updateHighScore();
  }
  
  // Event listeners
  $(document).keypress(function() {
    if (!started) {
      startGame();
    }
  });

  $startBtn.click(function() {
    if (!started) {
      startGame();
    }
  });

  $resetBtn.click(function() {
    resetGame();
  });

  $difficultyToggle.change(function() {
    hardMode = $(this).is(":checked");
    sequenceSpeed = hardMode ? 300 : 600; // Faster sequence in hard mode
    updateGameMessage(hardMode ? "Hard mode activated!" : "Easy mode activated!");
  });

  $(".btn").click(function() {
    if (started && canClick) {
      const userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      
      playSound(userChosenColor);
      animateButton(userChosenColor);
      
      checkAnswer(userClickedPattern.length - 1);
    }
  });
});

// Game functions
function startGame() {
  started = true;
  level = 0;
  gamePattern = [];
  $startBtn.prop("disabled", true);
  $levelTitle.text("Watch the pattern");
  updateGameMessage("Game started! Watch carefully...");
  nextSequence();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  
  updateLevel();
  
  canClick = false;
  
  // Show level up message for levels > 1
  if (level > 1) {
    updateGameMessage("Level " + level + " - Watch carefully!");
    playSound("levelUp");
  }
  
  // Generate new color and add to pattern
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  // Play the entire sequence with a delay
  setTimeout(function() {
    playSequence(0);
  }, 1000);
}

function playSequence(index) {
  if (index < gamePattern.length) {
    const color = gamePattern[index];
    
    // Flash the button
    animateButton(color);
    playSound(color);
    
    // Schedule the next color in the sequence
    setTimeout(function() {
      playSequence(index + 1);
    }, sequenceSpeed);
  } else {
    // Sequence finished, user's turn
    canClick = true;
    $levelTitle.text("Your turn");
    updateGameMessage("Now repeat the pattern!");
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    // Correct answer
    if (userClickedPattern.length === gamePattern.length) {
      // Completed the current level
      updateGameMessage("Great job! Get ready for the next level!");
      
      // Short delay before next level
      setTimeout(function() {
        nextSequence();
      }, 1000);
      
      // Play success sound on level completion
      if (level > 1) {
        playSound("success");
      }
    }
  } else {
    // Wrong answer - game over
    playSound("wrong");
    $("body").addClass("game-over");
    
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);
    
    updateGameMessage("Game Over! Score: " + (level - 1) + ". Press Start to try again.");
    $levelTitle.text("Game Over!");
    
    // Update high score if needed
    if (level - 1 > highScore) {
      highScore = level - 1;
      updateHighScore();
      saveHighScore();
    }
    
    resetGame();
  }
}

function animateButton(color) {
  $("#" + color).addClass("lit pressed");
  
  setTimeout(function() {
    $("#" + color).removeClass("lit pressed");
  }, sequenceSpeed / 2);
}

function playSound(name) {
  // Check if the sound exists
  if (audioFiles[name]) {
    // Create a new instance of Audio to allow multiple rapid plays
    const sound = audioFiles[name].cloneNode();
    sound.play();
  }
}

function updateLevel() {
  $currentLevel.text("Level: " + level);
}

function updateHighScore() {
  $highScore.text("High Score: " + highScore);
}

function updateGameMessage(message) {
  $gameMessage.text(message);
  $gameMessage.addClass("highlight");
  
  setTimeout(() => {
    $gameMessage.removeClass("highlight");
  }, 300);
}

function saveHighScore() {
  localStorage.setItem("simonHighScore", highScore);
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
  canClick = false;
  $startBtn.prop("disabled", false);
  $levelTitle.text("Press Any Key to Start");
  updateGameMessage("Ready to play!");
}

// Add this for visual feedback when anything is clicked
$(".btn").mousedown(function() {
  $(this).addClass("pressed");
});

$(".btn").mouseup(function() {
  $(this).removeClass("pressed");
});

// Add this for touch devices
$(".btn").on("touchstart", function() {
  $(this).addClass("pressed");
});

$(".btn").on("touchend", function() {
  $(this).removeClass("pressed");
});
