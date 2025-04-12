import { createContext, useContext, useEffect, useState } from "react";
import { format } from "date-fns";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasklist, setTasklist] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: format(new Date(), "yyyy-MM-dd"),
    priority: false,
    project: "",
  });
  const [loading, setLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);

  const [projectList, setProjectList] = useState([]);
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
    setLoading(true);

    try {
      const response = await fetch(`${backend_url}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response status:", response.status);
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
    setProjectsLoading(true);
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

      const data = await response.json();
      console.log("task deleted successfully:", data);
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

  useEffect(() => {
    console.log("current tasklist:", tasklist);
  }, [tasklist]);

  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      due: "",
      priority: false,
      project: "",
    });
  };

  return (
    <TaskContext.Provider
      value={{
        formData,
        setFormData,
        tasklist,
        setTasklist,
        addTask,
        clearForm,
        projectList,
        addProjectToList,
        fetchTasks,
        toggleTask,
        loading,
        projectData,
        setProjectData,
        fetchProjects,
        setProjectList,
        deleteTask,
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
