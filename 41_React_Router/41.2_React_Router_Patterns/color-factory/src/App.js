import './App.css';
import Routes from './Routes';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>I'm a color factory!!!</h1>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
