const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        trim: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Category", categorySchema)