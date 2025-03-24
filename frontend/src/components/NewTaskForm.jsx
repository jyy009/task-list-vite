import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import DatePicker from "react-datepicker";

export const NewTaskForm = () => {
  const { formData, setFormData, projectList, addTask, clearForm } =
    useTask();

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    clearForm();
    console.log("form data after submit:", formData);
  };

  return (
    <>
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

        {/* <DatePicker
          selected={formData.due}
          onChange={handleInputChange}
          dateFormat="MMMM d, yyyy"
        /> */}

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
          {projectList.map((proj, index) => {
            return (
              <option key={index} value={proj}>
                {proj}
              </option>
            );
          })}
        </select>
        <button type="submit">Add</button>
      </form>
    </>
  );
};
