const mongoose = require('mongoose');
//const { Double } = require('bson');

const productSchema = new mongoose.Schema({
    productName: {
        type : String,
        minlength : 4,
        maxlength : 20,
        required : true
    },
    price: {
        type : Number,
        default : 0.00,
        required : true
    },
    isActive: {
        type : Boolean,
        default : true,
        required : true
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
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;