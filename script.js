// script.js
const quotes = [
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It always seems impossible until it's done.",
  "The only way to do great work is to love what you do.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "The best way to predict the future is to create it.",
  "Believe you can and you're halfway there.",
  "Life is 10% what happens to us and 90% how we react to it.",
];

const quoteElement = document.querySelector(".quote");
const inputArea = document.querySelector(".input-area");
const startButton = document.querySelector(".start-button");
const finishButton = document.querySelector(".finish-button");
const exitButton = document.querySelector(".exit-button");
const timeElement = document.getElementById("time");
const resultElement = document.querySelector(".result");
const preloaderOverlay = document.querySelector(".preloader-overlay");

let time = 45;
let timerId;
let wordsPerMinute = 0;

// Function to select a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function startGame() {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  resultElement.textContent = "";
  time = 45;
  updateTimer();

  // Memilih quote secara acak setiap kali permainan dimulai
  quoteElement.textContent = getRandomQuote();

  timerId = setInterval(() => {
    time--;
    updateTimer();

    if (time === 0) {
      endGame();
    }
  }, 1000);
}

// Function to finish the game
function finishGame() {
  clearInterval(timerId);
  inputArea.disabled = true;
  endGame();
}

// Function to exit the game
function exitGame() {
  // Show the alert message
  const confirmExit = confirm("Yakin, Tidak Mencoba Lagi?");
  if (confirmExit) {
    // Show the preloader overlay
    preloaderOverlay.style.display = "block";

    // Redirect to the main page (start.html) after a short delay (1 second in this case)
    setTimeout(() => {
      window.location.href = "start.html";
    }, 1000);
  }
}

// Function to update the timer
function updateTimer() {
  timeElement.textContent = time + " seconds";
}

// Function to end the game
function endGame() {
  const quoteText = quoteElement.textContent.trim();
  const userInput = inputArea.value.trim();
  const words = quoteText.split(" ");
  const userWords = userInput.split(" ");

  let correctWords = 0;
  for (let i = 0; i < words.length; i++) {
    if (userWords[i] && words[i] === userWords[i]) {
      correctWords++;
    }
  }

  const accuracy = (correctWords / words.length) * 100;
  wordsPerMinute = (userWords.length / 45) * (45 - time);

  if (wordsPerMinute < 0) {
    wordsPerMinute = 0;
  }

  const resultText = `Your typing speed: ${wordsPerMinute.toFixed(
    1
  )} WPM | Accuracy: ${accuracy.toFixed(1)}%`;

  resultElement.textContent = resultText;
}

// Event listener for starting the game
startButton.addEventListener("click", startGame);

// Event listener for finishing the game
finishButton.addEventListener("click", finishGame);

// Event listener for exiting the game
exitButton.addEventListener("click", exitGame);
