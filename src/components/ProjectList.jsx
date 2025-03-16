import React from "react";
import { useTask } from "../context/TaskContext";

export const ProjectList = () => {
  const { projectList, tasklist } = useTask();

  const handleButtonClick = (e) => {
    e.preventDefault();
    const value = e.target.textContent;
console.log("current task list:", tasklist)
    const newTasklist = tasklist.filter(item=> 
      item.project === value
    );

    console.log("filtered task list:", newTasklist);
    return newTasklist;
  };
  return (
    <>
      {projectList.map((proj, index) => (
        <button key={index} onClick={handleButtonClick}>
          {proj}
        </button>
      ))}
    </>
  );
};
