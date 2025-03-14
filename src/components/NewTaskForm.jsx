import React, { useState } from "react";
import { useTask } from "../context/TaskContext";

export const NewTaskForm = () => {
  const { formData, setFormData, tasklist, setTasklist, addTask, clearForm } =
    useTask();

  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setIsChecked(checked);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    setIsChecked(false);
    clearForm();
    console.log("form data after submit:", formData);
  };

  return (
    <form id="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task">Title</label>
      <input
        id="task"
        className="task-input"
        type="text"
        name="title"
        onChange={handleInputChange}
        value={formData.title}
      />

      <label htmlFor="desription">Notes</label>
      <input
        id="desription"
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
        checked={isChecked}
        onChange={handleInputChange}
      />

      <label htmlFor="project-select">Project</label>
      <select
        name="project"
        id="project-select"
        onChange={handleInputChange}
        value={formData.project}
      >
        <option disabled>Select a project</option>
        <option>Test project</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};
