import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [listContainer, setListContainer] = useState([]);
  const [text, onChangeText] = useState("");
  const [placeholder, setPlaceholder] = useState("enter item here");
  const [appState, setAppState] = useState("initial");
  const [revealFontSize, setRevealFontSize] = useState("2.4rem");
  const [lastGroup, setLastGroup] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [animatedList, setAnimatedList] = useState("reveal-div App-logo");
  const [viewWidth, setViewWidth] = useState(0);

  useEffect(() => {
    setViewWidth(window.innerWidth);
    console.log(viewWidth);
    if (viewWidth > 700) {
      setRevealFontSize("6rem");
      if (selectedItem.length > 9) {
        setRevealFontSize("3rem");
      }
      if (selectedItem.length < 5) {
        setRevealFontSize("9rem");
      }
    } else {
      if (selectedItem.length > 7) {
        setRevealFontSize("1.4rem");
      }
    }
  }, [viewWidth, selectedItem, appState]);

  let itemStyle = {};
  if (appState === "reveal") {
    itemStyle = {
      textAlign: "center",
      fontSize: revealFontSize,
      verticalAlign: "center",
      margin: "auto",
      alignSelf: "center",
    };
  }

  const deleteItem = (index) =>
    setListContainer(listContainer.filter((value, i) => i !== index));

  const generateList = listContainer.map((items, index) => (
    <div key={index}>
      {appState === "initial" && (
        <button className="item-holder" onClick={() => deleteItem(index)}>
          <h3 style={itemStyle}>{items}</h3>
        </button>
      )}
      {appState === "reveal" && (
        <div className="reveal-holder App-logo">
          <h3 style={itemStyle}>{items}</h3>
        </div>
      )}
    </div>
  ));

  const addItem = (event) => {
    if (text.trim().length > 0) {
      const cleanedInput = text.trim().toLowerCase();
      if (
        listContainer.find(
          (entry) => entry.trim().toLowerCase() === cleanedInput
        )
      ) {
        setPlaceholder("This is a duplicate entry");
        onChangeText("");
        event.preventDefault();
        setAppState("initial");
      } else {
        setListContainer([...listContainer, text.trim()]);
        setPlaceholder("enter item here");
        onChangeText("");
        event.preventDefault();
        setAppState("initial");
        setPlaceholder("enter item here");
      }
    } else {
      setPlaceholder("Invalid entry. Item was blank");
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    onChangeText(event.target.value);
    event.preventDefault();
  };

  const chooseItem = () => {
    setLastGroup(listContainer);
    const choice =
      listContainer[Math.floor(Math.random() * listContainer.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAppState("reveal");
    setPlaceholder("The decision has been made!");
  };

  const resetReveal = () => {
    setAppState("initial");
    setAppState("reveal");
    setAnimatedList("reveal-div App-logo");
  };

  const chooseAgainWith = () => {
    const choice = lastGroup[Math.floor(Math.random() * lastGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAnimatedList("reveal-div App-logo");
    resetReveal();
  };

  const chooseAgainWithout = () => {
    // *** this next line should be lastGroup.length < 1, app is behaving incorrectly, need to find bug, unless it is just because of delay in state updating
    if (lastGroup.length < 2) {
      setListContainer(["list is empty"]);
      return;
    }
    console.log(lastGroup);
    let updatedGroup = lastGroup.filter((item) => item !== selectedItem);
    const choice =
      updatedGroup[Math.floor(Math.random() * updatedGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setLastGroup(updatedGroup);
    setAnimatedList("reveal-div App-logo");
    resetReveal();
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className="header-text">Decidr</span>
      </header>
      {appState === "initial" && (
        <div className="list-parent">
          {listContainer.length === 0 && (
            <>
              <p>Let me help you choose!</p>
              <p style={{ margin: ".4rem" }}>
                Please enter at least two items to select from
              </p>
            </>
          )}
          <div className="list-div">{generateList}</div>
          {listContainer.length === 1 && (
            <p style={{ margin: "1.2rem", marginBottom: "2.4rem" }}>
              Enter at least one more item to choose from
            </p>
          )}
          {listContainer.length > 0 && (
            <p className="delete-message">Click on any item to delete it</p>
          )}
        </div>
      )}
      {appState === "reveal" && (
        <div className="reveal-parent">
          <div className={animatedList}>{generateList}</div>
        </div>
      )}

      <form onSubmit={addItem}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus
        ></input>
        <button className="button-style" type="submit">
          Add Item
        </button>
      </form>
      {listContainer.length > 1 && (
        <button className="button-style" onClick={chooseItem}>
          Select Item
        </button>
      )}
      {appState === "reveal" && (
        <div>
          <button
            className="button-style"
            onClick={() => {
              setAnimatedList("reveal-div reveal-again");
              setListContainer(lastGroup);
              chooseAgainWith();
            }}
          >
            Choose again with {listContainer}
          </button>
          <button
            className="button-style"
            onClick={() => {
              setListContainer(
                lastGroup.filter((item) => item !== selectedItem)
              );
              chooseAgainWithout();
              setAnimatedList("reveal-div reveal-again");
              console.log("new choices:", listContainer);
            }}
          >
            Choose again without {listContainer}
          </button>
          <button
            className="button-style"
            onClick={() => {
              setAppState("initial");
              setListContainer([]);
              setPlaceholder("enter item here");
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
