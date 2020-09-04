
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    let encryptedHashPassword = await bcrypt.hash(req.body.customerPassword,saltRounds);

    let user = new User({
      username: req.body.username,
      customerEmail: req.body.customerEmail,
      customerPassword: encryptedHashPassword
    });

    user = await user.save();

    return res.send({
      username: user.username,
      customerEmail: user.customerEmail
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
