
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();


router.post("/", async (req, res) => {
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

    return res.send({status:200,users:{
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
