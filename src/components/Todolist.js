import React, { useEffect, useState } from "react";
import "../App.css";
import icon from "../images/icon.png";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todolist = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const addItem = () => {
    if (!inputData) {
      alert("you must insert some task");
    } else {
      setItems([...items, inputData]);
      setInputData("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((elem, index) => {
      return index !== id;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="container">
        <div className="todo-app">
          <h2>
            To-Do List <img src={icon} alt="" />
          </h2>
          <div className="row">
            <input
              type="text"
              placeholder="Add the task"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button onClick={addItem}>Add</button>
          </div>
          <ul>
            {items.map((elem, index) => {
              return (
                <li
                  className="checked"
                  key={index}
                  onClick={(e) => e.target.classList.toggle("checked")}
                >
                  {elem}
                  <i
                    className="far fa-trash-alt"
                    onClick={() => deleteItem(index)}
                  ></i>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todolist;
