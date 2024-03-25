const mongoose = require("mongoose")
const Schema = mongoose.Schema
const options = {
    timestamps: true
}
const BlogSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index:true
    },
    title: {
        type: "String",
        required: true,
        index: true
    },
    description: {
        type: "String",
        required: true
    },
    category: {
        type: "String",
        required: true
    }
}, options)

module.exports = mongoose.model("Blog", BlogSchema)