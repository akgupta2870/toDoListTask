import React, { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };

    case "UPDATE_TASK":
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };

    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return { tasks: filteredTasks };

    case "COMPLETE_TASK":
      const completedTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(completedTasks));
      return { tasks: completedTasks };

    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Update local storage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTaskContext };
