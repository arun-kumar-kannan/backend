const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlog,
  updateBlog,
  getSingleBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.post("/blog", createBlog);
router.get("/blog", getBlog);
router.patch("/blog/:id", updateBlog);
router.get("/blog/:id", getSingleBlog);
router.delete("/blog/:id", deleteBlog);

module.exports = router;
