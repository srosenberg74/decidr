import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [listContainer, setListContainer] = useState(["Hey", "How are you"]);

  const generateList = listContainer.map((items, index) => (
    <div>
      <h3>{items}</h3>
    </div>
  ));

  return (
    <div className="App">
      <header className="App-header">Decidr</header>
      <div className="list-div">{generateList}</div>
      <input type="text"></input>
      <button>Add Item</button>
    </div>
  );
}

export default App;
