
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

    /*
    name: {
        type : String,
        minlength : 4,
        maxlength : 20,
        required : true
    },
    birthName: {
        type : String,
        required : true
    },
    movies: {
       type : [String],
       enum : ["Infinity War","Endgame","Iron Man 2","First Avenger"]
    },
    likeCount: Number,
    imgUrl: {
        type : String,
        default : "Placeholder Image Link to be updated here ..."
    },
    deceased: Boolean*/
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;