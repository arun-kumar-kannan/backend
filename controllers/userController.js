const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  const users = await userModel.find({});
  res.json({
    success: true,
    users: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
    })),
  });
};

exports.getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json({
      success: true,
      message: "Secure Data",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {   new: true });           
    res.json({
      success: true,
      message: "User Updated Successfully",   
      user: {                     
        id: user._id, 
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};              
