const express = require('express');
const productsController = require('../controller/productsController');
const upload = require('../utils/multer');


const router = express.Router();

router.get('/api/products', productsController.getAllProducts)
router.get('/api/product/edit', productsController.editProduct)
router.post('/api/product/add',  upload.array('images', 6), productsController.storeProduct)
router.post('/api/product/update',  upload.array('images', 6), productsController.updateProduct)
router.post('/api/product/delete', upload.none(), productsController.deleteProduct)



module.exports = router;
