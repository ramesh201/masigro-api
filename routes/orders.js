
const express = require('express');
const Order = require('../models/order');
const jwt = require("jsonwebtoken");
const router = express.Router();

const SECRET_KEY = "123456";

router.get('/', async (req, res) => {

  let orders = await Order.find();
  res.send({ status: res.statusCode, orders, message: "" });
  //res.sendStatus(200).send(heroes);
});

router.get('/:customerToken', async (req, res) => {
  let orders = await Order.find({
    customerToken: req.params.customerToken,
  });
  if (!orders) {
    //product = [];
    console.log("empty");
    return res.send({
      status: 400,
      orders: [],
      message: "This token is not on our API server",
    }); //res.status(404).send("The given Id does not exist on our server");
  }
  console.log(orders);
  //res.sendStatus(200).send(product);
  res.send({ status: res.statusCode, orders, message: "" });
});

router.post("/", async (req, res) => {

  return await orderPost(req, res);

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

async function orderPost(req, res) {
  let order;

  if (!req.body.customerToken) {
    return req.send.status(400).send(
      {
        status: res.statusCode,
        message: "Customer Token Mandetory"
      }
    );
  }

  order = await getIncompleteOrderByCustomerToken(req.body.customerToken);

  if (order != null) {
    // order.orderArr = Array.prototype.push(order.orderArr, req.body.orderArr);
    // order.save();

    return res.send({
      status: res.statusCode,
      data: { "order": order },
      message: "Order already available!"
    });
  }


  try {
    order = new Order({
      customerToken: req.body.customerToken,
      orderArr: req.body.orderArr
    });

    console.log(order);
    order = await order.save();

    return res.send({
      status: res.statusCode,
      data: { "order": order },
      message: "Order Added Successfully"
    });
  } catch (e) {
    return res.send({
      status: 500,
      message: e.message
    });
  }
}

async function getIncompleteOrderByCustomerToken(customerToken) {
  return await Order.findOne({ customerToken: customerToken }, { isCompleted: 'false' });
}

module.exports = router;


