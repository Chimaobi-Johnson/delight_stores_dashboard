const express = require('express');
const discountController = require('../controller/discountController');
const { isLoggedIn } = require('../middleware/isAuth');
const upload = require('../utils/multer');



const router = express.Router();

router.get('/api/discounts', isLoggedIn, discountController.getDiscounts)
router.post('/api/discount/apply', isLoggedIn, upload.none(), discountController.applyDiscount)
router.post('/api/discount/status', isLoggedIn, discountController.updateStatus)


module.exports = router;
