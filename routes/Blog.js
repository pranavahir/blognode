const express = require("express")
const BlogRoute = express.Router() 
const {getAllBlogs,createBlog,getBlogsByUserID,deleteBlog,updateBlog} = require('../controllers/Blog')

BlogRoute.post("/createBlog",createBlog)
BlogRoute.post("/getAllBlogs",getAllBlogs)
BlogRoute.post("/getBlogsByUserID",getBlogsByUserID)
BlogRoute.post("/deleteBlog",deleteBlog)
BlogRoute.post("/updateBlog",updateBlog)

module.exports = BlogRoute;