const mongoose = require("mongoose")
const Blog = require('../model/Blog')
module.exports = {
    createBlog: async (req, res) => {
        try {
            if (!req.isAuth) {
                return res.send({
                    success: false,
                    message: "UnAuthorized!"
                })
            }
            if (!req.body.title) {
                return res.send({
                    success: false,
                    message: "Please Provide title!"
                })
            }
            if (!req.body.description) {
                return res.send({
                    success: false,
                    message: "Please Provide description!"
                })
            }
            if (!req.body.category) {
                return res.send({
                    success: false,
                    message: "Please Provide category!"
                })
            }
            const newblog = new Blog({ ...req.body, user_id: req.userdata._id })
            const createblog = await newblog.save()
            if (!createblog) {
                return res.send({
                    success: false,
                    message: "Blog Not Posted!"
                })
            }
            return res.send({
                success: true,
                message: "Blog Posted Successfully!"
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    },
    getAllBlogs: async (req, res) => {
        try {
            if (!req.isAuth) {
                return res.send({
                    success: false,
                    message: "UnAuthorized!"
                })
            }
            let ResPerPage = 100
            let page = req.body.pagenumber || 1
            let sort = req.body.sort === 1?1:-1
            let MatchObj = {}
            if(req.body.search){
                // MatchObj.$text = {}
                // MatchObj.$text.$search = req.body.search
                MatchObj = {title: { $regex: req.body.search, $options: 'i' }}
            }
            const getallblogs = await Blog.aggregate([
                { $sort: { createdAt: sort } },
                {$match:MatchObj},
                { $limit: ResPerPage * page - ResPerPage + ResPerPage },
                { $skip: ResPerPage * page - ResPerPage }
            ])
            return res.send({
                success: true,
                message: "Data Fetched Successfully!",
                data: getallblogs
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    },
    getBlogsByUserID: async (req, res) => {
        try {
            if (!req.isAuth) {
                return res.send({
                    success: false,
                    message: "UnAuthorized!"
                })
            }
            let ResPerPage = 100
            let page = req.body.pagenumber || 1
            let sort = req.body.sort === 1?1:-1
            const objectId = new mongoose.Types.ObjectId(req.userdata._id);
            const getallblogs = await Blog.aggregate([
                { $sort: { createdAt: sort } },
                {$match:{user_id:objectId}},
                { $limit: ResPerPage * page - ResPerPage + ResPerPage },
                { $skip: ResPerPage * page - ResPerPage }
            ])
            return res.send({
                success: true,
                message: "Data Fetched Successfully!",
                data: getallblogs
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    },
    deleteBlog:async(req,res) => {
        try {
            if (!req.isAuth) {
                return res.send({
                    success: false,
                    message: "UnAuthorized!"
                })
            }
            if (!req.body.blogid) {
                return res.send({
                    success: false,
                    message: "Please Provide blogid!"
                })
            }
            const objectId = new mongoose.Types.ObjectId(req.body.blogid);
            const user_id = new mongoose.Types.ObjectId(req.userdata._id);
            const deleteblog = await Blog.deleteOne({_id:objectId,user_id:user_id})
            if(!deleteblog.deletedCount){
                return res.send({
                    success: false,
                    message: "Blog Not Deleted!"
                })
            }
            return res.send({
                success: true,
                message: "Blog Deleted Successfully!"
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    }
    ,
    updateBlog:async(req,res) => {
        try {
            if (!req.isAuth) {
                return res.send({
                    success: false,
                    message: "UnAuthorized!"
                })
            }
            if (!req.body.blogid) {
                return res.send({
                    success: false,
                    message: "Please Provide blogid!"
                })
            }
            if(!req.body.title && !req.body.description && !req.body.category){
                return res.send({
                    success: false,
                    message: "Please Provide title,description or category!"
                })
            }
            let UpateObj = {}
            if(req.body.title){
                UpateObj["title"] = req.body.title
            }
            if(req.body.description){
                UpateObj["description"] = req.body.description
            }
            if(req.body.category){
                UpateObj["category"] = req.body.category
            }
            const objectId = new mongoose.Types.ObjectId(req.body.blogid);
            const user_id = new mongoose.Types.ObjectId(req.userdata._id);
            const updateobj = await Blog.updateOne({_id:objectId,user_id:user_id},{$set:UpateObj})
            if(!updateobj.modifiedCount){
                return res.send({
                    success: false,
                    message: "Blog Not Updated!"
                })
            }
            return res.send({
                success: true,
                message: "Blog Updated Successfully!"
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    }
}