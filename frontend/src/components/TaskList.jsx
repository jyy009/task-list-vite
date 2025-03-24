import React from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist, deleteTask, toggleTask, setIsDone } = useTask();

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
