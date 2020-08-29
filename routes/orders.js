
const express = require('express');
const Order = require('../models/order');
const router = express.Router();


router.get('/',async (req, res) => {
   
    let orders = await Order.find();
    res.send({status:res.statusCode,orders,message:""});
    //res.sendStatus(200).send(heroes);
});

module.exports = router;


