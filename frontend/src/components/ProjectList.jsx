import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { Header2 } from "../atoms/Header2";

export const ProjectList = () => {
  const {
    projectList,
    tasklist,
    fetchProjects,
    setProjectList,
    deleteTask,
    toggleTask,
    setTasklist,
    formatDate
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
        <ul>
          {projectList.map((proj) => (
            <li key={proj._id}>
              <button onClick={handleButtonClick}>{proj.name}</button>
              <button onClick={() => deleteProject(proj._id)}>Delete</button>
            </li>
          ))}
        </ul>

        <ul>
          {filteredTasks.map((item) => (
            <li className="filteredTaskContainer" key={item._id}>
              <input
                id={`completed- ${item._id}`}
                className="completed-input"
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item._id)}
              />
              <label htmlFor={`completed- ${item._id}`}>{item.title}</label>
              <p>{item.description}</p>
              <p>{formatDate(item.due)}</p>
              <p>{item.priority ? "!" : ""}</p>
              <button onClick={() => deleteTask(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
