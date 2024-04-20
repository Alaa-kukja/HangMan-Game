const wordDisplay = document.querySelector('.word-display');
const hangmanImage = document.querySelector('.hangman-box img');
const guessesText = document.querySelector('.guesses-text b');
const keyboardDiv = document.querySelector('.keyboard');
const gameModule = document.querySelector('.game-model');
const playAgainBtn = document.querySelector('.play-again');

let currentWord, correctLetters, wrongGuessedCount;

const maxGuessed = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessedCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessedCount}.svg`;
    guessesText.innerText = `${wrongGuessedCount} / ${maxGuessed}`;
    keyboardDiv.querySelectorAll('button').forEach((btn) => (btn.disabled = false));
    wordDisplay.innerHTML = currentWord
        .split('')
        .map(() => `<li class="letter"></li>`)
        .join('');
    gameModule.classList.remove('show');
};

const getRandomWord = () => {
    // selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord = word;

    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word: ` : `The correct word was: `;
        gameModule.querySelector('img').src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModule.querySelector('h4').innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModule.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModule.classList.add('show');
    }, 300);
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        });
    } else {
        wrongGuessedCount++;
        hangmanImage.src = `images/hangman-${wrongGuessedCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessedCount} / ${maxGuessed}`;

    if (wrongGuessedCount === maxGuessed) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};
// creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement('button');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener('click', (e) => initGame(e.target, String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord);
