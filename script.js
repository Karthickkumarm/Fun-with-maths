const timerDisplay = document.getElementById("time");
let currentQuestion = 0;
let currentRound = 1; // Initialize current round
let timer;
let score = 0;
let ans;

function checkButtonClick() {
  clearTimeout(timer);

  if (currentQuestion < 10) {
    const guess = Number(document.querySelector('.guess').value);
    if (guess === ans) {
      displayMessage('Correct Number!');
      score++;
    } else {
      displayMessage('Wrong Number');
    }

    // Clear the guess input field
    document.querySelector('.guess').value = '';

    currentQuestion++;

    // Check if the current round is completed and score is at least 7
    if (currentQuestion >= 10) {
      if (score >= 7) {
        if (currentRound < 3) {
          currentRound++;
          // Reset the score for the next round
          document.querySelector('.round').textContent = currentRound;
          currentQuestion = 0; // Reset current question for the new round
          displayMessage('Score : '+score+' Round completed. Advancing to the next round...');
          score = 0; 
          setTimeout(() => {
            perform(); // Start the next round
          }, 1500); // 1.5 seconds delay before starting the next round
        } else {
          displayMessage('Congratulations! You have completed all the rounds.');
          setTimeout(() => {
            closeWindowAndShowThankYou();
          }, 2000);
        }
      } else {
        displayMessage('You need a score of at least 7 for next round.');
        setTimeout(() => {
          closeWindowAndShowThankYou();
        }, 2000);
      }
    } else {
      // Continue with the current round
      if (currentQuestion < 10) {
        perform();
      }
    }
  }
}

document.querySelector('.check').addEventListener('click', checkButtonClick);

// Rest of your code...


function waitForInput() {
  return new Promise((resolve) => {
    document.querySelector('.check').addEventListener('click', resolve, { once: true });
  });
}

function s1(){
  return Math.floor(Math.random()*10)+1;
}
function s2(){
  return Math.floor(Math.random()*90)+10;
}
function s3(){
  return Math.floor(Math.random()*900)+100;
}




function perform() {
  let n1=0,n2=0;
  if (currentRound === 1){
    n1=s1();
    n2=s1();
  }else if(currentRound === 2){
    n1=s2();
    n2=s2();
  }else{
    n1=s3();
    n2=s3();
  }
  let arr = ["+", "-", "*", "/"];
  let sym = arr[Math.floor(Math.random() * arr.length)];

  ans = calculateAnswer(n1, sym, n2); // Calculate the correct answer
  console.log(ans);
  document.querySelector('.ques').textContent = 'Question: ' + (currentQuestion + 1);
  displayQuestion(n1, sym, n2);

  let remainingTime = 30;
  timerDisplay.textContent = "Remaining Time : " + remainingTime;

  timer = setInterval(() => {
    remainingTime--;
    timerDisplay.textContent = "Remaining Time : " + remainingTime;

    if (remainingTime === 0) {
      clearInterval(timer);
      displayMessage('Time\'s up!');
      currentQuestion++;
      if (currentQuestion < 10) {
        perform();
      } else {
        displayMessage(`Completed! Your score: ${score}`);
        document.querySelector('.check').removeEventListener('click', checkButtonClick);
      }
    }
  }, 1000);
}

function calculateAnswer(n1, sym, n2) {
  if (sym === '+') {
    return n1 + n2;
  } else if (sym === '-') {
    return n1 - n2;
  } else if (sym === '*') {
    return n1 * n2;
  } else {
    return n1 / n2;
  }
}

function displayQuestion(n1, sym, n2) {
  document.getElementById('n1').textContent = n1;
  document.getElementById('sym').textContent = sym;
  document.getElementById('n2').textContent = n2;
}

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.show-modal').addEventListener('click', () => {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.show-modal').classList.add('hidden');
  perform(); // Start the quiz
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.show-modal').classList.remove('hidden');
});


function closeWindowAndShowThankYou() {
  // Close the modal window and overlay (assuming you have a modal and overlay with appropriate class names)
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
  // Display the "Thank You" message
  document.querySelector('.fun').textContent = 'Thank you for playing the quiz!';
}