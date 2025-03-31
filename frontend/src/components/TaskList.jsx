import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist, deleteTask, toggleTask, fetchTasks } = useTask();

  useEffect(() => {
fetchTasks()
  }, []);
  
  return (
    <>
      {tasklist.map((task) => (
        <div className="taskContainer" key={task.id}>
          <input
            id="completed"
            className="completed-input"
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <label htmlFor="completed">{task.title}</label>

          <p>{task.description}</p>
          <p>{task.due}</p>
          <p>{task.priority ? "!" : ""}</p>

          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
