import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [listContainer, setListContainer] = useState([]);
  const [text, onChangeText] = useState("");
  const [placeholder, setPlaceholder] = useState("enter item here");
  const [appState, setAppState] = useState("initial");
  const [revealFontSize, setRevealFontSize] = useState("6rem");
  const [lastGroup, setLastGroup] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  let itemStyle = {};
  if (appState === "reveal") {
    itemStyle = {
      textAlign: "center",
      fontSize: "6rem",
      verticalAlign: "center",
    };
  }

  const generateList = listContainer.map((items, index) => (
    <div key={index}>
      <h3 style={itemStyle}>{items}</h3>
    </div>
  ));

  const addItem = (event) => {
    if (text.trim().length > 0) {
      setListContainer([...listContainer, text.trim()]);
      setPlaceholder("enter item here");
      onChangeText("");
      event.preventDefault();
      console.log("listContainer=", listContainer);
    } else {
      setPlaceholder("Invalid entry. Item was blank");
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    onChangeText(event.target.value);
    event.preventDefault();
    // console.log("changeText=", text);
  };

  const chooseItem = () => {
    setLastGroup(listContainer);
    const choice =
      listContainer[Math.floor(Math.random() * listContainer.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAppState("reveal");
  };

  const chooseAgainWith = () => {
    // setLastGroup(listContainer);
    const choice = lastGroup[Math.floor(Math.random() * lastGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAppState("reveal");
  };

  const chooseAgainWithout = () => {
    // setLastGroup(listContainer);
    let updatedGroup = lastGroup.filter((item) => item !== selectedItem);
    const choice =
      updatedGroup[Math.floor(Math.random() * updatedGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAppState("reveal");
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className="header-text">Decidr</span>
      </header>
      {appState === "initial" && (
        <div className="list-parent">
          <div className="list-div">{generateList}</div>
        </div>
      )}
      {appState === "reveal" && (
        <div className="reveal-parent">
          <div className="reveal-div">{generateList}</div>
        </div>
      )}

      <form onSubmit={addItem}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          // placeholder="enter item here"
          autoFocus
        ></input>
        <button type="submit">Add Item</button>
      </form>
      {listContainer.length > 1 && (
        <button onClick={chooseItem}>Select Item</button>
      )}
      {appState === "reveal" && (
        <div>
          <button
            onClick={() => {
              // setAppState("initial");
              setListContainer(lastGroup);
              chooseAgainWith();
            }}
          >
            Choose again with {listContainer}
          </button>
          <button
            onClick={() => {
              setListContainer(
                lastGroup.filter((item) => item !== selectedItem)
              );
              // setAppState("initial");
              chooseAgainWithout();
              console.log("new choices:", listContainer);
            }}
          >
            Choose again without {listContainer}
          </button>
          <button
            onClick={() => {
              setAppState("initial");
              setListContainer([]);
            }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
