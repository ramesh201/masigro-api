//alert("Hello masigro!!!")

const express = require('express');
const mongoose = require('mongoose');
/*const cors = require('cors');*/
const products = require('./routes/products');
const home = require('./routes/home');
const orders = require('./routes/orders');
const customers = require('./routes/customers');
const randomtokengenerator = require('./middlewares/randomtokengenerator');
/*const mailer = require('./middlewares/emailjob');*/
const app = express();
const PORT = 4000;

//app.use(cors());
app.use(express.json());
/*app.use(authenticator);
app.use(mailer);*/
app.use(randomtokengenerator);
app.use('/api/products', products);
app.use('/', home);
app.use('/api/orders', orders);
app.use('/api/customers', customers);

mongoose
    .connect("mongodb://localhost/masigrodb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Masigro Db successfully ... "))
    .catch(err => console.log("Ërror has occured while connecting to db : ", err));

app.listen(PORT, function () {
    console.log("Masigro - Listening on Port - " + PORT);
});