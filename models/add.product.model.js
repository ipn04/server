const mongoose = require('mongoose');

const productSChema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", productSChema);

module.exports = Product;
