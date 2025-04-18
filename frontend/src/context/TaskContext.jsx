import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasklist, setTasklist] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: formatDate(new Date()),
    priority: false,
    project: "",
  });

  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectList, setProjectList] = useState([]);
  const [formError, setFormError] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
  });

  const backend_url =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const addTask = (newTask) => {
    setTasklist((prev) => {
      const updatedTasklist = [...prev, { ...newTask, completed: false }];
      return updatedTasklist;
    });
  };

  const addProjectToList = (newProj) => {
    setProjectList((prev) => [...prev, newProj]);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${backend_url}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasklist(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${backend_url}/projects`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjectList(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${backend_url}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasklist((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTask = (id) => {
    setTasklist((prev) => {
      return prev.map((item) =>
        item._id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  const clearTaskForm = () => {
    setFormData({
      title: "",
      description: "",
      due: formatDate(new Date()),
      priority: false,
      project: "",
    });
  };

  const clearProjectForm = () => {
    setProjectData({
      name: "",
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasklist,
        toggleTask,
        fetchTasks,
        loading,
        deleteTask,
        formatDate,
        projectList,
        fetchProjects,
        setProjectList,
        setTasklist,
        projectsLoading,
        backend_url,
        formData,
        setFormData,
        addTask,
        clearTaskForm,
        projectData,
        setProjectData,
        addProjectToList,
        clearProjectForm,
        formError,
        setFormError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
