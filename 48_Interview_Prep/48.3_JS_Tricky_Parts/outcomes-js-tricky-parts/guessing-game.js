function guessingGame() {
    let randomNum = Math.random()*100;
    let guessCount=0;
    let won=false;
    return function guessNum(guess) {
        if (won) {
            return "The game is over, you already won!"
        }
        guessCount++;
        if (guess === randomNum) {
            won=true;
            return(`You win! You found 60 in ${guessCount} guesses.`);
        } else if (guess > randomNum) {
            return(`${guess} is too high!`);
        } else {
            return(`${guess} is too low!`);
        } 
    }
}

module.exports = { guessingGame };
