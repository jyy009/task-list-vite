import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";
const { body } = require("express-validator")

const createTaskFormValidation = () => [
  body("title").notEmpty().isLength({ min: 3, max: 50}).withMessage("Title is required").trim().escape(),
  body("description").optional().isString().trim().escape(),
  body("due").optional().isISO8601().toDate(),
  body("priority").optional().isBoolean(),
  body("project").optional().notEmpty().withMessage("Project is required").trim().escape(),
];

const createProjectFormValidation = () => [
  body("name").isString().trim().escape(),
]

const createDeleteTaskValidation = () => [
  params("taskId").custom((value) =>mongoose.isValidObjectId(value)).withMessage("Invalid task ID")
]

export {
  createTaskFormValidation,
  createProjectFormValidation,
  createDeleteTaskValidation,
};