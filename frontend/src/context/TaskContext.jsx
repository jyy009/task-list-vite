import { createContext, useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasklist, setTasklist] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due: new Date(),
    priority: false,
    project: "",
  });
  // const [isDone, setIsDone] = useState(false);

  const [projectList, setProjectList] = useState([]);

  const addTask = (newTask) => {
    setTasklist((prev) => {
      const updatedTasklist = [
        ...prev,
        { ...newTask, id: crypto.randomUUID(), completed: false },
      ];
      console.log("updated tasklist:", updatedTasklist);
      return updatedTasklist;
    });
  };

  const toggleTask = (id) => {
    setTasklist((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };

  const addProjectToList = (newProj) => {
    setProjectList((prev) => {
      const updatedList = [...prev, newProj];
      console.log("updated proj list:", updatedList);
      return updatedList;
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

  const deleteTask = (id) => {
    setTasklist((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      console.log(updatedList);
      return updatedList;
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
        deleteTask,
        projectList,
        addProjectToList,
        // isDone,
        // setIsDone,
        toggleTask,
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
