import "./App.css";
import { NewTaskForm } from "./components/NewTaskForm";
import {TaskList} from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

export const App = () => {
  return (
    <TaskProvider>
      <NewTaskForm />
      <TaskList />
    </TaskProvider>
  );
};
