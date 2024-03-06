// App.js
import React from "react";
import { Container, Typography } from "@mui/material";
import { TaskProvider } from "./component/taskContext";
import TaskList from "./component/taskList";
import TaskForm from "./component/taskForm";

function App() {
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleClose = () => {
    setSelectedTask(null);
  };

  return (
    <TaskProvider>
      <Container
        maxWidth="xl"
        style={{
          minHeight: "100vh",
          paddingTop: "40px",
          backgroundColor: "aliceblue",
        }}
      >
        <Typography
          sx={{ marginBottom: "10px" }}
          variant="h4"
          component="h3"
          align="center"
        >
          Tasks Management
        </Typography>
        <TaskForm onClose={handleClose} task={selectedTask} />
        <TaskList />
      </Container>
    </TaskProvider>
  );
}

export default App;
