import React from "react";
import "./Todo.css"

function Todo({id, color, todo, removeTodo}) {

    return (
        <div key={id} id={id} style={{backgroundColor: color, 
                              width: '200px',
                              height: '75px'
        }}>
            <button onClick={removeTodo}>X</button>
            <h4>{todo}</h4>
        </div>
    )
}

export default Todo;