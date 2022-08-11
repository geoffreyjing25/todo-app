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
  width: 350px;
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

// change later to a different color
const ParagraphItem = styled.p`
  color: purple 
`

const UnorderListItem = styled.ul`
  list-style: none;
`

const Home = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
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
    reset();
  };
  
  console.log(watch("example"));
  const [items, setItems] = useState([]);

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

  const handleDelete = (id) => {

  }

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
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Accepting only letters",
              },
              minLength: {
                value: 2,
                message: "Min length is 2",
              },
              maxLength: {
                value: 100,
                message: "Max length is 100",
              },
            })}
            placeholder="Todo Here"
          />
          <ParagraphItem>{errors.todo?.message}</ParagraphItem>
    </form>
    </div>
      <UnorderListItem>
        {items
          .map(({ id, message, done }) => (
            <ListItem key={id}>
              {message}
              <button onClick={() => handleDone(id)} done={done}>Done</button>
              <button type="submit">Delete</button>
            </ListItem>
          ))}
      </UnorderListItem>

      <div>
        <h6>Made by Geoffrey Jing</h6>
      </div>
    </StyledWrapper>
  );
};

export default Home;

