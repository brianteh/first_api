const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orders_name: {type: String, required : true},
    orders_price: {type: Number, required : true}
});

module.exports = mongoose.model('Order', orderSchema);