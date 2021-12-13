const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products_name: {type: String, required : true},
    products_price: {type: Number, required : true}
});

module.exports = mongoose.model('Product', productSchema);