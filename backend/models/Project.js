import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProjectSchema = new Schema({
  name: {
    type: String,
    unique: true,
  }
});

const Project = model("Project", ProjectSchema);

export default Project