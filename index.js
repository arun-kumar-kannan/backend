const express = require("express");

const app = express();
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config/config.env") });
const connectDatabase = require("./config/connectDB");

const cors = require("cors");

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
  // res.send("Project One Api.");
  res.json({ message: "Project One Api." }); // json format
});

const blog = require("./routes/blog");
const auth = require("./routes/auth");
const user = require("./routes/user");
app.use("/api/v1", blog);
app.use("/api/v1", auth);
app.use("/api/v1", user);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
