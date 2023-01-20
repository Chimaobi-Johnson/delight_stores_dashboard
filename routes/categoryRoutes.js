const express = require('express');
const categoriesController = require('../controller/categoriesController');
const { isLoggedIn } = require('../middleware/isAuth');
const upload = require('../utils/multer');


const router = express.Router();


router.post('/api/category/new', isLoggedIn, upload.single('image'), categoriesController.addCategory)
router.post('/api/category/update', isLoggedIn, upload.single('image'), categoriesController.updateCategory)
router.post('/api/category/delete', isLoggedIn, upload.none(), categoriesController.deleteCategory)
router.get('/api/category', isLoggedIn, categoriesController.editCategory)
router.get('/api/categories', isLoggedIn, categoriesController.getAllCategories)


module.exports = router;
