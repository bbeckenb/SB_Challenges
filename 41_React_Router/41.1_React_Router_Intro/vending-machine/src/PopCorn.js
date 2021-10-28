import React from "react";
import { Link } from 'react-router-dom';
import "./PopCorn.css"

function PopCorn() {
    return (
        <div className="PopCorn">
            <h1>I'm a popppppped corn</h1>
            <img src="https://media1.giphy.com/media/8qYZVLJ3HRdqo/200.gif" alt="popcorn deer"></img>
            <button className="PopCorn-button"><Link to="/">Go Back</Link></button>
        </div>
    )
}

export default PopCorn;