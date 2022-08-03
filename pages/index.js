import cx from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 3em;
  text-align: center;
  color: palevioletred;
`;
const MainHeader = styled.h1`
  color: ${(props) => props.color && props.color};
`;
const Inputs = styled.input`
  width: 300px;
  height: 30px;
  font-size: 30px;
`;

//
const ListItem = styled.li`
  color: ${(props) => (props.done ? "lightblue" : "blue")};
  text-decoration: ${(props) => props.done && "line-through"}; ;
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
        {/* naming convention: Inputs > InputItem */}
        <Inputs
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={handleEnter}
        />
      </div>

      {/* nice implementation to have done items at the bottom of the list with different styling.
Try to find a solution to achieve the same result without the redundancy of filtering and mapping
*/}
      <ul>
        {items
          .filter(({ done }) => !done)
          .map(({ id, message }) => (
            <ListItem key={id} onClick={() => handleDone(id)}>
              {message}
            </ListItem>
          ))}

        {items
          .filter(({ done }) => done)
          .map(({ id, message }) => (
            <ListItem done key={id} onClick={() => handleDone(id)}>
              {message}
            </ListItem>
          ))}
      </ul>

      <div>
        <h6>Made by Geoffrey Jing</h6>
      </div>
    </Wrapper>
  );
};

export default Home;

// great work so far, would love to see react-hook-form in use with these validation in place:
// minLength: 1 char, maxLength: 100 chars, has to be set as "required", and can accept only strings - no numbers

// deleted previous .css files so all prev styles are gone & have to rebuild with Styled Components
