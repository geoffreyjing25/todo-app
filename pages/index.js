import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const StyledWrapper = styled.div`
  font-size: 3em;
  text-align: center;
  color: palevioletred;
  color: #A683E3;
  // background-color: #E4E9FD;
  background-color: #E4E9FD;
  background-image: -webkit-linear-gradient(65deg, #A683E3 50%, #E4E9FD 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;

  // vh - view height; vw - view width
  min-height: 100vh;
`;
const StyledDiv = styled.div`
  background-color: #A683E3;
  width: 20%;
  margin: auto;
  top: 20%;
  text-align: center;
`;
const MainHeader = styled.h1`
  color: ${(props) => props.color && props.color};
  font-size: 60px;
`;
const InputItem = styled.input`
  width: 300px;
  height: 30px;
  font-size: 30px;
`;

const ListItem = styled.li`
  color: ${(props) => (props.done ? "lightblue" : "blue")}; 
  text-decoration: ${(props) => props.done && "line-through"}; ;
`;

const Home = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    setItems([
      {
        id: uuidv4(),
        message: data.todo,
        done: false,
      },
      ...items,
    ]);

    // setTodoItem("");
  };
  
  console.log(watch("example"));
  // const [todoItem, setTodoItem] = useState("");
  const [items, setItems] = useState([]);
  
  // const handleEnter = (event) => {
  //   if (event.key === "Enter") {
  //     handleAdd();
  //   }
  // };

  const handleDone = (id) => {
    const _items = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      } 
      
      return item;
    })
    .sort((x, y) => {
      return (x.done === y.done)? 0 : x.done? 1 : -1;
    });
    
    setItems(_items);
  };

  return (
    <StyledWrapper>
      <StyledDiv>
        <MainHeader color="#fff">Todo App</MainHeader>
      </StyledDiv> 

      <div>
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
            message: "Max length is 100"
          }
          })}
          placeholder="Todo Here"
          />
          <p>{errors.todo?.message}</p>
    </form>
    </div>

      {/* nice implementation to have done items at the bottom of the list with different styling.
Try to find a solution to achieve the same result without the redundancy of filtering and mapping
*/}
      <ul>
        {items
          // .filter(({ done }) => !done)
          .map(({ id, message, done }) => (
            <ListItem key={id} onClick={() => handleDone(id)} done={done}>
              {message}
            </ListItem>
          ))}

        {/* {items
          .filter(({ done }) => done)
          .map(({ id, message }) => (
            <ListItem done key={id} onClick={() => handleDone(id)}>
              {message}
            </ListItem>
          ))} */}
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
