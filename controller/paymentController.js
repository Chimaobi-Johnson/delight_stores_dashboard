
const Payment = require('../models/Payment');
const cloudinary = require('../utils/cloudinary');
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys');
const { productReceiptConfirmation } = require('../html/emailTemplate');

exports.storePaymentDetails = (req, res) => {
    const { firstName, lastName, deliveryType, email, products, paymentRef, purchasedBy } = req.body
  
    sgMail.setApiKey(keys.sendGridAPI)

    const msg = {
        to: email, // Change to your recipient
        from: 'Dlight Stores <support@delighthomewarestores.com>', // Change to your verified sender
        subject: 'Thank you for shopping with us',
        text: 'Your order has been confirmed',
        html: productReceiptConfirmation(req.body),
      }
    const payment = new Payment({
        ...req.body,
        userEmail: email
    })
    payment.save().then(data => {
        return sgMail.send(msg) 
    }).then(data => {
        console.log('email sent')
        res.status(200).json({ data: data })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ data: 'Server error, check connection or try again later'})
    })

}