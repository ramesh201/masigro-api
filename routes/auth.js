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

    let passwordValid = await bcrypt.compare(req.body.userPassword,userObj.userPassword);
    if (!passwordValid) return res.status(400).send("Invalid User email / password");

    let token = jwt.sign({id: userObj._id, cusEmail: userObj.userEmail},SECRET_KEY);

    res.send({userEmail: userObj.userEmail,username: userObj.username,token: token});

} catch (error) {
    res.status(500).send(error.message);
}
});

module.exports = router;