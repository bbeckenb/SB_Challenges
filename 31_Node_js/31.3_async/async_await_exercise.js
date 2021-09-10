// 1. Make a request to the Numbers API (http://numbersapi.com/) 
// to get a fact about your favorite number. (Make sure you 
// get back JSON by including the json query key, specific to this 
// API. Details.
async function getNumTrivia(num) {
    let res =  await axios.get(`http://numbersapi.com/${num}/trivia?json`);
    console.log(res)
}
getNumTrivia(7);

// 2. Figure out how to get data on multiple numbers in a single request. 
// Make that request and when you get the data back, put all of the number 
// facts on the page.
async function getNumsTrivias(num) {
    let numFactArray = [];
    for (let i=0; i<num; i++) {
        numFactArray.push(axios.get(`http://numbersapi.com/${i}/trivia?json`));
    }
    let list = document.querySelector('#nums')
    let trivias = await Promise.all(numFactArray);
    for (res of trivias) {
        let listItem = document.createElement("li");
        listItem.innerText = res.data.text;
         list.append(listItem);
    }
}

getNumsTrivias(6);

// 3. Use the API to get 4 facts on your favorite number. Once you have 
// them all, put them on the page. It’s okay if some of the facts are 
// repeats. (Note: You’ll need to make multiple requests for this.)


async function getNumsTriviasSameNum(num) {
    let numFactArray = [];
    for (let i=0; i<4; i++) {
        numFactArray.push(axios.get(`http://numbersapi.com/${num}/trivia?json`));
    }
    let list = document.querySelector('#one-num')
    let trivias = await Promise.all(numFactArray);
    for (res of trivias) {
        let listItem = document.createElement("li");
        listItem.innerText = res.data.text;
         list.append(listItem);
    }
}
getNumsTriviasSameNum(8);

// Make a request to the Deck of Cards API to request a single card from a 
// newly shuffled deck. Once you have the card, console.log the value and 
// the suit (e.g. “5 of spades”, “queen of diamonds”).

async function getOneCard() {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        let deckID = res.data.deck_id;
        let card1 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
}

getOneCard();




// Make a request to the deck of cards API to request a single card from a 
// newly shuffled deck. Once you have the card, make a request to the same 
// API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.
async function getTwoCards() {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        let deckID = res.data.deck_id;
        let card1 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        console.log(`${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
        let card2 = await axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        console.log(`${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
}

getTwoCards();


// Build an HTML page that lets you draw cards from a deck. When the page 
// loads, go to the Deck of Cards API to create a new deck, and show a 
// button on the page that will let you draw a card. Every time you click 
// the button, display a new card, until there are no cards left in 
// the deck.

let cardStack = document.querySelector('#card-stack');
let getCardBtn = document.querySelector('#get-card');
let countDisplay = document.querySelector('#card-count');

class CardDeck {
    constructor() {
        this.deckID = '';
        this.cardCount = 0;
        this.currentCard = ''
    }

    async getNewShuffledDeckID() {
        let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        this.deckID = res.data.deck_id;
        this.cardCount = 0
        cardStack.src='';
        countDisplay.innerText = `${this.cardCount}`  
    }
    async drawCardSuitVal() {
        let res = await axios.get(`http://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`)
        this.currentCard = res.data.cards[0].image
        cardStack.src=cardDeck1.currentCard;
        cardDeck1.cardCount++;
        countDisplay.innerText = `${cardDeck1.cardCount}`
    }
}


let cardDeck1 = new CardDeck()
cardDeck1.getNewShuffledDeckID();
getCardBtn.addEventListener('click', function(e) {
    if (cardDeck1.cardCount === 52) {
        cardDeck1.getNewShuffledDeckID();
                   
    } else {
        cardDeck1.drawCardSuitVal()
        
    }
    
})