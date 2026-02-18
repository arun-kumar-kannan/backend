const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");

const {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", verifyToken, getUser);
router.get("/profile/:id", verifyToken, getSingleUser);
router.put("/profile/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

module.exports = router;
