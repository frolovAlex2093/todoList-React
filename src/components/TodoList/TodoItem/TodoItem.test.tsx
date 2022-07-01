import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "./TodoItem";

const todoTest = {
  id: 1,
  name: "test name",
  description: "test description",
  checked: false,
};

const onDeleteTodoTest = jest.fn();
const onCheckTodoTest = jest.fn();
const onEditTest = jest.fn();
const onClickMoreTest = jest.fn();

describe("TodoItem component", () => {
  it("TodoItem render", () => {
    render(
      <MemoryRouter>
        <TodoItem
          todo={todoTest}
          onDeleteTodo={onDeleteTodoTest}
          onCheckTodo={onCheckTodoTest}
          onEdit={onEditTest}
          onClickMore={onClickMoreTest}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("test name")).toBeInTheDocument();
    expect(screen.getByText("test description")).toBeInTheDocument();
  });

  it("buttons work", () => {
    render(
      <MemoryRouter>
        <TodoItem
          todo={todoTest}
          onDeleteTodo={onDeleteTodoTest}
          onCheckTodo={onCheckTodoTest}
          onEdit={onEditTest}
          onClickMore={onClickMoreTest}
        />
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole("button", { name: "delete" }));
    userEvent.click(screen.getByRole("button", { name: "edit" }));
    userEvent.click(screen.getByRole("button", { name: "more" }));
    userEvent.click(screen.getByText("test name"));

    expect(onDeleteTodoTest).toHaveBeenCalled();
    expect(onCheckTodoTest).toHaveBeenCalled();
    expect(onEditTest).toHaveBeenCalled();
    expect(onClickMoreTest).toHaveBeenCalled();
  });

  it("TodoItem snapshot", () => {
    const todoItem = render(
        <MemoryRouter>
          <TodoItem
            todo={todoTest}
            onDeleteTodo={onDeleteTodoTest}
            onCheckTodo={onCheckTodoTest}
            onEdit={onEditTest}
            onClickMore={onClickMoreTest}
          />
        </MemoryRouter>
      );

      expect(todoItem).toMatchSnapshot()
  })
});
