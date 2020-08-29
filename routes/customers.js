const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();


router.get('/',async (req, res) => {
   
    let customers = await Customer.find();
    res.send({status:res.statusCode,customers,message:""});
    //res.sendStatus(200).send(heroes);
});

module.exports = router;