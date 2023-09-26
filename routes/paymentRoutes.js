const express = require('express');
const paymentController = require('../controller/paymentController');


const router = express.Router();

router.post('/api/store_payment_details', paymentController.storePaymentDetails)



module.exports = router;
