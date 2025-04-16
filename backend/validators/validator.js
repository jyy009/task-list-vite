import { isValidObjectId } from "mongoose";
import mongoose from "mongoose";
const { body } = require("express-validator");

const createTaskFormValidation = () => [
  body("title")
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title is required")
    .trim()
    .escape(),
  body("description").optional().isString().trim().escape(),
  body("due").optional().isISO8601().toDate(),
  body("priority").optional().isIn(["true", "false", true, false]).toBoolean(),
  body("project").optional().trim().escape(),
];

const createProjectFormValidation = () => [
  body("name").isString().trim().escape(),
];

export { createTaskFormValidation, createProjectFormValidation };
