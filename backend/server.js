import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Existing routes
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

// Contact routes
app.post("/api/contact", async (req, res) => {
  const { name, email, date } = req.body;

  if (!name || !email || !date) {
    return res.status(400).json({ ok: false, error: "name, email and date are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, preferred_date)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, date]
    );
    return res.status(201).json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.error("Error saving contact message:", err);
    return res.status(500).json({ ok: false, error: "Failed to save message." });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM contact_messages ORDER BY created_at DESC`
    );
    return res.json({ ok: true, data: result.rows });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return res.status(500).json({ ok: false, error: "Failed to fetch messages." });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});