const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
require('dotenv').config(); // For .env file support

// Test console log to ensure .env is loaded
console.log("MongoDB URI from .env file:", process.env.MONGO_URI);

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose schema and model
const professionalSchema = new mongoose.Schema({
  professionalName: String,
  base64Image: String,
  nameLink: {
    firstName: String,
    url: String,
  },
  primaryDescription: String,
  workDescription1: String,
  workDescription2: String,
  linkTitleText: String,
  linkedInLink: {
    text: String,
    link: String,
  },
  githubLink: {
    text: String,
    link: String,
  },
});

const Professional = mongoose.model("Professional", professionalSchema);

// Seed data block (optional, keep commented if data is already in MongoDB)
// const seedData = new Professional({
//   professionalName: "John Doe",
//   base64Image: "data:image/png;base64,<your-base64-image>", // Replace with actual base64 string
//   nameLink: {
//     firstName: "John",
//     url: "https://example.com",
//   },
//   primaryDescription: "Professional software developer with 10 years of experience.",
//   workDescription1: "Specializes in full-stack web development.",
//   workDescription2: "Enjoys mentoring and contributing to open-source projects.",
//   linkTitleText: "Find me online:",
//   linkedInLink: {
//     text: "LinkedIn",
//     link: "https://linkedin.com/in/johndoe",
//   },
//   githubLink: {
//     text: "GitHub",
//     link: "https://github.com/johndoe",
//   },
// });

// Uncomment these lines to seed the database once, then comment them again:
// seedData.save()
//   .then(() => console.log("Seed data added successfully"))
//   .catch((err) => console.error("Error seeding data:", err));

// API Endpoint to fetch data dynamically
app.get('/professional', async (req, res) => {
  try {
    const professional = await Professional.findOne(); // Fetch one document from MongoDB
    res.json(professional);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data from database", error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
