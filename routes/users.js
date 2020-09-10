
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "123456";

router.post("/", async (req, res) => {

    /*const userToken = req.header("x-jwt-token");
    if(!userToken) return res.status(401).send("Access denied. No token");

    try {
        jwt.verify(userToken, SECRET_KEY);
        console.log(userToken);
    } catch (error) {
        res.status(400).send("invalid token");
    }

    console.log("userToken");
    */
   console.log("API-0");
  try {
    console.log("before salt");
    const saltRounds = await bcrypt.genSalt(10);
    console.log("after salt");
    let encryptedHashPassword = await bcrypt.hash(req.body.userPassword,saltRounds);
    console.log("API");
    let isExisting = await User.findOne({ userEmail: req.body.userEmail });
console.log("exist: "+isExisting);
if(isExisting == null){
    console.log("im here");
    /*let user = new User({
        userFirstName: "FN",//req.body.userFirstName,
        userLastName: "LN",//req.body.userLastName,
      username: "fl",//req.body.username,
      userEmail: "flhghhgh@fl.lk",//req.body.userEmail,
      userPassword: encryptedHashPassword,
      userRoles: "",//req.body.userRoles == "" ? "subscriber" : req.body.userRoles
    });*/

    let user = new User({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
      username: req.body.username,
      userEmail: req.body.userEmail,
      userPassword: encryptedHashPassword,
      userRoles: req.body.userRoles == "" ? "subscriber" : req.body.userRoles
    });

    console.log("im out");
    try {
        user = await user.save();
        console.log("im saved");
    } catch (error) {
        console.log("error: "+error.message);
    }
    
    console.log("after saved");
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
