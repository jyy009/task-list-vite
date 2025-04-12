import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
const router = express.Router();

// get all the projects
router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.find().exec();
    if (allProjects.length > 0) {
      res.status(200).json(allProjects);
    } else {
      res.status();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// add a project
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { name } = req.body;

    const newProj = new Project({ name });

    await newProj.save();
    console.log("new project added:", newProj);
    res.status(201).json(newProj);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// delete a project
router.delete("/:projectId", async (req, res) => {
  const {projectId} = req.params

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID",
    });
  }

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId)
    console.log("Deleted project:", deletedProject)

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Could not find project"
      })
    } else {
      res.status(200).json({
        success: true,
        message: `Project with ${projectId} has been deleted`
      })
    }
  } catch(error) {
    console.error("Error deleting project", error)
    res.status(500).json({
      success: false,
      response: error,
      message: "Could not delete project"
    })
  }
})
export default router;
