const mongoose = require('mongoose');

const soldproductSchema = new mongoose.Schema({
    name: String,
    price: String,
    equity: String,
    userId: String,
    productname: String,
    videoURL: String,
    img: {
        data: Buffer,
        contentType: String
    },
    description: String 
});

module.exports = mongoose.model("soldproduct", soldproductSchema);