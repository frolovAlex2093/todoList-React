import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TodoList } from "./TodoList";

const todoList = [
  {
    id: 1,
    name: "test name 1",
    description: "test description 1",
    checked: false,
  },
  {
    id: 2,
    name: "test name 2",
    description: "test description 2",
    checked: false,
  },
  {
    id: 3,
    name: "test name 3",
    description: "test description 3",
    checked: false,
  },
];

const editTodoId = null;

const onDeleteTodo = jest.fn();
const onCheckTodo = jest.fn();
const onEdit = jest.fn();
const onClickMore = jest.fn();
const onChangeTodo = jest.fn();

describe("TodoList component", () => {
  it("TodoList render", () => {
    render(
      <MemoryRouter>
        <TodoList
          todoList={todoList}
          
          
          
          
          editTodoId={editTodoId}
          onChangeTodo={onChangeTodo}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("test name 1")).toBeInTheDocument();
    expect(screen.getByText("test description 1")).toBeInTheDocument();
    expect(screen.getByText("test name 2")).toBeInTheDocument();
    expect(screen.getByText("test description 2")).toBeInTheDocument();
    expect(screen.getByText("test name 3")).toBeInTheDocument();
    expect(screen.getByText("test description 3")).toBeInTheDocument();
  });

  it("TodoList snapshot", ()=>{
    const todoListSanp = render(
        <MemoryRouter>
          <TodoList
            todoList={todoList}
            editTodoId={editTodoId}
            onChangeTodo={onChangeTodo}
          />
        </MemoryRouter>
      );

      expect(todoListSanp).toMatchSnapshot()
  })
});
