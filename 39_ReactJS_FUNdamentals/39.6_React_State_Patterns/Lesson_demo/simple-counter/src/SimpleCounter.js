import React, { useState } from "react";

function SimpleCounter() {
  const [num, setNum] = useState(0);
  function clickUp() {
    setNum(n => num + 1);
  }

  function clickUpBy2() {
    // this version will not work because it is essentially updating the same piece of memory twice without officially updating the state
    // setNum(num + 1);
    // setNum(num + 1);
    // this version will actually modify the memory
    setNum(n => num + 1);
    setNum(n => num + 1);
  }

  return (
    <div>
      <h3>Count: {num}</h3>
      <button onClick={clickUp}>Up</button>
      <button onClick={clickUpBy2}>Up By 2</button>
    </div>
  );
}

export default SimpleCounter;
