
const express = require('express');
const Order = require('../models/order');
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "123456";

router.get('/',async (req, res) => {
   
    let orders = await Order.find();
    res.send({status:res.statusCode,orders,message:""});
    //res.sendStatus(200).send(heroes);
});

router.get('/:customerToken',async (req, res) => {
    let orders = await Order.find({
        customerToken: req.params.customerToken,
      });
      if (!orders) {
        //product = [];
        console.log("empty");
        return res.send({
          status: 400,
          orders: [],
          message: "The given Id does not exist on our server",
        }); //res.status(404).send("The given Id does not exist on our server");
      }
      console.log(orders);
      //res.sendStatus(200).send(product);
      res.send({ status: res.statusCode, orders, message: "" });
});

router.post("/", async (req, res) => {

    /*const userToken = req.header("x-jwt-token");
    console.log("usertoken selected");
    if(!userToken) return res.status(401).send("Access denied. No token");
    console.log("usertoken empty");
    try {
        jwt.verify(userToken,SECRET_KEY);
        console.log(userToken);
    } catch (error) {
        res.status(400).send("invalid token");
    }

    var decode = jwt.decode(userToken,SECRET_KEY);
    console.log("decoded Obj: " +JSON.stringify(decode));
*/
    /*if (!req.body.customerToken) {
      return res.send({
        status: 400,
        orders: {},
        message: "No customerToken have been set!",
      }); //res.status(400).send("Not all mandatory values have been set!");
    }*/
console.log("finished auth");
    if (!req.body.orderDate) {
        return res.send({
          status: 400,
          orders: {},
          message: "No order date have been set!",
        }); //res.status(400).send("Not all mandatory values have been set!");
      }

    try {
      let orderTOBeAddedToDb = new Order({
        customerToken: req.body.customerToken,
        orderArr: req.body.orderArr,
    orderDate: req.body.orderDate,
    isCompleted: req.body.isCompleted
      });
      console.log(orderTOBeAddedToDb);
      orderTOBeAddedToDb = await orderTOBeAddedToDb.save();
      //res.send(productTOBeAddedToDb);
      res.send({
        status: res.statusCode,
        orders: { orderTOBeAddedToDb },
        message: "",
      });
    } catch (e) {
      return res.send({ status: 500, orders: {}, message: e.message }); //res.status(500).send(e.message);
    }
  });
  
  router.put("/:orderId", async (req, res) => {
      console.log(req.body.orderArr);
    let order = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      { $set: { orderArr: req.body.orderArr } },
      { new: true, useFindAndModify: false }
    );
    res.send(order);
  });

module.exports = router;


