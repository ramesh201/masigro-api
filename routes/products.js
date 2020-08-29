const express = require('express');
const Product = require('../models/product');
const router = express.Router();


let productsArray = [
    {
        id: 1,
        name: 'Captain America'
    }
];


router.get('/',async (req, res) => {
 
    let products = await Product.find();
    res.send({status:res.statusCode,products,message:""});
    //res.sendStatus(200).send(heroes);
});

router.get('/:productId', async (req, res) => {
    let products = await Product.findById(req.params.productId);
    if (!products) {
        //product = [];
        return res.send({status:400,products:[],message:"The given Id does not exist on our server"}) //res.status(404).send("The given Id does not exist on our server");
    }

    //res.sendStatus(200).send(product);
    res.send({status:res.statusCode,products,message:""})
});

router.post('/', async (req, res) => {
    if (!req.body.productName) {
        return res.send({status:400,products:{},message:"Not all mandatory values have been set!"})//res.status(400).send("Not all mandatory values have been set!");
    }

    /*let newHeroObj = {
        id: heroesArray.length + 1,
        name: req.body.heroName
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj);*/

    try {
        let productTOBeAddedToDb = new Product({
            productName: req.body.productName,
            price: req.body.price
        }); 

        productTOBeAddedToDb = await productTOBeAddedToDb.save();
        //res.send(productTOBeAddedToDb);
        res.send({status:res.statusCode,products:{productTOBeAddedToDb},message:""})
    } catch (e) {
        return res.send({status:500,products:{},message:e.message})//res.status(500).send(e.message);
    }
    
});

module.exports = router;


