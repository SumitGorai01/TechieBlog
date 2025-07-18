// index.js (ES Module version)
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const events = [];

app.post("/api/events", (req, res) => {
  const event = req.body;
  console.log("New Event Received:", event);
  events.push(event);
  res.status(201).json({ message: "Event added successfully" });
});

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
