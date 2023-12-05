const express = require('express');
const categoriesController = require('../controller/categoriesController');
const { isLoggedIn, isAdmin } = require('../middleware/isAuth');
const upload = require('../utils/multer');


const router = express.Router();


router.post('/api/category/new', isLoggedIn, isAdmin, upload.single('image'), categoriesController.addCategory)
router.post('/api/category/update', isLoggedIn, isAdmin, upload.single('image'), categoriesController.updateCategory)
router.post('/api/category/delete', isLoggedIn, isAdmin, upload.none(), categoriesController.deleteCategory)
router.get('/api/category', categoriesController.editCategory)
router.get('/api/categories', categoriesController.getAllCategories)


module.exports = router;
