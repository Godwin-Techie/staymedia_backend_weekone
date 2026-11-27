const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

const Intern = require("./models/intern");

app.get("/", (req, res) => {
  res.send("Welcome to STAY MEDIA Backend Development");
});

app.get("/interns", async (req, res) => {
  try {
    const interns = await Intern.find();
    res.json(interns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/interns", async (req, res) => {
  try {
    const intern = await Intern.create(req.body);
    res.status(201).json(intern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
