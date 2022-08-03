import cx from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import styles from "../styles/Home.module.css";

const Wrapper = styled.div`
    font-size: 3em;
    text-align: center;
    color: palevioletred;
  `;
const MainHeader = styled.h1`
  color: ${props => props.color && props.color};
`;
const Inputs = styled.input` 
    width:300px; 
    height:30px;
    font-size:30px;
`;
const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([]);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleAdd = () => { 
    if (todoItem) {
      setItems([
        {
          id: uuidv4(),
          message: todoItem,
          done: false,
        },
        ...items,
      ]);

      setTodoItem(""); 
    }
  };

  const handleDone = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    });

    setItems(_items);
  };

  return (
    <Wrapper>
      <div>
        <MainHeader color="red">Todo App</MainHeader>
      </div>

      <div>
        <Inputs
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={handleEnter}
        /> 
      </div>
 
      <ul>
        {items
          .filter(({ done }) => !done)
          .map(({ id, message }) => (
            <li
              key={id}
              className={cx(styles.item)}
              onClick={() => handleDone(id)}
            >
              {message}
            </li>
          ))}

        {items
          .filter(({ done }) => done)
          .map(({ id, message }) => (
            <li
              key={id}
              className={cx(styles.item, styles.done)}
              onClick={() => handleDone(id)}
            >
              {message}
            </li>
          ))}
      </ul>

      <div>
      <h6>Made by Geoffrey Jing</h6>
      </div>
    </Wrapper>
  );
};
 
export default Home