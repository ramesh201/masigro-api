const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    customerEmail: {
        type : String,
        minlength : 10,
        maxlength : 100,
        required : true
    },
    customerPassword: {
        type : String,
        required : true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;