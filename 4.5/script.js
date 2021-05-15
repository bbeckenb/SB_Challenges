const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let cards_picked = 0; //used to control in main click function amount of cards you can pick
let previous = { //utilized to store memory and compare 'previous card' to current card
  color: 'blank', unique_id: 9, card_1: 'holder'
};

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let unique_id = 0; //will allow program to distinguish unique elements even if they are the same color (so you cannot choose the same card twic to make it stick)
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over DONE
    newDiv.classList.add('hidden_card'); //decided to give all cards same class and compare using element attributes and a global variable
    newDiv.setAttribute('color', color); //for quick toggling capability
    newDiv.setAttribute('unique_id', unique_id); //gives card unique id to compare against same color/ same card situations
    newDiv.setAttribute('matched', false); //add robustness so cards that have been matched stay their color

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    unique_id++; //increases unique id value through loop iteration
  }
  
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  console.log("you just clicked", event.target); //used for troubleshooting
  console.log(event.target.getAttribute('color'));
  console.log(event.target.getAttribute('unique_id'));

  if (cards_picked < 2 && (event.target.getAttribute('matched') !== 'true')) { //ensures action is only taken if cards_picked is under 2 and the clicked card has not already been matched
    let current_card = event.target;
    let card_color = current_card.getAttribute('color');
    let card_unique_id = current_card.getAttribute('unique_id');
    cards_picked++; 
    if (cards_picked === 1) { //this is the first card picked so it stores the values of this card for compare with the second card to be picked and changes its color
      current_card.style.backgroundColor = card_color;
      previous['color'] = card_color;
      previous['unique_id'] = card_unique_id;
      previous['card_1'] = current_card;
    }
    else if (cards_picked === 2) { //once the second card is picked it is compared with the first stored in the global memory object 'previous', this handles the scenario where the cards are not a match and reverts them back to the 'hidden' color after 1 second and resets the cards_picked count
      current_card.style.backgroundColor = card_color;
      if (previous['color'] !== card_color) {
        setTimeout(function() {
          previous['card_1'].style.backgroundColor = 'seashell';
          current_card.style.backgroundColor = 'seashell';
          cards_picked = 0;
        }, 1000) 
      }
      else if (previous['unique_id'] === card_unique_id) { //this handles the scenario where the cards have the same color attribute BUT must be the same card because they have the same unique id
        alert('You cannot pick the same card!'); //sends out alert that we are onto you, dirty memory game cheats!
        cards_picked = 1; //resets the cards_picked
      } 
      else { //this is the last possible scenario, the cards must be a color match with a unique id so we set the 'matched' attribute to true
        current_card.setAttribute('matched', true);
        previous['card_1'].setAttribute('matched', true);
        cards_picked = 0; //resets cards picked to 0
      }
    } 
  }
  
  console.log("cards_picked count", cards_picked);

 
}

// when the DOM loads
createDivsForColors(shuffledColors);
