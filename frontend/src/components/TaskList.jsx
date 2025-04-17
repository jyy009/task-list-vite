import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { Header2 } from "../atoms/Header2";
import { List } from "../atoms/List";
import { Button } from "../atoms/Button";

export const TaskList = () => {
  const { tasklist, toggleTask, fetchTasks, loading, deleteTask, formatDate } =
    useTask();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {loading && <p className="text-sky-700 text-center my-6">loading...</p>}

      <section className="bg-slate-50 rounded-lg shadow p-6 max-w-md mx-auto my-8">
        <Header2 text="All Tasks" />
        {tasklist.length === 0 && !loading && (
          <p className="text-slate-500 text-center my-6">You have no tasks</p>
        )}
        <List
          data={tasklist}
          ulClass="mb-6 flex flex-wrap gap-2 justify-center"
          liClass="flex items-center gap-2 "
          key={task._id}
          renderItem={(task) => (
            <div className="taskContainer bg-white border border-slate-200 rounded-lg p-4 flex flex-row shadow-sm">
              <div className="flex items-center gap-3">
                <input
                  id={`completed-${task._id}`}
                  className="completed-input"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />
                <label htmlFor={`completed-${task._id}`}>{task.title}</label>
              </div>
              <div className="ml-8 flex-1">
                <p>{task.description}</p>
                <p>{formatDate(task.due)}</p>
              </div>
              <div>
                {task.priority && (
                  <span
                    className="text-lg text-sky-700 font-bold"
                    title="High Priority"
                  >
                    !
                  </span>
                )}
              </div>

              <Button
                type="submit"
                onClick={() => deleteTask(task._id)}
                text="Delete"
              />
            </div>
          )}
        />
        {/* <ul>
          {tasklist.map((task) => (
            <li className="taskContainer" key={task._id}>
              <input
                id={`completed-${task._id}`}
                className="completed-input"
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
              />
              <label htmlFor={`completed-${task._id}`}>{task.title}</label>
              <p>{task.description}</p>
              <p>{formatDate(task.due)}</p>
              <p>{task.priority ? "!" : ""}</p>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul> */}
      </section>
    </>
  );
};
