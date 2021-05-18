// let counter = 0; //global counter variable to store our count #

// function randomGame() {
//     let x = Math.random(); //gives us our # between 1 and 0, I know 1 is excluded
//     counter += 1; //adds to our counter each function call
//     if (x > .75) { //if our random # is >.75 we output the # of times it took to get a #>.75 and clears our interval
//         console.log(`It took ${counter} times to get ${x} which is greater than .75!`);
//         clearInterval(randomGameTimer);
//     }
// }

// let randomGameTimer = setInterval(randomGame, 1000); //our interval timer that calls our randomGame function each second

function randomGame() {
    let count = 1;
    let x = Math.random();
    let repetition = setInterval(function(){
        if (x > .75) {
            console.log(`It took ${count} times to get ${x} which is greater than .75!`);
            clearInterval(repetition);
        }
        else {
            count++;
            x = Math.random();
        }
    }, 1000)
}

randomGame();