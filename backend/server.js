import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const mongoURL = process.env.VITE_MONGO_URL || "mongodb://localhost/tasks";

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
mongoose.Promise = global.Promise;

//model
// const Task = mongoose.model("Task", {
//   title: String,
//   description: String,
//   due: {
//     type: Date,
//     default: new Date(),
//   },
//   priority: Boolean,
//   project: String,
// });

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", async (req, res) => {
  const allTasks = await Task.find().exec();
  res.json(allTasks);
});

app.put("/tasks", async (req, res) => {
  try {
    const { title, description, due, priority, project } = req.body;
    console.log("Extracted data:", {
      title,
      description,
      due,
      priority,
      project,
    });

    const newTask = new Task({ title, description, due, priority, project });
    console.log("Created new Task instance:", newTask);

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: error.message });
  }
});

app.delete("/tasks/:taskid", async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: taskId });
    console.log("deleted task:", deletedTask);

    if (!deletedTask) {
      return res.status(400).json({
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
