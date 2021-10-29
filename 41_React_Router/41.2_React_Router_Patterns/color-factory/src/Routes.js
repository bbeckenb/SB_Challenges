import React, {useState} from "react";
import { Route, Switch, Redirect} from "react-router";
import ColorList from "./ColorList";
import Color from "./Color";

function Routes() {
    const [colors, setColors] = useState([]);
    function addColor(newColor) {
        setColors(colors => [newColor, ...colors])
    }
    return (
        <Switch>
            <Route exact path="/colors/:name"><Color colors={colors}/></Route>
            <Route exact path="/colors"><ColorList addColor={addColor} colors={colors}/></Route>
            <Redirect to="/colors"></Redirect>
        </Switch>
    )
}

export default Routes;