import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import VendingMachine from './VendingMachine';
import PopCorn from './PopCorn';
import Parrot from './Parrot';
import Vegetables from './Vegetables';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <VendingMachine />
        </Route>
        <Route exact path="/popcorn">
          <PopCorn />
        </Route>
        <Route exact path="/parrot">
          <Parrot />
        </Route>
        <Route exact path="/vegetables">
          <Vegetables />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
