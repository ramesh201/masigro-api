
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerToken: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    orderArr: {
        type: Array,
        default: [{}]
    },
    orderDate: {
        type: String,
        default: new Date().toISOString()
    },
    isCompleted: {
        type: Boolean,
        default: false
    }

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;