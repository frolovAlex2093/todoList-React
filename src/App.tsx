import React from "react";

import { Route, Routes } from "react-router-dom";
import { TodoAbout } from "./pages/TodoAbout";
import {Todo, TodoHome} from "./pages/TodoHome";

const DefaltTodo= {
  name: "",
  description: "",
  checked: false,
  id: 0
}

export const App: React.FC = () => {

const[todo, setTodo] = React.useState<Todo>(DefaltTodo)

const onClickMore = (todoItem: Todo) => {
  setTodo(todoItem)
}

  return (
    
    <Routes>
      <Route element={<TodoHome onClickMore={onClickMore}/>} path='/'></Route>
      <Route element={<TodoAbout todo={todo}/>} path='/TodoAbout'></Route>
    </Routes>
    
  );
};
