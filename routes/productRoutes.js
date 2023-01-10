const express = require('express');
const productsController = require('../controller/productsController');
const upload = require('../utils/multer');


const router = express.Router();

router.get('/api/products', productsController.getAllProducts)
router.post('/api/product/add',  upload.array('images', 6), productsController.storeProduct)


module.exports = router;
