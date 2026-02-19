const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "config/config.env") });
const connectDatabase = require("./config/connectDB");

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: "*",
};

app.use(cors(corsOptions)); // MUST be first
app.use(express.json());
// 🔥 handle preflight in Express 5
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    );
    return res.sendStatus(200);
  }
  next();
});

connectDatabase();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Project One Api." });
});

app.use("/api/v1", require("./routes/blog"));
app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1", require("./routes/user"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
