import React, { useState } from "react";
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
    console.log("filteredTasks", filteredTasks);

  };

  return (
    <>
      {projectList.map((proj, index) => (
        <button key={index} onClick={handleButtonClick}>
          {proj}
        </button>
      ))}

      {filteredTasks.map((item) => (
        <div className="filteredTaskContainer" key={item.id}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          <p>{item.due}</p>
          <p>{item.priority ? "!" : ""}</p>
          <button onClick={() => deleteTask(item.id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
