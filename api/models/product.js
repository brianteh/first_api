const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products_name: String,
    products_price: Number
});

module.exports = mongoose.model('Product', productSchema);