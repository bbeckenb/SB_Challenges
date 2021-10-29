import React from "react";
import {Link} from 'react-router-dom'

function DogDetails({dog}) {
    return (
        <div className="DogDetails">
            <img src={dog.src} alt={dog.name}></img>
            <h4>Name: {dog.name}</h4>
            <h5>Age: {dog.age}</h5>
            <ul>
                {dog.facts.map(fact => <li>{fact}</li>)}
            </ul>
            <Link to="/dogs">Go Back!</Link>
        </div>
    )
}

export default DogDetails;