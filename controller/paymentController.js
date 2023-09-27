
const Payment = require('../models/Payment');
const cloudinary = require('../utils/cloudinary');


exports.storePaymentDetails = (req, res) => {
    const payment = new Payment({
        ...req.body
    })
    payment.save().then(data => {
        res.status(200).json({ data: data })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ data: 'Server error, check connection or try again later'})
    })
    console.log(req.body)

}