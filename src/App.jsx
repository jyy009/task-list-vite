import "./App.css";
import { NewTaskForm } from "./components/NewTaskForm";
import { TaskProvider } from "./context/TaskContext";

export const App = () => {
  return (
    <TaskProvider>
      <NewTaskForm />
    </TaskProvider>
  );
};
