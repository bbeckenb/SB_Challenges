import React from "react";
import Dog from "./Dog";

function DogList({dogs}) {
    return (
        <div className="DogList">
            {dogs.map(dog => <Dog dog={dog}/>)}
        </div>
    )
}

export default DogList;