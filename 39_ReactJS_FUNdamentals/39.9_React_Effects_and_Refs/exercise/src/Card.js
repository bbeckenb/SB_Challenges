import React from "react";

function Card({image, value, suit, code}) {

    return (
        <div>
            <img src={image} alt={`${value} of ${suit}, ${code}`}></img>
        </div>
    )
}

export default Card;