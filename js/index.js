const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('.color-options');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameBtn = document.querySelector('[data-testid="newGameButton"]');
const progressBar = document.querySelector('[data-testid="progressBar"]');

let score = 0;
let progress = 0;
let targetColor;

// Predefined set of colors
const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5",
  "#FFC300", "#C70039", "#900C3F", "#581845", "#1D8348", "#1F618D"
];

// Function to generate a random color from the predefined set
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to initialize the game
function initGame() {
  targetColor = getRandomColor();
  colorBox.style.backgroundColor = targetColor;

  // Clear previous options
  colorOptions.innerHTML = '';

  // Generate 6 color options, one of which is the target color
  const options = [targetColor];
  while (options.length < 6) {
    const randomColor = getRandomColor();
    if (!options.includes(randomColor)) {
      options.push(randomColor);
    }
  }

  // Shuffle the options
  options.sort(() => Math.random() - 0.5);

  // Create buttons for each color option
  options.forEach(color => {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.addEventListener('click', () => checkGuess(color));
    colorOptions.appendChild(button);
  });

  // Reset game status
  gameStatus.textContent = '';
  gameStatus.classList.remove('fade-in'); // Remove fade-in class initially
}

// Function to check if the guessed color is correct
function checkGuess(guessedColor) {
  if (guessedColor === targetColor) {
    gameStatus.textContent = 'Correct! 🎉';
    gameStatus.classList.add('fade-in'); // Add fade-in class for animation
    score++;
    progress++;
    scoreDisplay.textContent = score;
    updateProgressBar();

    // Delay before resetting the game
    setTimeout(() => {
      if (progress >= 5) {
        alert(`Congratulations! You've completed the game with a score of ${score}.`);
        resetGame();
      } else {
        initGame();
      }
    }, 1000); // 1-second delay
  } else {
    gameStatus.textContent = 'Wrong! Try again. 😢';
    gameStatus.classList.add('fade-in'); // Add fade-in class for animation

    // Delay before resetting the game
    setTimeout(() => {
      resetGame();
    }, 1000); // 1-second delay
  }
}

// Function to update the progress bar
function updateProgressBar() {
  const progressPercentage = (progress / 5) * 100;
  progressBar.style.width = `${progressPercentage}%`;
}

// Function to reset the game
function resetGame() {
  score = 0;
  progress = 0;
  scoreDisplay.textContent = score;
  updateProgressBar();
  initGame();
}

// Event listener for the new game button
newGameBtn.addEventListener('click', () => {
  resetGame();
});

// Initialize the game on page load
initGame();