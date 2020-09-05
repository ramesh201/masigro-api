const mongoose = require('mongoose');
//const { Double } = require('bson');

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

    /*name: {
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

    /*
    "productName": "MacBook Pro 13 - (2020)",
    "price": "267000.00",
    "categoryName":"MacBook",
    "imgUrl": "https://www.apple.com/v/mac/home/at/images/overview/compare/macbook_pro_13__ft1pc3lqwd6y_large.jpg",
    "RAM":"8 GB",
    "CPU":"1.4 GHz quad core 8th gen",
    "Storage":"256GB SSD",
    "Display":"13 inch Retina display",
    "Description":
*/

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;