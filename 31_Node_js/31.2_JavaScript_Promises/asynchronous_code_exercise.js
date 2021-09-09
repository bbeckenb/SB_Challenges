// 1. Make a request to the Numbers API (http://numbersapi.com/) 
// to get a fact about your favorite number. (Make sure you 
// get back JSON by including the json query key, specific to this 
// API. Details.
let res = axios.get('http://numbersapi.com/3/trivia?json')
    .then(res => {
        console.log('SUCCESS!', res);
    })
    .catch(err => {
        console.log('ERROR!', err);
    })


// 2. Figure out how to get data on multiple numbers in a single request. 
// Make that request and when you get the data back, put all of the number 
// facts on the page.
let numFactArray = [];
for (let i=0; i<3; i++) {
    numFactArray.push(axios.get(`http://numbersapi.com/${i}/trivia?json`));
}
let list = document.querySelector('#nums')
Promise.all(numFactArray)
    .then(factArr => {
        for (res of factArr) {
           let listItem = document.createElement("li");
           listItem.innerText = res.data.text;
            list.append(listItem);
        }
    })
    .catch(err => console.log(err))


// 3. Use the API to get 4 facts on your favorite number. Once you have 
// them all, put them on the page. It’s okay if some of the facts are 
// repeats. (Note: You’ll need to make multiple requests for this.)

let list1 = document.querySelector("#one-num");
for (let i=0; i<4; i++) {
    axios.get('http://numbersapi.com/3/trivia?json')
    .then(res => {
        let listItem = document.createElement("li");
        listItem.innerText = res.data.text;
        list1.append(listItem);
        console.log('SUCCESS!', res);
    })
    .catch(err => {
        console.log('ERROR!', err);
    })
}

// Make a request to the Deck of Cards API to request a single card from a 
// newly shuffled deck. Once you have the card, console.log the value and 
// the suit (e.g. “5 of spades”, “queen of diamonds”).
axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        console.log(res)
        return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => console.log('FAILED'))

// Make a request to the deck of cards API to request a single card from a 
// newly shuffled deck. Once you have the card, make a request to the same 
// API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.
cardsDrawnArray = [];
axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        console.log(res)
        return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        cardsDrawnArray.push(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        // console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`)
    })
    .then(res => {
        cardsDrawnArray.push(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        // console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
        for (i=0; i<cardsDrawnArray.length; i++) {
            console.log(cardsDrawnArray[i])
        }
    })
    .catch(err => console.log('FAILED', err))

// Build an HTML page that lets you draw cards from a deck. When the page 
// loads, go to the Deck of Cards API to create a new deck, and show a 
// button on the page that will let you draw a card. Every time you click 
// the button, display a new card, until there are no cards left in 
// the deck.

let cardStack = document.querySelector('#card-stack');
let getCardBtn = document.querySelector('#get-card');
let countDisplay = document.querySelector('#card-count');
let deckID = '';
let cardCount = 0;

axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckID = res.data.deck_id;
    })
    .catch(err => console.log('FAILED'))

getCardBtn.addEventListener('click', function(e) {
    if (cardCount === 52) {
        axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(res => {
                deckID = res.data.deck_id;
                cardStack.src='';
                cardCount = 0;
                countDisplay.innerText = `${cardCount}`
            })
            .catch(err => console.log('FAILED', err))
    } else {
        axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
        .then(res => {
            cardStack.src=res.data.cards[0].image;
            cardCount++;
            countDisplay.innerText = `${cardCount}`
        })
        .catch(err => console.log('FAILED', err))
    }
    
})