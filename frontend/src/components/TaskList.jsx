import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const TaskList = () => {
  const { tasklist, toggleTask, fetchTasks, loading, deleteTask, formatDate } =
    useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {loading && <p>loading...</p>}

      {tasklist.length === 0 && !loading && <p>You have no tasks</p>}

      <section>
        <h3>All Tasks</h3>

        <ul aria-label="all tasks section">
          {tasklist.map((task) => (
            <li className="taskContainer" key={task._id}>
              <input
                id="completed"
                className="completed-input"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
              />
              <label htmlFor="completed">{task.title}</label>
              <p>{task.description}</p>
              <p>{formatDate(task.due)}</p>
              <p>{task.priority ? "!" : ""}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
