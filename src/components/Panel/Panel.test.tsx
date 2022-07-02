import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Panel } from './Panel';

const onAddTodoTest = jest.fn();
const onClickFilterTest = jest.fn();
const modAdd = 'add';

const modEdit = 'edit';
const editTodo = { name: 'test name', description: 'test description' };
const onChangeTodo = jest.fn();

describe('Panel component', () => {
  it('Panel render add', () => {
    render(<Panel mode={modAdd} onAddTodo={onAddTodoTest} onClickFilter={onClickFilterTest} />);

    expect(screen.getByRole('textbox', { name: 'name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'description' })).toBeInTheDocument();

    expect(screen.getByText('FILTER')).toBeInTheDocument();
    expect(screen.getByText('ADD')).toBeInTheDocument();
  });

  it('Panel add button work', () => {
    render(<Panel mode={modAdd} onAddTodo={onAddTodoTest} onClickFilter={onClickFilterTest} />);

    userEvent.click(screen.getByText('FILTER'));
    userEvent.click(screen.getByText('ADD'));

    expect(onAddTodoTest).toHaveBeenCalled();
    expect(onClickFilterTest).toHaveBeenCalled();
  });

  it('Panel render edit', () => {
    render(<Panel mode={modEdit} editTodo={editTodo} onChangeTodo={onChangeTodo} />);

    expect(screen.getByText('EDIT')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'description' })).toBeInTheDocument();
  });

  it('Panel edit button work', () => {
    render(<Panel mode={modEdit} editTodo={editTodo} onChangeTodo={onChangeTodo} />);

    userEvent.click(screen.getByText('EDIT'));

    expect(onChangeTodo).toHaveBeenCalled();
  });

  it('Panel add snapshot', () => {
    const panelAdd = render(
      <Panel mode={modAdd} onAddTodo={onAddTodoTest} onClickFilter={onClickFilterTest} />
    );
    expect(panelAdd).toMatchSnapshot();
  });

  it('Panel edit snapshot', () => {
    const panelEdit = render(
      <Panel mode={modEdit} editTodo={editTodo} onChangeTodo={onChangeTodo} />
    );
    expect(panelEdit).toMatchSnapshot();
  });
});
