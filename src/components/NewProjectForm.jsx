import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

export const NewProjectForm = () => {
  const { setProjectList, addProjectToList } = useTask();

  const [projectData, setProjectData] = useState("");

  const handleInputChange = (e) => {
    const formValue = e.target.value;
    setProjectData(formValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProjectToList(projectData)
    setProjectData("");
  };

  return (
    <>
      <h3 className="project-header">Projects</h3>

      <form id="project-form" onSubmit={handleSubmit}>
        <label htmlFor="project-input">Project name </label>
        <input
          id="project-input"
          className="input"
          type="text"
          name="formProject"
          onChange={handleInputChange}
          value={projectData}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
