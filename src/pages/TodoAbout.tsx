import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React from "react";
import { Link } from "react-router-dom";
import { Todo } from "./TodoHome";

interface TodoAboutProps{
    todo: Todo
}

export const TodoAbout: React.FC<TodoAboutProps> = (todo) => {
    console.log(todo)
  return (
    <Box
      display="flex"
      textAlign="center"
      alignItems="center"
      height="100vh"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography variant="h5" component="h5" gutterBottom>
        {todo.todo.name}
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>
      {todo.todo.description}
      </Typography>
      <Link to='/'>
      <IconButton color="error" aria-label="delete">
        <ArrowBackIcon />
      </IconButton>
      </Link>
    </Box>
  );
};
