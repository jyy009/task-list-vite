import React, { useState } from "react";
import { useTask } from "../context/TaskContext";
import { Header2 } from "../atoms/Header2";
import { Button } from "../atoms/Button";

export const NewTaskForm = () => {
  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const { formData, setFormData, projectList, addTask, clearTaskForm } =
    useTask();

  const [taskFormSubmitted, setTaskFormSubmitted] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.gtag) {
      window.gtag("event", "add_project", {
        project: formData.title,
        debug_mode: true,
      });
    }

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
      clearTaskForm();
      setTaskFormSubmitted("Task has been added");
    } catch (error) {
      console.error("Error adding task:", error);
      console.log("form data after submit:", formData);
      setTaskFormSubmitted("Failed to add task", error.message);
    }
  };

  return (
    <section className="bg-slate-50 rounded-lg shadow p-6 max-w-md mx-auto my-8 flex flex-col">
      <Header2 text="Create new Task" id="task-form-heading" />
      <form id="task-form" onSubmit={handleSubmit}>
        <fieldset aria-labelledby="task-form-heading">
          <div className="flex flex-col gap-3">
            <div>
              <label
                className="block text-slate-700 font-medium"
                htmlFor="task"
              >
                Title
              </label>
              <input
                id="task"
                className="block w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-400"
                type="text"
                name="title"
                onChange={handleInputChange}
                value={formData.title}
                required
                placeholder="Task title..."
              />
            </div>
            <div>
              <label
                className="block text-slate-700 font-medium"
                htmlFor="description"
              >
                Notes
              </label>
              <input
                id="description"
                className="block w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-400"
                type="text"
                name="description"
                onChange={handleInputChange}
                placeholder="Task notes..."
                value={formData.description}
              />
            </div>
            <div>
              <label
                className="block text-slate-700 font-medium"
                htmlFor="due-date"
              >
                Due
              </label>
              <input
                id="due-date"
                className="block w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-400"
                type="date"
                name="due"
                onChange={handleInputChange}
                value={formData.due}
              />
            </div>
            <div className="">
              <label
                className="text-slate-700 font-medium"
                htmlFor="priority"
              >
                Priority
              </label>
              <input
                id="priority"
                className="block px-3 py-2 border border-slate-300 rounded focus:outline-none outline:none focus:ring-0 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-400"
                type="checkbox"
                name="priority"
                checked={formData.priority}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                className="block text-slate-700 font-medium"
                htmlFor="project-select"
              >
                Project
              </label>
              <select
                name="project"
                id="project-select"
                onChange={handleInputChange}
                value={formData.project}
                className="block w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700 bg-slate-50 text-slate-800 placeholder-slate-600"
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
            </div>

            <Button type="submit" text="Add Task" />
          </div>
          {taskFormSubmitted && <p>{taskFormSubmitted}</p>}
        </fieldset>
      </form>
    </section>
  );
};
