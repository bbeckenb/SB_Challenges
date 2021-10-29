import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import DogList from "./DogList";
import Dog from "./Dog";
import DogDetails from "./DogDetails";

function Routes({dogs}) {
    return (
        <Switch>
            {dogs.map(dog => <Route exact path={`/dog/${dog.name}`}><DogDetails dog={dog}/></Route>)}
            <Route exact path="/dog"><DogList dogs={dogs}/></Route>
            <Redirect to="/dog" />
        </Switch>
    )
}

export default Routes;