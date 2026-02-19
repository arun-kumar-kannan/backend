const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "config/config.env") });
const connectDatabase = require("./config/connectDB");

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
