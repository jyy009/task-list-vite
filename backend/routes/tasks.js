import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
console.log(Task);
const router = express.Router();

// get all the tasks
router.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find().exec();
    if (allTasks.length > 0) {
      res.json(allTasks);
    } else {
      res.status(404).send("No tasks found");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// post a task
router.post("/", async (req, res) => {
  try {
    const { title, description, due, priority, project } = req.body;

    const newTask = new Task({ title, description, due, priority, project });

    await newTask.save();
    console.log("new task added to db:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ success: true, task: newTask });
  }
});

// delete a task
router.delete("/:taskId", async (req, res) => {
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

export default router;
