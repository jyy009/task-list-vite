import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { ProjectList } from "./ProjectList";

export const NewProjectForm = () => {
  const {
    projectList,

    projectData,
    setProjectData,
    addProjectToList,
  } = useTask();

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backend_url}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Error adding project");
      }

      const data = await response.json();
      console.log("response from server:", data);
      console.log("Before adding project:", projectList);
      addProjectToList(data);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };


  useEffect(() => {
    console.log("current project data:", projectData);
  }, [projectData]);

  return (
    <>
      <h3 className="project-header">Projects</h3>

      <form id="project-form" onSubmit={handleSubmit}>
        <label htmlFor="project-input">Project name </label>
        <input
          id="project-input"
          className="input"
          type="text"
          name="name"
          onChange={handleInputChange}
          value={projectData.name}
        />
        <button type="submit">Add</button>
      </form>

      {/* {projectList.length > 0 ? <ProjectList /> : null} */}
    </>
  );
};
