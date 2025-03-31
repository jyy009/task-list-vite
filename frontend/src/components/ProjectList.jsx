import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const ProjectList = () => {
  const { projectList, tasklist } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const value = e.target.textContent;
    console.log("current task list:", tasklist);
    const newTasklist = tasklist.filter((item) => item.project === value);

    console.log("filtered task list:", newTasklist);
    setFilteredTasks(newTasklist);
  };

  const toggleTask = (id) => {
    setFilteredTasks((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  const deleteTask = (id) => {
    setFilteredTasks((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      console.log(updatedList);
      return updatedList;
    });
  };

  useEffect(() => {
    console.log("filtered tasklist:", filteredTasks);
  }, [filteredTasks]);
  return (
    <>
      {projectList.map((proj, index) => (
        <button key={index} onClick={handleButtonClick}>
          {proj}
        </button>
      ))}

      {filteredTasks.map((item) => (
        <div className="filteredTaskContainer" key={item.id}>
          <input
            id="completed"
            className="completed-input"
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(item.id)}
          />
          <label htmlFor="completed">{item.title}</label>
          <p>{item.description}</p>
          <p>{item.due}</p>
          <p>{item.priority ? "!" : ""}</p>
          <button onClick={() => deleteTask(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
