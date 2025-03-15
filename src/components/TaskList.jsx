import React from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist, deleteTask } = useTask();

  return (
    <>
      {tasklist.map((task) => (
        <div className="taskContainer" key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.due}</p>
          <p>{task.priority ? "!" : ""}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
