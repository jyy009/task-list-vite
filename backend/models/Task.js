import mongoose from "mongoose"

const { Schema, model } = mongoose

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  description: {
    type: String,
    maxLength: 140,
  },
  due: {
    type: Date,
    default: new Date(),
  },
  priority: {
    type: Boolean,
    default: false,
  },
  project: {
  type: String,
  },
});

const Task = model("Task", TaskSchema)

export default Task