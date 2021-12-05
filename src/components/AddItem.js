import React, { useState } from "react";
import "../App.css";

function AddItem({
  listContainer,
  setListContainer,
  setPlaceholder,
  setAppState,
  placeholder,
}) {
  const [text, onChangeText] = useState("");

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

  return (
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
  );
}

export default AddItem;
