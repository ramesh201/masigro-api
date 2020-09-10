const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const router = express.Router();

const SECRET_KEY = "123456";

router.post("/",async (req,res) => {
try {
    let userObj = await User.findOne({ userEmail: req.body.userEmail });
    console.log(req.body.userEmail);
    
    if (!userObj) return res.status(400).send("Invalid User email / password");
    console.log(userObj);
    console.log("before pwd: ");
    let passwordValid = await bcrypt.compare(req.body.userPassword,userObj.userPassword);
    if (!passwordValid) return res.status(400).send("Invalid User email / password");
    console.log(req.body.userPassword);
    let token = jwt.sign({id: userObj._id, userFirstName: userObj.userFirstName,userLastName:userObj.userLastName,userEmail: userObj.userEmail,username: userObj.username,roles: userObj.userRoles},SECRET_KEY);

    res.send({userFirstName: userObj.userFirstName,userLastName:userObj.userLastName,userEmail: userObj.userEmail,username: userObj.username,roles: userObj.userRoles,token: token});
console.log("end of post action scope");
} catch (error) {
    res.status(500).send(error.message);
}
});



module.exports = router;