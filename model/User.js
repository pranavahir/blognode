const mongoose = require("mongoose")
const Schema = mongoose.Schema
const options = {
    timestamps:true
}
const UserSchema = new Schema({
    username:{
        type:"String",
        required:true,
        unique:true,
        index: true
    },
    password:{
        type:"String",
        required:true
    }
},options)

module.exports = mongoose.model("User",UserSchema)