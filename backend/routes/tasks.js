import express from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
const router = express.Router();
import { validationResult } from "express-validator";
import { createTaskFormValidation } from "../validators/validator.js";

// get all the tasks
router.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find().exec();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// post a task
router.post("/", createTaskFormValidation(), async (req, res) => {
  const errors = validationResult(req);
  console.log("errors array", errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, due, priority, project } = req.body;

    const newTask = new Task({ title, description, due, priority, project });

    await newTask.save();
    console.log("new task added to db:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// delete a task
router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.isValidObjectId(taskId)) {
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
        message: "Task not found",
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
      message: error.message,
    });
  }
});

export default router;
