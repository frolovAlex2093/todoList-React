import React from 'react';

import { Add as AddIcon, FilterAlt as FilterAltIcon } from '@mui/icons-material';
import { Box, Button, Paper, Stack,TextField } from '@mui/material';

import type { Todo } from '../../pages/TodoHome';

const DEFAULT_TODO = { name: '', description: '' };

interface AddPanelProps {
  mode: 'add';
  onAddTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
  onClickFilter: () => void;
}

interface EditPanelProps {
  mode: 'edit';
  editTodo: Omit<Todo, 'id' | 'checked'>;
  onChangeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}

type PanelProps = AddPanelProps | EditPanelProps;

export const Panel: React.FC<PanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);

  const onClick = () => {
    if (isEdit) {
      return props.onChangeTodo(todo);
    }
    props.onAddTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: '15px',
        padding: '15px 20px',
        borderRadius: 1,
        gap: 2
      }}
    >
      <Stack direction='row' spacing={1}>
        <TextField value={todo.name} onChange={onChange} name='name' label='name' fullWidth />
        <TextField
          value={todo.description}
          onChange={onChange}
          name='description'
          label='description'
          fullWidth
        />
      </Stack>
      <Box textAlign='right' marginTop={2}>
        {isEdit ? (
          ''
        ) : (
          <Button
            startIcon={<FilterAltIcon />}
            variant='outlined'
            onClick={props.onClickFilter}
            sx={{ marginRight: '5px' }}
          >
            FILTER
          </Button>
        )}
        <Button startIcon={<AddIcon />} variant='outlined' onClick={onClick}>
          {isEdit ? 'EDIT' : 'ADD'}
        </Button>
      </Box>
    </Paper>
  );
};
