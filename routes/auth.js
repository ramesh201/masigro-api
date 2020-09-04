const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const router = express.Router();

const SECRET_KEY = "123456";

router.post("/",async (req,res) => {
try {
    let user = await User.findOne({ customerEmail: req.body.CustomerEmail });
    console.log(req.body.customerEmail);
    if (!user) return res.status(400).send("Invalid email");

    let pwValid = await bcrypt.compare(req.body.customerPassword,user.customerPassword);
    if (!pwValid) return res.status(400).send("Invalid email / password");

    let token = jwt.sign({id: user._id, cusEmail: user.customerEmail},SECRET_KEY);

    res.send({token: token});

} catch (error) {
    res.status(500).send(error.message);
}
});

module.exports = router;