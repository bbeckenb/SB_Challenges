import React from "react";
import { NavLink } from "react-router-dom";
import {NavItem, Nav} from 'reactstrap';

function NavBarNoUser() {
    return (
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink to="/signup">Sign Up</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/login">Login</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavBarNoUser;