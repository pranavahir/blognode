const express = require("express")
const AuthenticationRoute = express.Router() 
const {register,login} = require('../controllers/Authentication')

AuthenticationRoute.post("/register",register)
AuthenticationRoute.post("/login",login)

module.exports = AuthenticationRoute;