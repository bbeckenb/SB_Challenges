import React from 'react';
import { Link } from 'react-router-dom';
import './VendingMachine.css'

function VendingMachine() {
    return (
        <div className="VendingMachine">
            <h1 className="VendingMachine-Title">Vendy Vending Machine</h1>
            <ul className="VendingMachine-list">
                <li className="VendingMachine-list-item"><Link className="VendingMachine-Link" to="/popcorn">Pop corn</Link></li>
                <li className="VendingMachine-list-item"><Link className="VendingMachine-Link" to="/parrot">Parrot Snak</Link></li>
                <li className="VendingMachine-list-item"><Link className="VendingMachine-Link" to="/vegetables">Eat Vegetables : (</Link></li>
            </ul>
        </div>
    )
}

export default VendingMachine;