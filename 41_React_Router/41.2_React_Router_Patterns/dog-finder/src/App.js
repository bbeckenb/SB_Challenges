import './App.css';
import { BrowserRouter } from "react-router-dom";
import React from 'react';
import Nav from './Nav';
import Routes from './Routes';
import perry from './perry.jpg'
import whiskey from './whiskey.jpg'
import tubby from './tubby.jpg'
import duke from './duke.jpg'

function App({dogs}) {
  return (
    <div className="App">
      <h1>I am dog finder app!</h1>
      <BrowserRouter>
        <Nav dogs={dogs}/>
        <Routes dogs={dogs}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    },
    {
      name: "Tubby",
      age: 4,
      src: tubby,
      facts: [
        "Tubby is really stupid.",
        "Tubby does not like walks.",
        "Angelina used to hate Tubby, but claims not to anymore."
      ]
    }
  ]
}