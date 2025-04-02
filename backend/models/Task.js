import mongoose from "mongoose"

const { Schema, model } = mongoose

const TaskSchema = new Schema({
  title: String,
  description: String,
  due: {
    type: Date,
    default: new Date(),
  },
  priority: Boolean,
  project: String,
});

const Task = model("Task", TaskSchema)

export default Task