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

router.post("/", async(req, res) => {
  try {
    const proj = req.body

    const newProj = new Project(proj)

    await newProj.save()
    console.log("new project added:", newProj)
        res.status(201).json(newProj);

  } catch {

  }
})
export default router;
