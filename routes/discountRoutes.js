const express = require('express');
const discountController = require('../controller/discountController');
const { isLoggedIn } = require('../middleware/isAuth');
const upload = require('../utils/multer');



const router = express.Router();


router.post('/api/discount/apply', isLoggedIn, upload.none(), discountController.applyDiscount)


module.exports = router;
