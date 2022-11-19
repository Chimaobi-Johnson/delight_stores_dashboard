const express = require('express');
const categoriesController = require('../controller/categoriesController');


const router = express.Router();

router.get('/api/categories', categoriesController.getAllCategories)

module.exports = router;
