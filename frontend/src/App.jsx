import "./App.css";
import { NewTaskForm } from "./components/NewTaskForm";
import { TaskList } from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import { NewProjectForm } from "./components/NewProjectForm";
import { Header } from "./components/Header";
import { ProjectList } from "./components/ProjectList";

export const App = () => {
  return (
    <TaskProvider>
      <Header />
      <main>
        <NewProjectForm />
        <ProjectList />
        <NewTaskForm />
        <TaskList />
      </main>
    </TaskProvider>
  );
};
