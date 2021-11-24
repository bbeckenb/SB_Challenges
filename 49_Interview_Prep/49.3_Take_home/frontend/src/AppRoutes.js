import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import AdminPage from './AdminPage';
import UserRegister from './users/UserRegister';

function AppRoutes() {
    return(
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/register"><UserRegister /></Route>
            <Route exact path="/admin"><AdminPage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default AppRoutes;