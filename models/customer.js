const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerToken: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    customerFirstName: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    customerLastName: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    customerEmail: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    customerAddress: {
        type : String,
        minlength : 10,
        maxlength : 100,
        required : true
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

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;