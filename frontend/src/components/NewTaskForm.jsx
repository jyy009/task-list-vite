import React from "react";
import { useTask } from "../context/TaskContext";

export const NewTaskForm = () => {
  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const { formData, setFormData, projectList, addTask, clearTaskForm } =
    useTask();

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backend_url}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error adding task");
      }

      const data = await response.json();
      console.log("response from server:", data);
      addTask(data);
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      clearTaskForm();
      console.log("form data after submit:", formData);
    }
  };

  return (
    <section aria-label="task form section">
      <h2>Create new task</h2>
      <form id="task-form" onSubmit={handleSubmit}>
        <fieldset aria-labelledby="task-form-heading">
          <legend className="sr-only">Create new task</legend>
          <label htmlFor="task">Title</label>
          <input
            id="task"
            className="task-input"
            type="text"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
            required
          />
          <label htmlFor="description">Notes</label>
          <input
            id="description"
            className="description-input"
            type="text"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
          <label htmlFor="due-date">Due</label>
          <input
            id="due-date"
            className="input"
            type="date"
            name="due"
            onChange={handleInputChange}
            value={formData.due}
          />
          <label htmlFor="priority">Priority</label>
          <input
            id="priority"
            className="priority-input"
            type="checkbox"
            name="priority"
            checked={formData.priority}
            onChange={handleInputChange}
          />
          <label htmlFor="project-select">Project</label>
          <select
            name="project"
            id="project-select"
            onChange={handleInputChange}
            value={formData.project}
          >
            <option value="" disabled>
              Select a project
            </option>
            <option value="test project">Test project</option>
            {projectList.map((proj) => {
              return (
                <option key={proj._id} value={proj.name}>
                  {proj.name}
                </option>
              );
            })}
          </select>
          <button type="submit">Add</button>
        </fieldset>
      </form>
    </section>
  );
};
