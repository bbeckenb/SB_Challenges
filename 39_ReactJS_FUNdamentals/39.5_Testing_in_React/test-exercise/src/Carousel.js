import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

function Carousel(props) {
  const [cardIdx, setCardIdx] = useState(0);
  const [leftArrVis, setLeftVisibility] = useState(false);
  const [rightArrVis, setRightVisibility] = useState(true);
  const card = props.cardData[cardIdx];
  const total = props.cardData.length;
  const goForward = () => {
    setCardIdx(cardIdx + 1);
    console.log(cardIdx)
    if (cardIdx === total-2) {
      setRightVisibility(false)
    } else {
      setRightVisibility(true)
    }
    setLeftVisibility(true)
  }
  const goBackward = () => {
    setCardIdx(cardIdx - 1);
    if (cardIdx === 1) {
      setLeftVisibility(false)
    } else {
      setLeftVisibility(true)
    }
    setRightVisibility(true)
  }
  console.log(leftArrVis)
  console.log(rightArrVis)
  console.log(cardIdx)
  console.log(total-1)
  

  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        <i
          className="fas fa-chevron-circle-left fa-2x"
          onClick={goBackward}
          style={{visibility: leftArrVis ? "visible":"hidden"}}
          data-testid="left-arrow"
        />
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
       <i
          className="fas fa-chevron-circle-right fa-2x"
          onClick={goForward}
          style={{visibility: rightArrVis ? "visible":"hidden"}}
          data-testid="right-arrow"
        />
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
