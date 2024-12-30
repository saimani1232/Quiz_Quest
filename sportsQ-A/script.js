document.addEventListener('DOMContentLoaded', function () {
  const correctFeedback = document.getElementById('correctFeedback');
  const incorrectFeedback = document.getElementById('incorrectFeedback');
  const gif = document.querySelector('.gifl');
  const nextButton = document.querySelector('.home-start-button');
  const checkButton = document.querySelector('.check-button');

  nextButton.classList.add('hidden');

  
  if (!localStorage.getItem('score')) {
    localStorage.setItem('score', '0');
  }

  function showFeedback(isCorrect, correctAnswer = '') {
    if (isCorrect) {
      correctFeedback.innerHTML = `Correct! well done!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp  `;
      correctFeedback.style.display = 'block';
      correctFeedback.classList.add('fadeInOut');
      gif.classList.remove('hidden');
      gif.classList.add('fadeInOut');
      setTimeout(() => {
        correctFeedback.style.display = 'none';
        correctFeedback.classList.remove('fadeInOut');
        gif.classList.add('hidden');
        gif.classList.remove('fadeInOut');
        nextButton.classList.remove('hidden');
        checkButton.classList.add('hidden');
      }, 6000);
    } else {
      incorrectFeedback.textContent = `Incorrect! The correct answer is ${correctAnswer}`;
      incorrectFeedback.style.display = 'block';
      incorrectFeedback.classList.add('fadeInOut');
      setTimeout(() => {
        incorrectFeedback.style.display = 'none';
        incorrectFeedback.classList.remove('fadeInOut');
      }, 6000);
    }
  }

  window.checkAnswer = function(correctAnswer) {
    const form = document.querySelector('form');
    const selectedInput = form.querySelector('input[name="sports"]:checked');

    if (selectedInput) {
      const selectedValue = selectedInput.value;

      form.querySelectorAll('input[name="sports"]').forEach(input => {
        input.disabled = true;

        if (input.value === correctAnswer) {
          const correctImage = input.previousElementSibling;
          correctImage.classList.remove('hidden');
         
        }
      });

      if (selectedValue === correctAnswer) {
        showFeedback(true);

        let score = parseInt(localStorage.getItem('score'));
        localStorage.setItem('score', (score + 1).toString());
      } else {
        showFeedback(false, correctAnswer);
      }

      // Reset form but keep the inputs disabled
      form.reset();
      form.querySelectorAll('input[name="sports"]').forEach(input => {
        input.disabled = true;
      });

      // Hide next button and show check button again
      nextButton.classList.remove('hidden');
      checkButton.classList.add('hidden');
    } else {
      alert('Please select an answer before submitting.');
    }
  };

  window.displayscore = function() {
    const showscore = document.querySelector('.scorer');
    const scoredisplay = document.querySelector('.Score-text');
    let score = parseInt(localStorage.getItem('score'));
    showscore.textContent = score;
    scoredisplay.classList.remove('hidden');
    localStorage.removeItem('score');
  };
});