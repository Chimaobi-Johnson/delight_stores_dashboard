const express = require('express');
const productsController = require('../controller/productsController');


const router = express.Router();

router.get('/api/products', productsController.getAllProducts)
router.post('/api/product/add', productsController.storeProduct)


module.exports = router;
