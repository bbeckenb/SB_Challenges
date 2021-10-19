import React from "react";
import "./Box.css"

function Box({id, color, width, height, removeBox}) {

    return (
        <div key={id} id={id} style={{backgroundColor: color, 
                              width: width+'px',
                              height: height+'px'
        }}>
            <button onClick={removeBox}>X</button>
        </div>
    )
}

export default Box;