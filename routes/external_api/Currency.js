const axios = require("axios");
const https = require('https');
const express = require('express');
const router = express.Router();

const CURRENCY_API_URL = "https://currencyapi.net/api/v1/rates";
const CURRENCY_API_KEY = "aNz7tamcCatm5mMXrP3rn6tRxTdyvTBdkbIC";

const apiBaseCurrency = "USD";
const productBaseCurrency = "LKR";
const apiCall = CURRENCY_API_URL + "?key=" + CURRENCY_API_KEY + "&base=" + apiBaseCurrency;

// let ratesArray = [];

router.get('/', (req, res) => {
    return res.send(
        getcurrencyRatesArray()
    );
});

router.get('/getRate', (req, res) => {

    return res.send(getcurrencyRatesArray());
});

async function getcurrencyRatesArray() {
    try {
        var { data } = await axios.get(apiCall);

        console.log(data);


        console.log("DEBUG: resObj:" + JSON.stringify(data));
        console.log("DEBUG: updated:" + data.updated);
        console.log("DEBUG: time:" + new Date(data.updated).toISOString());

        // if (data) {
        //     // return resObj.rates;
        //     return data;
        // }

        return JSON.stringify(data);
    } catch (e) {
        console.log(e.message);
    }

    return [];
}

module.exports = router;