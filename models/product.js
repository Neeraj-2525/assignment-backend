const { timeStamp } = require("console")
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    productID: {
        type:mongoose.Schema.Types.ObjectId,
    },
    category: {
        type:String,
    },

    model: {
        type:String,
    },

    serialNum: {
        type:String,
        required: true,
    },

    dateOfInvoice: {
        type:Date,
    },

    imagePath:{
        type:String,
        required:true,
    }
}, {timestamps: true})

module.exports = mongoose.model('product', productSchema);