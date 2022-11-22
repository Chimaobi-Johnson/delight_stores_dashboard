const express = require('express');
const categoriesController = require('../controller/categoriesController');


const router = express.Router();


router.post('/api/category/new', categoriesController.addCategory)
router.get('/api/categories', categoriesController.getAllCategories)


module.exports = router;
