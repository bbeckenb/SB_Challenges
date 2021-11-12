import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from 'reactstrap';

function NoUserLinks() {
    return (
        <ListGroup>
                <Link to="/signup">Sign Up</Link>  
                <Link to="/login">Login</Link>
        </ListGroup>
    )
}

export default NoUserLinks;