const express = require('express');
const Customer = require('../models/customer');
const router = express.Router();


router.get('/',async (req, res) => {
   
    let customers = await Customer.find();
    res.send({status:res.statusCode,customers,message:""});
    //res.sendStatus(200).send(heroes);
});

router.get("/:tokenId", async (req, res) => {//(req, res) => {
    //router.use(urlpathlowercasemaker);
    //console.log(urlpathlowercasemaker);
  let customers = await Customer.find({
    customerToken: req.params.tokenId,
  });
  if (!customers) {
    //product = [];
    console.log("empty");
    return res.send({
      status: 400,
      customers: [],
      message: "The given Id does not exist on our server",
    }); //res.status(404).send("The given Id does not exist on our server");
  }
  console.log(customers);
  //res.sendStatus(200).send(product);
  res.send({ status: res.statusCode, customers, message: "" });
});

router.post("/", async (req, res) => {
    if (!req.body.customerFirstName) {
      return res.send({
        status: 400,
        customers: {},
        message: "Not all mandatory values have been set!",
      }); //res.status(400).send("Not all mandatory values have been set!");
    }
  
    try {
      let customerTOBeAddedToDb = new Customer({
        customerToken: req.body.customerToken,
    customerFirstName: req.body.customerFirstName,
    customerLastName: req.body.customerLastName,
    customerEmail: req.body.customerEmail,
    customerAddress: req.body.customerAddress
      });
  
      customerTOBeAddedToDb = await customerTOBeAddedToDb.save();
      //res.send(productTOBeAddedToDb);
      res.send({
        status: res.statusCode,
        customers: { customerTOBeAddedToDb },
        message: "",
      });
    } catch (e) {
      return res.send({ status: 500, customers: {}, message: e.message }); //res.status(500).send(e.message);
    }
  });

module.exports = router;