const express = require('express');
const productsController = require('../controller/productsController');


const router = express.Router();

router.get('/api/products', productsController.getAllProducts)



module.exports = router;
