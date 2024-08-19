const express = require('express');
const paymentController = require('../controller/paymentController');
const upload = require('../utils/multer');


const router = express.Router();

router.post('/api/store_payment_details', upload.none(), paymentController.storePaymentDetails)



module.exports = router;
