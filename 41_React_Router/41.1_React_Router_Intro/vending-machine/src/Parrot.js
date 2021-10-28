import React from "react";
import { Link } from 'react-router-dom';
import './Parrot.css';

function Parrot() {
    return (
        <div className="Parrot">
            <h1>SKWAWK!!! I'M A PARROT</h1>
            <img src="https://acegif.com/wp-content/uploads/2020/b72nv6/partyparrt-21.gif" alt="parrot pic"></img>
            <button className="Parrot-button"><Link to="/">Go Back</Link></button>
        </div>
    )
}

export default Parrot;