const express = require('express');
const categoriesController = require('../controller/categoriesController');
const upload = require('../utils/multer');


const router = express.Router();


router.post('/api/category/new', upload.single('image'), categoriesController.addCategory)
router.get('/api/category', categoriesController.editCategory)
router.get('/api/categories', categoriesController.getAllCategories)


module.exports = router;
