import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const StyledWrapper = styled.div`
  font-size: 3em;
  text-align: center;
  color: palevioletred;
  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;

  // vh - view height; vw - view width
  min-height: 100vh;
`;
const MainHeader = styled.h1`
  color: ${(props) => props.color && props.color};
`;
const InputItem = styled.input`
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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it
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
    <StyledWrapper>
      <div>
        <MainHeader color="purple">Todo App</MainHeader>
      </div>

      <div>
        {/* naming convention: Inputs > InputItem */}
        <form onSubmit={handleSubmit(onSubmit)}>
        <InputItem
          {...register("todo", { 
            required: true,
          minLength: {
            value: 1, 
            message: "Min length is 1"
          },
          maxLength: {
            value: 100,
            message: "Min length is 100"
          }
          })}
          placeholder="Todo Here"
          />
          <p>{errors.todo?.message}</p>
        {/* <Inputs
          type="text"
          value={todoItem}
          onChange={(e) => setTodoItem(e.target.value)}
          onKeyDown={handleEnter}
        /> */}
        <input type="submit" />
    </form>
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
    </StyledWrapper>
  );
};

export default Home;

// great work so far, would love to see react-hook-form in use with these validation in place:
// minLength: 1 char, maxLength: 100 chars, has to be set as "required", and can accept only strings - no numbers

// deleted previous .css files so all prev styles are gone & have to rebuild with Styled Components
