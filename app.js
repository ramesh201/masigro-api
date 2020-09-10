//alert("Hello masigro!!!")
var newUrl = null;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const products = require('./routes/products');
const home = require('./routes/home');
const orders = require('./routes/orders');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const randomtokengenerator = require('./middlewares/randomtokengenerator');
const urlpathlowercasemaker = require('./middlewares/urlpathlowercasemaker');
/*const mailer = require('./middlewares/emailjob');*/
const Product = require("./models/product");
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

/*app.use(function(req, res, next) {
    //console.log('Called URL:', req.url);
    req.url = req.url.toLowerCase();
    newUrl = req;
    next();
  });*/

  

/*app.use(authenticator);
app.use(mailer);*/
//app.use(randomtokengenerator);
app.use(urlpathlowercasemaker);
//console.log(app.use(urlpathlowercasemaker));
app.use('/api/products', products);
app.use('/', home);
app.use('/api/orders', orders);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.get('/api/products/:categoryName', async (newUrl, res, next) => { //function(newUrl, res, next) {
    //res.send('Hey there... '+newUrl.url);
console.log("LowerCase - "+newUrl.params.categoryName);
try{
    let products = null;
    
    if(typeof(newUrl.params.categoryName) == "undefined"){
        console.log("undi");
        products = await Product.find();
    }
    else{
        console.log("not - undi");
        products = await Product.find({
        categoryName: newUrl.params.categoryName,
      });
    }
      console.log(products);
      if (!products) {
        //product = [];
        console.log("empty");
        return res.send({
          status: 400,
          products: [],
          message: "This category id not on our Masigro API",
        }); //res.status(404).send("The given Id does not exist on our server");
      }
      //console.log(products);
      //res.sendStatus(200).send(product);
      res.send({ status: res.statusCode, products, message: "products" });

    } catch (e) {
        return res.send({ status: 500, products: {}, message: e.message }); //res.status(500).send(e.message);
      }

  });

//var dbUrl = "mongodb+srv://user:user123@cluster0.ur7jd.mongodb.net/masigrodb?retryWrites=true&w=majority";
var dbUrl = "mongodb://localhost/masigrodb"
mongoose
    .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Masigro Db successfully ... "))
    .catch(err => console.log("Ërror has occured while connecting to db : ", err));

app.listen(PORT, function () {
    console.log("Masigro - Listening on Port - " + PORT);
});