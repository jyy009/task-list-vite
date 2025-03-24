import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const cors = require("cors");
dotenv.config();

const mongoURL = process.env.MONGO_URL || "mongodb://localhost/tasks";

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
mongoose.Promise = global.Promise;

//model
const Task = mongoose.model("Task", {
  title: String,
  description: String,
  due: {
    type: Date,
    default: () => new Date(),
  },
  priority: Boolean,
  project: String,
});

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tasks", async (req, res) => {
  const allTasks = await Task.find().exec();
  res.json(allTasks);
});

app.put("/tasks", async (req, res) => {
  console.log("Received request body:", req.body);

  try {
    const { title, description, priority, project } = req.body;
    console.log("Extracted data:", { title, description, priority, project });

    const newTask = new Task({ title, description, priority, project });
    console.log("Created new Task instance:", newTask);

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
