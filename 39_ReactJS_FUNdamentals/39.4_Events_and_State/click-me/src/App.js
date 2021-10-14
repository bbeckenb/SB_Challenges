import React from "react";
import "./App.css";
import ClickRando from "./ClickRando";
import BrokenClick from "./BrokenClick";
import GoodClick from "./GoodClick";
import Complex from "./Complex";
import ButtonGroup from "./ButtonGroup";
import Counter from "./Counter";

function App() {
  return (
    <div className="App">
      <BrokenClick />
      <GoodClick />
      <ClickRando maxNum={10} />
      <Complex text="PUSH ME" maxNum={100} />
      <ButtonGroup />
    </div>
  );
}

export default App;
