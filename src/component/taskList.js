import React, { useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useTaskContext } from "./taskContext";

const TaskList = () => {
  const { state, dispatch } = useTaskContext();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);

  const handleDelete = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const handleComplete = (taskId) => {
    dispatch({ type: "COMPLETE_TASK", payload: taskId });
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate || "");
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        ...editedTask,
        title: editedTitle,
        description: editedDescription,
        dueDate: editedDueDate,
      },
    });
    setEditedTask(null);
    setOpenEditDialog(false);
  };

  const handleCancelEdit = () => {
    setEditedTask(null);
    setOpenEditDialog(false);
  };

  const handleSort = (column) => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
    setSortColumn(column);
  };

  const getSortedTasks = () => {
    if (sortColumn) {
      return state.tasks.slice().sort((a, b) => {
        const aValue = a[sortColumn].toLowerCase();
        const bValue = b[sortColumn].toLowerCase();
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }
    return state.tasks;
  };

  const isTaskOverdue = (dueDate) => {
    if (!dueDate) return false; // If no due date, it's not overdue
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
    return currentDate > dueDate;
  };

  return (
    <>
      <Typography
        sx={{ marginTop: "20px", marginLeft: "15px" }}
        variant="h5"
        component="h4"
        align="start"
      >
        Task List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortColumn === "completed"}
                  direction={sortDirection}
                  onClick={() => handleSort("completed")}
                >
                  Checked
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortColumn === "title"}
                  direction={sortDirection}
                  onClick={() => handleSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortColumn === "description"}
                  direction={sortDirection}
                  onClick={() => handleSort("description")}
                >
                  Description
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortColumn === "dueDate"}
                  direction={sortDirection}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getSortedTasks().map((task) => (
              <TableRow
                key={task.id}
                sx={{
                  backgroundColor: isTaskOverdue(task.dueDate)
                    ? "#FFCCCC"
                    : "inherit",
                }}
              >
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    onClick={() => handleComplete(task.id)}
                  />
                </TableCell>
                <TableCell
                  align="start"
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.title}
                </TableCell>
                <TableCell
                  align="start"
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.description}
                </TableCell>

                <TableCell align="start">
                  {task.dueDate || "No due Date"}
                </TableCell>
                <TableCell align="start">
                  <IconButton>
                    {task?.completed ? (
                      <Chip label="Completed Task" />
                    ) : (
                      <Chip label="Pending Task" variant="outlined" />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(task)}>
                    <Edit />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        sx={{ padding: "1%" }}
        open={openEditDialog}
        onClose={handleCancelEdit}
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            value={editedDescription}
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <TextField
            type="date"
            fullWidth
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
          <Button
            onClick={handleCancelEdit}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskList;
