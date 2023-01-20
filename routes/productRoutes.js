const express = require('express');
const productsController = require('../controller/productsController');
const { isLoggedIn } = require('../middleware/isAuth');
const upload = require('../utils/multer');


const router = express.Router();

router.get('/api/products', isLoggedIn, productsController.getAllProducts)
router.get('/api/product/edit', isLoggedIn, productsController.editProduct)
router.post('/api/product/add',  isLoggedIn, upload.array('images', 6), productsController.storeProduct)
router.post('/api/product/update',  isLoggedIn, upload.array('images', 6), productsController.updateProduct)
router.post('/api/product/delete', isLoggedIn, upload.none(), productsController.deleteProduct)
router.post('/api/product/image/delete', isLoggedIn, upload.none(), productsController.deleteSingleImage)



module.exports = router;
