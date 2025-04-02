import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist, toggleTask, fetchTasks, setTasklist, loading } = useTask();

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`${backend_url}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      const data = await response.json();
      console.log("task deleted successfully:", data);
      setTasklist((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {loading && <p>loading...</p>}
      
      {tasklist.length === 0 && !loading && <p>You have no tasks</p>}

      {tasklist.map((task) => (
      <div className="taskContainer" key={task._id}>
        <input
          id="completed"
          className="completed-input"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
        />
        <label htmlFor="completed">{task.title}</label>

        <p>{task.description}</p>
        <p>{task.due}</p>
        <p>{task.priority ? "!" : ""}</p>

        <button onClick={() => handleDelete(task._id)}>Delete</button>
      </div>
      ))}
    </>
  );
};
