import React from "react";
import { Link } from 'react-router-dom';
import './Vegetables.css';

function Vegetables() {
    return (
        <div className="Vegetables">
            <h1>LOL JK I'M CANDY</h1>
            <img src="https://media2.giphy.com/media/LqgrRiLbCwrCcopc79/giphy.gif" alt="candy"></img>
            <button className="Vegetables-button"><Link to="/">Go Back</Link></button>
        </div>
    )
}

export default Vegetables;