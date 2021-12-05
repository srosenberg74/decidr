import React from 'react'

function DisplayList({setListContainer, listContainer, itemStyle, appState, animNumber}) {

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

    return (
        <div className="list-div">{generateList}</div>
    )
}

export default DisplayList
