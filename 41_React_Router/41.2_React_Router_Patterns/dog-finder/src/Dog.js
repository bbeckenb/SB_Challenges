import React from "react";
import {Link} from 'react-router-dom'

function Dog({dog}) {
    return (
        <div className="Dog">
            <h4>Name: {dog.name}</h4>
            <Link to={`/dog/${dog.name}`}>{dog.name} Details!</Link>
        </div>
    )
}

export default Dog;