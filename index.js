const express = require("express");

const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config({ path: path.join(__dirname, "config/config.env") });
const connectDatabase = require("./config/connectDB");
app.use(cors());

connectDatabase();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  // res.send("Project One Api.");
  res.json({ message: "Project One Api." }); // json format
});

app.use(express.json());
const blog = require("./routes/blog");
const auth = require("./routes/auth");
const user = require("./routes/user");
app.use("/api/v1", blog);
app.use("/api/v1", auth);
app.use("/api/v1", user);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
