import React, { useState } from "react";
import "./BoxList.css"
import { v4 as uuid } from 'uuid';
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

function BoxList() {
    const [listOfBoxes, updateBoxes] = useState([]) //{id: uuid(), color:"aqua", width:"200", height:"200"}
    function removeBox(boxId) {
        updateBoxes(boxes => boxes.filter(b => b.id !== boxId))
    }
    function addBox(newBox) {
        updateBoxes(boxes => [...boxes, { ...newBox, id: uuid() }])
    }


    return (
        <div>
            <h1>Make Boxes!</h1>
            <NewBoxForm addBox={addBox} />
            <div>
            {listOfBoxes.map(({id, color, height, width}) => <Box key={id} id={id} color={color} width={width} height ={height} removeBox={evt => removeBox(`${id}`)}/>)}
            </div>
            
        </div>
    )
}

export default BoxList;