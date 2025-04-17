import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import {Header2}  from "../atoms/Header2";
import { Button } from "../atoms/Button";
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
        throw new Error(data.message || "Project already exists");
      }

      console.log("response from server:", data);
      console.log("Before adding project:", projectList);
      addProjectToList(data);
      clearProjectForm();
      setFormError("");
    } catch (error) {
      console.error("Error adding project:", error.message);
      setFormError(error.message);
    }
  };

  useEffect(() => {
    console.log("current project data:", projectData);
  }, [projectData]);

  return (
    <>
      <section className="bg-slate-50 rounded-lg shadow p-6 max-w-md mx-auto my-8">
        <Header2 text="Add a project" />
        <form id="project-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <label
              className="block text-slate-700 font-medium"
              htmlFor="project-input"
            >
              Project name{" "}
            </label>
            <input
              id="project-input"
              className="block w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-400"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={projectData.name}
              onFocus={() => setFormError("")}
              required
            />
            <Button type="submit" text="Add Project" />
          </div>
        </form>

        {formError && (
          <p className="mt-4 text-orange-700  rounded px-3 py-2 text-center">
            {formError}
          </p>
        )}
      </section>
    </>
  );
};
