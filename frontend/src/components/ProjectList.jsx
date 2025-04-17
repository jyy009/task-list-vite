import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { Header2 } from "../atoms/Header2";
import { List } from "../atoms/List";
import { Button } from "../atoms/Button";

export const ProjectList = () => {
  const {
    projectList,
    tasklist,
    fetchProjects,
    setProjectList,
    deleteTask,
    toggleTask,
    setTasklist,
    formatDate,
  } = useTask();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleButtonClick = (e) => {
    e.preventDefault();
    const value = e.target.textContent;
    console.log("current task list:", tasklist);

    setSelectedProject(value);
  };

  const filteredTasks = tasklist.filter(
    (item) => item.project === selectedProject
  );

  const deleteProject = async (projId) => {
    try {
      const response = await fetch(`${backend_url}/projects/${projId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const data = await response.json();
      console.log("project data:", data);

      setProjectList((prev) => prev.filter((item) => item._id !== projId));
      setTasklist((prev) =>
        prev.filter((task) => task.project !== selectedProject)
      );
    } catch (error) {
      console.error("Error deleting project", error);
    }
  };

  useEffect(() => {
    console.log("current project list:", projectList);
  }, [projectList]);

  useEffect(() => {
    console.log("current tasklist:", tasklist);
  }, [tasklist]);

  return (
    <>
      <section className="bg-slate-50 rounded-lg shadow p-6 max-w-md mx-auto my-8">
        <Header2 text="Filter tasks by project" />

        <List
          data={projectList}
          ulClass="mb-6 flex flex-wrap gap-2 justify-center"
          liClass="flex items-center gap-2 "
          renderItem={(proj) => (
            <>
              <Button onClick={handleButtonClick} text={proj.name} />
              <Button onClick={() => deleteProject(proj._id)} text="Delete" />
            </>
          )}
        />

        <List
          data={filteredTasks}
          ulClass="space-y-4"
          liClass="filteredTaskContainer bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm"
          renderItem={(item) => (
            <>
              <div className="flex items-center gap-3">
                <input
                  id={`completed- ${item._id}`}
                  className="completed-input"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item._id)}
                />
                <label htmlFor={`completed- ${item._id}`}>{item.title}</label>
              </div>
              <div className="ml-8 flex-1">
                <p>{item.description}</p>
                <p>{formatDate(item.due)}</p>
              </div>

              <div>
                {item.priority && (
                  <span
                    className="text-lg text-sky-700 font-bold"
                    title="High Priority"
                  >
                    !
                  </span>
                )}
              </div>

              <button
                className="bg-slate-200 hover:bg-sky-700 hover:text-slate-50 text-sky-900 font-semibold py-1 px-3 rounded shadow focus:outline-none focus:ring-2 focus:ring-sky-700 transition-colors duration-150"
                onClick={() => deleteTask(item._id)}
                aria-label={`Delete task ${item.title}`}
              >
                Delete
              </button>
            </>
          )}
        />
      </section>
    </>
  );
};
