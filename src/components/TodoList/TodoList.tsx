import React from 'react';

import { Box } from '@mui/material';

import type { Todo } from '../../pages/TodoHome';
import { Panel } from '../Panel/Panel';

import { TodoItem } from './TodoItem/TodoItem';

interface TodoListProps {
  editTodoId: Todo['id'] | null;
  todoList: Todo[];
  onChangeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todoList, editTodoId, onChangeTodo }) => (
    <Box>
      {todoList.map((todo) => {
        if (todo.id === editTodoId)
          return <Panel mode='edit' onChangeTodo={onChangeTodo} editTodo={todo} key={todo.id} />;
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </Box>
  );
