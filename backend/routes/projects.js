import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
const router = express.Router();
import { createProjectFormValidation } from "../validators/validator.js";
import { validationResult } from "express-validator";

// get all the projects
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find().exec();
  
      res.status(200).json(allProjects);
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// add a project
router.post("/", createProjectFormValidation(), async (req, res) => {
  const errors = validationResult(req);
  console.log("errors array", errors)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log(req.body);
    const { name } = req.body;

    const existingProject = await Project.findOne({ name });

    if (existingProject) {
      return res.status(409).json("project already exists");
    }

    const newProject = new Project({ name });
    const savedProject = await newProject.save();
    console.log("new project added:", savedProject);
    res.status(201).json(savedProject);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Project with this name already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete a project
router.delete("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.isValidObjectId(projectId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  try {
    console.log("Deleted project:", deletedProject);
    const deletedProject = await Project.findByIdAndDelete(projectId);
    console.log("Deleted project:", deletedProject);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Could not find project",
      });
    } 

    await Task.deleteMany({ project: deletedProject.name });

    res.status(200).json({
      success: true,
      message: `Project with ID ${projectId} and its tasks have been deleted`,
    });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not delete project",
    });
  }
});
export default router;
