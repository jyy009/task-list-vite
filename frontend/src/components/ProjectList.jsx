import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const ProjectList = () => {
  const { projectList, tasklist, fetchProjects } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(()=> {
fetchProjects()
  },[])
  
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
        item._id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  const deleteTask = (id) => {
    setFilteredTasks((prev) => {
      const updatedList = prev.filter((item) => item._id !== id);
      console.log(updatedList);
      return updatedList;
    });
  };

  useEffect(() => {
    console.log("filtered tasklist:", filteredTasks);
  }, [filteredTasks]);
  

    useEffect(() => {
      console.log("current project list:", projectList);
    }, [projectList]);
  return (
    <>
      {projectList.map((proj) => (
        <button key={proj._id} onClick={handleButtonClick}>
          {proj.name}
        </button>
      ))}

      {filteredTasks.map((item) => (
        <div className="filteredTaskContainer" key={item._id}>
          <input
            id="completed"
            className="completed-input"
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleTask(item._id)}
          />
          <label htmlFor="completed">{item.title}</label>
          <p>{item.description}</p>
          <p>{item.due}</p>
          <p>{item.priority ? "!" : ""}</p>
          <button onClick={() => deleteTask(item._id)}>Delete</button>
        </div>
      ))}
    </>
  );
};
