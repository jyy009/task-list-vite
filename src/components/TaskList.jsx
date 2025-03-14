import React from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist } = useTask();

  return (
    <>
      {tasklist.map((task) => (
        <div className="taskContainer" key={task.id}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.due}</p>
          <p>{task.priority ? "!" : ""}</p>
        </div>
      ))}
    </>
  );
};
