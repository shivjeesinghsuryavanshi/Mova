require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
});

app.get("/api/weather", async (req, res) => {
  const city = String(req.query.city || "").trim();

  if (!city) {
    return res.status(400).json({
      success: false,
      message: "City is required",
    });
  }

  try {
    const [cities] = await pool.query(
      "SELECT * FROM citi WHERE LOWER(city_name) = LOWER(?) ORDER BY recorded_at DESC",
      [city]
    );
    const [coordinates] = await pool.query(
      "SELECT * FROM latitude_longitude WHERE LOWER(city_name) = LOWER(?) ORDER BY recorded_at DESC",
      [city]
    );

    res.json({
      success: true,
      data: {
        citi: cities,
        latitude_longitude: coordinates,
      },
    });
  } catch (error) {
    console.error("Weather fetch failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch weather data from database",
    });
  }
});

app.get("/api/cities", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT DISTINCT city_name FROM citi WHERE city_name IS NOT NULL AND city_name <> '' ORDER BY city_name"
    );

    res.json({
      success: true,
      data: rows.map((row) => row.city_name),
    });
  } catch (error) {
    console.error("Cities fetch failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch city list",
    });
  }
});
app.get("/api/five-day-weather", async (req, res) => {
  const city = String(req.query.city || "").trim();

  if (!city) {
    return res.status(400).json({
      success: false,
      message: "City is required",
    });
  }

  try {
    const [forecast] = await pool.query(
      "SELECT * FROM five_day_weather WHERE LOWER(city) = LOWER(?) ORDER BY datetime ASC",
      [city]
    );

    res.json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    console.error("Five-day forecast fetch failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch 5-day forecast data from database",
    });
  }
});
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
