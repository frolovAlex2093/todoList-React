import React from 'react';
import { Box } from '@mui/material';

import type { Todo } from '../../pages/TodoHome';
import { TodoItem } from './TodoItem/TodoItem';
import { Panel } from '../Panel/Panel';

interface TodoListProps {
  editTodoId: Todo['id'] | null;
  todoList: Todo[];
  onDeleteTodo: (id: Todo['id']) => void;
  onCheckTodo: (id: Todo['id']) => void;
  onEdit: (id: Todo['id']) => void;
  onChangeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
  onClickMore: (todo: Todo) => void
}

export const TodoList: React.FC<TodoListProps> = ({
  todoList,
  editTodoId,
  onChangeTodo,
  onDeleteTodo,
  onCheckTodo,
  onEdit,
  onClickMore
}) => (
  <Box>
    {todoList.map((todo) => {
      if (todo.id === editTodoId)
        return <Panel mode='edit' onChangeTodo={onChangeTodo} editTodo={todo} />;
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onCheckTodo={onCheckTodo}
          onEdit={onEdit}
          onClickMore={onClickMore}
        />
      );
    })}
  </Box>
);