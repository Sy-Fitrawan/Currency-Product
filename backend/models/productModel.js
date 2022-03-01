const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },

    department: {
        type: String,
        required: [true, "Please enter product department"]
    },

    price: {
        type: mongoose.Decimal128,
        set: (v) => mongoose.Types.Decimal128.fromString(parseFloat(v).toFixed(2)),
        default: 0,
        required: [true, "Please enter product price"]
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)