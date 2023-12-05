const express = require('express');
const productsController = require('../controller/productsController');
const { isLoggedIn, isAdmin } = require('../middleware/isAuth');
const upload = require('../utils/multer');


const router = express.Router();

router.get('/api/products', productsController.getAllProducts)
router.get('/api/product', productsController.getProduct)
router.get('/api/products/ids', upload.none(), productsController.getProductIds)
router.get('/api/products/filter', productsController.filterProductsByCatgory)
router.post('/api/product/add',  isLoggedIn, isAdmin, upload.array('images', 6), productsController.storeProduct)
router.post('/api/product/update',  isLoggedIn, isAdmin, upload.array('images', 6), productsController.updateProduct)
router.post('/api/product/delete', isLoggedIn, isAdmin, upload.none(), productsController.deleteProduct)
router.post('/api/product/image/delete', isLoggedIn, isAdmin, upload.none(), productsController.deleteSingleImage)



module.exports = router;
