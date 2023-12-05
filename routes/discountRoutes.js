const express = require('express');
const discountController = require('../controller/discountController');
const { isLoggedIn, isAdmin } = require('../middleware/isAuth');
const upload = require('../utils/multer');



const router = express.Router();

router.get('/api/discounts', isLoggedIn, isAdmin, discountController.getDiscounts)
router.post('/api/discount/apply', isLoggedIn, isAdmin, upload.none(), discountController.applyDiscount)
router.post('/api/discount/status', isLoggedIn, isAdmin, discountController.updateStatus)
router.post('/api/discount/delete', isLoggedIn, isAdmin, discountController.deleteDiscount)


module.exports = router;
