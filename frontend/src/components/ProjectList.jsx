import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const ProjectList = () => {
  const {
    projectList,
    tasklist,
    fetchProjects,
    setProjectList,
    deleteTask,
    toggleTask,
    setTasklist,
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
      {projectList.map((proj) => (
        <div key={proj._id}>
          <button onClick={handleButtonClick}>{proj.name}</button>
          <button onClick={() => deleteProject(proj._id)}>Delete</button>
        </div>
      ))}

      {filteredTasks.map((item) => (
        <div className="filteredTaskContainer" key={item._id}>
          <input
            id="completed"
            className="completed-input"
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(item._id)}
          />
          <label htmlFor="completed">{item.title}</label>
          <p>{item.description}</p>
          <p>{item.due}</p>
          <p>{item.priority ? "!" : ""}</p>
          <button onClick={() => deleteTask(item._id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
