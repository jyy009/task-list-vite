import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasklist, setTasklist] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: "",
    priority: false,
    project: "",
  });

  const [projectList, setProjectList] = useState([]);

  const addTask = (newTask) => {
    setTasklist((prev) => {
      const updatedTasklist = [
        ...prev,
        { ...newTask, id: crypto.randomUUID() },
      ];
      console.log("updated tasklist:", updatedTasklist);
      return updatedTasklist;
    });
  };

  const addProjectToList = (newProj) => {
    setProjectList((prev) => {
      const updatedList = [...prev, newProj]
      console.log("updated proj list:", updatedList);
      return updatedList
    })
  }

  const clearForm = () => {
    setFormData({
      title: "",
      description: "",
      due: "",
      priority: false,
      project: "",
    });
  };

 
  const deleteTask = (id) => {
    setTasklist((prev) => {
      return prev.filter(item => item.id !== id)
    })
  }

  return (
    <TaskContext.Provider
      value={{
        formData,
        setFormData,
        tasklist,
        setTasklist,
        addTask,
        clearForm,
        deleteTask,
        projectList,
        addProjectToList,
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
