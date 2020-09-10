
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Masigro Online Shopping API Home");
});

module.exports = router;