const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const urlpathlowercasemaker = require("../middlewares/urlpathlowercasemaker");
var xxx = router.use(urlpathlowercasemaker);
//console.log(xxx);
//const app = express();
let productsArray = [
  {
    id: 1,
    name: "Captain America",
  },
];
//app.use('/api/products',router);

router.get("/", async (req, res) => {//(req, res) => {
  let products = await Product.find();
  res.send({ status: res.statusCode, products, message: "hiiiii" });
  //res.sendStatus(200).send(heroes);
});
/*router.get("/Products", async (req, res) => {//(req, res) => {
    let products = await Product.find();
    res.send({ status: res.statusCode, products, message: "xdghcfgh" });
    //res.sendStatus(200).send(heroes);
  });*/
/*router.get("/:categoryName", async (req, res) => {//(req, res) => {
    //router.use(urlpathlowercasemaker);
    console.log(urlpathlowercasemaker);
  let products = await await Product.find({
    categoryName: req.params.categoryName,
  });
  if (!products) {
    //product = [];
    console.log("empty");
    return res.send({
      status: 400,
      products: [],
      message: "The given Id does not exist on our server",
    }); //res.status(404).send("The given Id does not exist on our server");
  }
  console.log(products);
  //res.sendStatus(200).send(product);
  res.send({ status: res.statusCode, products, message: "" });
});*/

router.post("/", async (req, res) => {
  if (!req.body.productName) {
    return res.send({
      status: 400,
      products: {},
      message: "Not all mandatory values have been set!",
    }); //res.status(400).send("Not all mandatory values have been set!");
  }

  try {
    let productTOBeAddedToDb = new Product({
      productName: req.body.productName,
      price: req.body.price,
      categoryName: req.body.categoryName,
      imgUrl: req.body.imgUrl,
      RAMDetails: req.body.RAMDetails,
      CPUDetails: req.body.CPUDetails,
      Storage: req.body.Storage,
      Display: req.body.Display,
      Description: req.body.Description,
      Qty: req.body.Qty
    });

    productTOBeAddedToDb = await productTOBeAddedToDb.save();
    //res.send(productTOBeAddedToDb);
    res.send({
      status: res.statusCode,
      products: { productTOBeAddedToDb },
      message: "",
    });
  } catch (e) {
    return res.send({ status: 500, products: {}, message: e.message }); //res.status(500).send(e.message);
  }
});

module.exports = router;
