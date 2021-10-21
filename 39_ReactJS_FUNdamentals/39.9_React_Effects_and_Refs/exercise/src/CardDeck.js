import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
import "./CardDeck.css"

const BASE_URL = "http://deckofcardsapi.com/api/deck/";

function CardDeck() {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState();

    useEffect(function getNewDeckOnFirstRender() {
        async function getNewDeck() {
            const newDeck = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
            setDeck(newDeck.data)
        }
        getNewDeck();
    }, [])

    async function getNewCardUpdateDeck() {
        const newCardandDeckInfo = await axios.get(`${BASE_URL}${deck.deck_id}/draw/?count=1`)
        cards ? setCards([...cards, newCardandDeckInfo.data.cards[0]]) : setCards([newCardandDeckInfo.data.cards[0]])
        setDeck({...deck, remaining: newCardandDeckInfo.data.remaining})
    }
    // console.log(deck.remaining)
    return (
        <div className="CardDeck">
            <h1>Card Drawer Game Thing!</h1>
            {deck && deck.remaining === 0 ? <div className="CardDeck-alert">HEY THERE'S NO MORE CARDS!</div> : <button className="CardDeck-btn" onClick={getNewCardUpdateDeck} style={{marginBottom:"50px"}}>Get New Card!</button>}
            {deck ? <h3>Card Count: {deck.remaining}</h3> : <></>}
            {cards ? <Card image={cards[cards.length-1].image} value={cards[cards.length-1].value} suit={cards[cards.length-1].suit} code={cards[cards.length-1].code} /> : <h3>No Cards Drawn Yet!</h3>}
            
        </div>
    )
}

export default CardDeck;