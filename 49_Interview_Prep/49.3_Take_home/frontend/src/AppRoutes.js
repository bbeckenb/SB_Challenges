import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import AdminPage from './AdminPage';

function AppRoutes() {
    return(
        <Switch>
            <Route exact path="/"><h1>Home</h1></Route>
            <Route exact path="/register"><h1>REGISTER</h1></Route>
            <Route exact path="/admin"><AdminPage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default AppRoutes;