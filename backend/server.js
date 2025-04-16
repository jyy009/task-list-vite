import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import projectRoutes from "./routes/projects.js";
require("dotenv").config({ path: "../.env" });

const mongoURL = process.env.MONGO_URL || "mongodb://localhost/tasks";

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
mongoose.Promise = global.Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
