const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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

module.exports = mongoose.model("product", productSchema);
