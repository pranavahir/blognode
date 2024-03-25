const User = require('../model/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
module.exports = {
    register: async (req, res) => {
        try {
            if (!req.body.username) {
                return res.send({
                    success: false,
                    message: "Please Provide username!"
                })
            }
            if (!req.body.password) {
                return res.send({
                    success: false,
                    message: "Please Provide password!"
                })
            }
            const getuser = await User.findOne({username:req.body.username})
            if (getuser) {
                return res.send({
                    success: false,
                    message: "Username Already Exists!"
                })
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            const userdata = new User({
                username:req.body.username,
                password:hashedPassword
            })
            const insertuser = await userdata.save()
            if (!insertuser) {
                return res.send({
                    success: false,
                    message: `Unable to Register User!`
                })
            }
            return res.send({
                success: true,
                message: `User Registered Successfully!`
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    },
    login: async (req, res) => {
        try {
            if (!req.body.username) {
                return res.send({
                    success: false,
                    message: "Please Provide username!"
                })
            }
            if (!req.body.password) {
                return res.send({
                    success: false,
                    message: "Please Provide password!"
                })
            }
            const getuser = await User.findOne({username:req.body.username})
            if (!getuser) {
                return res.send({
                    success: false,
                    message: "User Not Found!"
                })
            }
            const verifypassword = await bcrypt.compare(req.body.password, getuser.password)
            if (!verifypassword) {
                return res.send({
                    success: false,
                    message: "Invalid Password!"
                })
            }
            const token = await jwt.sign(
                { userdata: {...getuser._doc,password:null} },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            )
            return res.send({
                success:true,
                userdata: {...getuser._doc,password:null},
                token:token
            })
        } catch (error) {
            return res.send({
                success: false,
                message: "Something Went Wrong!"
            })
        }
    }
}