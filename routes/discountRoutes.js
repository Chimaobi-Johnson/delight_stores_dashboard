const express = require('express');
const discountController = require('../controller/discountController');
const { isLoggedIn } = require('../middleware/isAuth');


const router = express.Router();


router.post('/api/discount/apply', isLoggedIn, discountController.applyDiscount)


module.exports = router;
