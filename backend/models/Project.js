import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProjectSchema = new Schema({
  name: String 
});

const Project = model("Project", ProjectSchema);

export default Project