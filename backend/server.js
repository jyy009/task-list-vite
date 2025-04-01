import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
import Task from "./models/Task";

const mongoURL = process.env.VITE_MONGO_URL || "mongodb://localhost/tasks";

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
mongoose.Promise = global.Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all the tasks
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find().exec();
    if (allTasks.length > 0) {
      res.json(allTasks)
    } else {
      res.status(404).send("No tasks found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// post a task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, due, priority, project } = req.body;

    const newTask = new Task({ title, description, due, priority, project });

    await newTask.save();
    res.status(201).send("Task added to list");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete a task
app.delete("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    console.log("deleted task:", deletedTask);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Could not find task",
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Task with id: ${taskId} has been deleted`,
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not delete task",
    });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
