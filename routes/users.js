
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "123456";

router.post("/", async (req, res) => {

    const userToken = req.header("x-jwt-token");
    if(!userToken) return res.status(401).send("Access denied. No token");

    try {
        jwt.verify(userToken, SECRET_KEY);
        console.log(userToken);
    } catch (error) {
        res.status(400).send("invalid token");
    }

    console.log("userToken");
  try {
    const saltRounds = await bcrypt.genSalt(10);
    let encryptedHashPassword = await bcrypt.hash(req.body.userPassword,saltRounds);

    let isExisting = await User.findOne({ userEmail: req.body.userEmail });
//console.log(isExisting);
if(isExisting == null){
    let user = new User({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
      username: req.body.username,
      userEmail: req.body.userEmail,
      userPassword: encryptedHashPassword,
      userRoles: req.body.userRoles == "" ? "subscriber" : req.body.userRoles
    });

    user = await user.save();

    return res.send({status:res.statusCode,users:{
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        username: user.username,
        userEmail: user.userEmail,
        userRoles: user.userRoles
      },message:"New user is created in system"});
}
else{
    return res.send({status:100,users:{
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        username: isExisting.username,
        userEmail: isExisting.userEmail,
        userRoles: isExisting.userRoles
      },message:"User already in system"});
}
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
