const express = require("express");
const blogSchema = require("../models/blogModel");
// const blogModel = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  const blog = await blogSchema.create(req.body);
  res.json({
    success: true,
    blog: blog,
  });
};
exports.getBlog = async (req, res) => {
  const blog = await blogSchema.find({});
  res.json({
    success: true,
    blog: blog.map((b) => ({
      title: b.title,
      content: b.content,
      author: b.author,
    })),
  });
};
// exports.getBlog = async (req, res) => {
//   const blog = await blogSchema.find({});
//   res.json({
//     success: true,
//     blog: blog,
//   });
// };

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findById(req.params.id);
    res.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      success: true,
      message: "Blog Updated Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await blogSchema.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
