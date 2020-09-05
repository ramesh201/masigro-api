const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userFirstName: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    userLastName: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    username: {
        type : String,
        minlength : 2,
        maxlength : 100,
        required : true
    },
    userEmail: {
        type : String,
        minlength : 10,
        maxlength : 100,
        required : true
    },
    userPassword: {
        type : String,
        required : true
    },
    userRoles: {
        type: String,
        default: "subscriber"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;