import React, { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";

export const ProjectList = () => {
  const { projectList, tasklist, fetchProjects, setProjectList } = useTask();
  // const [filteredTasks, setFilteredTasks] = useState([]);
const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleButtonClick = (e) => {
    e.preventDefault();
    const value = e.target.textContent;
    console.log("current task list:", tasklist);
    // const newTasklist = tasklist.filter((item) => item.project === value);
    // setFilteredTasks(newTasklist);
    // console.log("new task list", newTasklist)
    // return newTasklist
    setSelectedProject(value)
  };

  const filteredTasks = tasklist.filter(item => item.project === selectedProject)

  const toggleTask = (id) => {
    setFilteredTasks((prev) => {
      return prev.map((item) =>
        item._id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  // const deleteTask = (id) => {
  //   setFilteredTasks((prev) => {
  //     const updatedList = prev.filter((item) => item._id !== id);
  //     console.log(updatedList);
  //     return updatedList;
  //   });
  // };


  const deleteTask = (id) => {
    setFilteredTasks((prev) => {
      const updatedList = prev.filter((item) => item._id !== id);
      console.log(updatedList);
      return updatedList;
    });
  };
  const deleteProject = async (projId) => {
    try {
      const response = await fetch(`${backend_url}/projects/${projId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      const data = await response.json();
      console.log("project data:", data);
      setProjectList((prev) => prev.filter((item) => item._id !== projId));
    } catch (error) {
      console.error("Error deleting project", error);
    }
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
        <>
          <button key={proj._id} onClick={handleButtonClick}>
            {proj.name}
          </button>
          <button onClick={() => deleteProject(proj._id)}>Delete</button>
        </>
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
