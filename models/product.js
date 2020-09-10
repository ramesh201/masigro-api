const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type : String,
        minlength : 4,
        maxlength : 50,
        required : true
    },
    price: {
        type : String,
        default : "0.00",
        required : true
    },
    isActive: {
        type : Boolean,
        default : true,
        required : true
    },
    categoryName: {
        type : String,
        minlength : 4,
        maxlength : 50,
        required : true
    },
    imgUrl: {
        type : String,
        default : "Image link set here"
    },
    RAMDetails: {
        type : String,
        minlength : 2,
        maxlength : 50,
        required : true
    },
    CPUDetails: {
        type : String,
        minlength : 4,
        maxlength : 50,
        required : true
    },
    Storage:{
        type : String,
        minlength : 4,
        maxlength : 50,
        required : true
    },
    Display: {
        type : String,
        minlength : 4,
        maxlength : 50,
        required : true
    },
    Description: {
        type : String,
        minlength : 10,
        maxlength : 500,
        required : true
    },
    Qty: {
        type: Number,
        required: true
    }

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;