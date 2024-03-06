import React, { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTaskContext } from "./taskContext";

const TaskForm = ({ onClose, task }) => {
  const { dispatch } = useTaskContext();
  const [input, setInput] = useState(task ? task.title : "");
  const [taskDesc, setTaskDesc] = useState(task ? task.description : "");

  const handleSubmit = () => {
    if (input.trim() === "") return;

    if (task) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { ...task, title: input, description: taskDesc },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: new Date().getTime(),
          title: input,
          description: taskDesc,
          completed: false,
        },
      });
    }

    setInput("");
    setTaskDesc("");
    onClose();
  };

  return (
    <Paper sx={{ padding: "10px" }} elevation={3}>
      <Typography
        sx={{ paddingLeft: "15px" }}
        variant="h5"
        component="h4"
        align="start"
      >
        Add Task
      </Typography>
      <Stack direction={"row"}>
        <TextField
          sx={{ margin: "10px" }}
          label="Title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
        />
        <TextField
          sx={{ margin: "10px" }}
          label="Description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handleSubmit}
          sx={{ width: "200px", margin: "10px" }}
          variant="contained"
          color="primary"
        >
          {task ? "Update Task" : "Add Task"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TaskForm;
