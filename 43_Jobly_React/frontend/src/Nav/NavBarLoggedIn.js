import React, {useContext} from "react";
import UserContext from "../User/UserContext";
import { NavLink } from "react-router-dom";
import {NavItem, Nav} from 'reactstrap';

function NavBarLoggedIn({ logout }) {
    const {currUser} = useContext(UserContext);

    return (
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={logout} to="/">{`Logout ${currUser.username}`}</NavLink>
            </NavItem>
        </Nav>
    )
}

export default NavBarLoggedIn;