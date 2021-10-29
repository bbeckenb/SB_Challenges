import React from "react";
import { Link, useParams } from "react-router-dom";
import './Color.css'

function Color({colors}) {
    const {name} = useParams();
    let colorCode = colors.filter(color => color.name === name);
    return (
        <div className="Color" style={{backgroundColor:colorCode[0].color}}>
            <h1>This is {name}</h1>
            <div className="Color-Display" ></div>
            <Link to="/colors">Go Back!</Link>
        </div>
    )
}

export default Color;