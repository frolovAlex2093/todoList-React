import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Context } from '../../../pages/TodoHome';

import { TodoItem } from './TodoItem';

const todoTest = {
  id: 1,
  name: 'test name',
  description: 'test description',
  checked: false
};

const onDeleteTodo = jest.fn();
const onCheckTodo = jest.fn();
const onEdit = jest.fn();
const onClickMore = jest.fn();

describe('TodoItem component', () => {
  it('TodoItem render', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={todoTest} />
      </MemoryRouter>
    );

    expect(screen.getByText('test name')).toBeInTheDocument();
    expect(screen.getByText('test description')).toBeInTheDocument();
  });

  it('buttons work', () => {
    render(
      <MemoryRouter>
        <Context.Provider value={{ onCheckTodo, onDeleteTodo, onEdit, onClickMore }}>
          <TodoItem todo={todoTest} />
        </Context.Provider>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'delete' }));
    userEvent.click(screen.getByRole('button', { name: 'edit' }));
    userEvent.click(screen.getByRole('button', { name: 'more' }));
    userEvent.click(screen.getByText('test name'));

    expect(onDeleteTodo).toHaveBeenCalled();
    expect(onCheckTodo).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onClickMore).toHaveBeenCalled();
  });

  it('TodoItem snapshot', () => {
    const todoItem = render(
      <MemoryRouter>
        <Context.Provider value={{ onCheckTodo, onDeleteTodo, onEdit, onClickMore }}>
          <TodoItem todo={todoTest} />
        </Context.Provider>
      </MemoryRouter>
    );

    expect(todoItem).toMatchSnapshot();
  });
});
