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
  const [animNumber, setAnimNumber] = useState(1);
  const [animatedList, setAnimatedList] = useState(
    `reveal-div reveal-${animNumber.toString()}`
  );
  const [viewWidth, setViewWidth] = useState(0);
  const [lastAnim, setLastAnim] = useState(0);

  useEffect(() => {
    setViewWidth(window.innerWidth);
    if (viewWidth > 700) {
      setRevealFontSize("6rem");
      if (viewWidth < 1000 && selectedItem.length > 7) {
        setRevealFontSize("4rem");
      } else if (selectedItem.length > 9) {
        setRevealFontSize("3rem");
      } else if (selectedItem.length < 5) {
        setRevealFontSize("9rem");
      }
    } else {
      if (selectedItem.length > 7) {
        setRevealFontSize("1.8rem");
      } else {
        setRevealFontSize("3rem");
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

  const chooseAnim = () => {
    // hard-coded number of animations in next line
    let anim = Math.floor(Math.random() * 11) + 1;
    if (anim === lastAnim) {
      chooseAnim();
    }
    setAnimNumber(anim);
    setLastAnim(anim);
  };

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
        <div className={`reveal-holder reveal-${animNumber.toString()}`}>
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
    chooseAnim();
    setLastGroup(listContainer);
    const choice =
      listContainer[Math.floor(Math.random() * listContainer.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAppState("reveal");
    setPlaceholder("The decision has been made!");
  };

  const resetReveal = () => {
    chooseAnim();
    setAppState("initial");
    setAppState("reveal");
    setAnimatedList("reveal-div reveal-" + animNumber.toString());
  };

  const chooseAgainWith = () => {
    chooseAnim();
    const choice = lastGroup[Math.floor(Math.random() * lastGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setAnimatedList("reveal-div reveal-" + animNumber.toString());
    resetReveal();
  };

  const chooseAgainWithout = () => {
    chooseAnim();
    // *** this next line should be lastGroup.length < 1, app is behaving incorrectly, need to find bug, unless it is just because of delay in state updating
    if (lastGroup.length < 2) {
      setListContainer(["list is empty"]);
      return;
    }
    let updatedGroup = lastGroup.filter((item) => item !== selectedItem);
    const choice =
      updatedGroup[Math.floor(Math.random() * updatedGroup.length)];
    setListContainer([choice]);
    setSelectedItem(choice);
    setLastGroup(updatedGroup);
    setAnimatedList("reveal-div reveal-" + animNumber.toString());
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
            <div style={{ margin: "1.2rem", marginBottom: "2.4rem" }}>
              <p style={{ marginBottom: ".3rem" }}>
                Enter at least one more item to choose from.
              </p>
              <p style={{ fontStyle: "italic", fontSize: ".9rem" }}>
                Click on any item to delete it
              </p>
            </div>
          )}
          {listContainer.length > 1 && (
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
      {listContainer.length > 1 && appState === "initial" && (
        <>
          <button
            className="button-style"
            onClick={() => {
              chooseAnim();
              chooseItem();
            }}
          >
            Select Item
          </button>
          <button
            className="button-style"
            onClick={() => {
              setListContainer([]);
            }}
          >
            Clear List
          </button>
        </>
      )}
      {appState === "reveal" && listContainer[0] !== "list is empty" && (
        <div>
          <button
            className="button-style"
            onClick={() => {
              chooseAnim();
              setAnimatedList("reveal-div reveal-" + animNumber.toString());
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
              setAnimatedList("reveal-div reveal-" + animNumber.toString());
            }}
          >
            Choose again without {listContainer}
          </button>
        </div>
      )}
      {appState === "reveal" && (
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
      )}
    </div>
  );
}

export default App;
