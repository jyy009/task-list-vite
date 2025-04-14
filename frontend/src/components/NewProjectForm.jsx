import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const NewProjectForm = () => {
  const {
    projectList,
    projectData,
    setProjectData,
    addProjectToList,
    clearProjectForm,
    setFormError,
    formError,
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

      const data = await response.json();
      console.log("project data", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add project");
      }

      console.log("response from server:", data);
      console.log("Before adding project:", projectList);
      addProjectToList(data);
      clearProjectForm();
      setFormError("")
    } catch (error) {
      console.error("Error adding project:", error.message);
      setFormError(error.message)
    }
  };

  useEffect(() => {
    console.log("current project data:", projectData);
  }, [projectData]);

  return (
    <>
      <section aria-label="project-header">
        <h2>Add a Project</h2>
        <form id="project-form" onSubmit={handleSubmit}>
          <label htmlFor="project-input">Project name </label>
          <input
            id="project-input"
            className="input"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={projectData.name}
            required
          />
          <button type="submit">Add Project</button>
        </form>

        {formError && <p>{formError}</p>}
      </section>
    </>
  );
};
