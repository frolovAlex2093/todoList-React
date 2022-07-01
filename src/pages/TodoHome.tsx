import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Header, Loader, Panel, TodoList } from "../components";

let filter: boolean = true;
let maxId: number = 1;

export type Todo = {
    id: number;
    name: string;
    description: string;
    checked: boolean;
  };

  interface TodoHomeProps{
    onClickMore: (todo: Todo) => void
  }

export const TodoHome: React.FC<TodoHomeProps> = ({onClickMore}) => {
  const [editTodoId, setEditTodoId] = React.useState<number | null>(null);
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetch("https://62b841c8f4cb8d63df5aec8a.mockapi.io/api/v1/todo")
      .then((response) => response.json())
      .then((todoList) => {
        setTodoList(todoList);
        setLoading(false);
      });
  }, []);


  const onClickFilter = () => {
    const sortTodoList = [...todoList].sort((x, y) => {
      if (filter === true) {
        return x.checked === y.checked ? 0 : x.checked ? -1 : 1;
      } else {
        return x.checked === y.checked ? 0 : x.checked ? 1 : -1;
      }
    });
    setTodoList(sortTodoList);
    filter = !filter;
  };

  const onEdit = (id: Todo["id"]) => {
    setEditTodoId(id);
  };

  const onDeleteTodo = (id: Todo["id"]) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
    fetch(`https://62b841c8f4cb8d63df5aec8a.mockapi.io/api/v1/todo/${id}`, {
      method: "DELETE",
    });
  };

  const onAddTodo = ({ name, description }: Omit<Todo, "id" | "checked">) => {
    if (todoList.length > 0)
      maxId = Math.max(...todoList.map((todo) => todo.id)) + 1;
    setTodoList([
      ...todoList,
      { id: maxId, description, name, checked: false },
    ]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: maxId, description, name, checked: false }),
    };
    fetch(
      "https://62b841c8f4cb8d63df5aec8a.mockapi.io/api/v1/todo",
      requestOptions
    );

    console.log(todoList);
  };

  const onCheckTodo = (id: Todo["id"]) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ checked: !todo.checked }),
          };
          fetch(
            `https://62b841c8f4cb8d63df5aec8a.mockapi.io/api/v1/todo/${id}`,
            requestOptions
          );
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const onChangeTodo = ({
    name,
    description,
  }: Omit<Todo, "id" | "checked">) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === editTodoId) {
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
          };
          fetch(
            `https://62b841c8f4cb8d63df5aec8a.mockapi.io/api/v1/todo/${editTodoId}`,
            requestOptions
          );
          return { ...todo, name, description };
        }
        return todo;
      })
    );
    setEditTodoId(null);
  };

  return (
    <Box
    
      marginTop={5}
      height="100%"
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      <Box display="flex" flexDirection="column" maxWidth="600px" width="100%" padding="0 15px 0 15px" >
        <Header todoCount={todoList.length} />
        <Panel mode="add" onAddTodo={onAddTodo} onClickFilter={onClickFilter}/>
        {loading && <Loader />}
        {todoList.length ? (
          <TodoList
            editTodoId={editTodoId}
            todoList={todoList}
            onDeleteTodo={onDeleteTodo}
            onCheckTodo={onCheckTodo}
            onEdit={onEdit}
            onChangeTodo={onChangeTodo}
            onClickMore={onClickMore}
          />
        ) : loading ? null : (
          <Typography
            sx={{ fontSize: 35 }}
            variant="h1"
            component="h1"
            gutterBottom
          >
            No Todo
          </Typography>
        )}
      </Box>
    </Box>
  );
}
