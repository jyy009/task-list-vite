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
      {loading && (
        <p className="text-sky-700 font-[urbanist] text-center my-6">
          loading...
        </p>
      )}

      <section className="bg-slate-50 font-[urbanist] rounded-lg shadow p-6 max-w-md mx-auto my-8">
        <Header2 text="All Tasks" />
        {tasklist.length === 0 && !loading && (
          <p className="text-slate-700 text-center my-6">You have no tasks</p>
        )}
        <List
          data={tasklist}
          ulClass="space-y-4"
          liClass="bg-white border border-slate-300 rounded-lg p-4 flex flex-row items-center md:flex-row md:items-center md:justify-between shadow-sm"
          renderItem={(task) => (
            <>
              <div key={task._id} className="flex items-center gap-3">
                <input
                  id={`completed-${task._id}`}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />
                <label
                  htmlFor={`completed-${task._id}`}
                  className={`${
                    task.completed ? "line-through decoration-2 opacity-60" : ""
                  }`}
                >
                  {task.title}
                </label>
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
                aria-label={`Delete task ${task.title}`}
                text="Delete"
              />
            </>
          )}
        />
      </section>
    </>
  );
};
