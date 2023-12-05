
const Payment = require('../models/Payment');
const cloudinary = require('../utils/cloudinary');
const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys');
const { productReceiptConfirmation } = require('../html/emailTemplate');
const User = require('../models/User');

exports.storePaymentDetails = (req, res) => {
    const { email, products, purchasedBy } = req.body
  
    sgMail.setApiKey(keys.sendGridAPI)

    const msg = {
        to: email,
        from: 'Dlight Stores <support@delighthomewarestores.com>',
        subject: 'Thank you for shopping with us',
        text: 'Your order has been confirmed',
        html: productReceiptConfirmation(req.body),
      }
    const payment = new Payment({
        ...req.body,
        userEmail: email
    })
    if(purchasedBy) { // a user is logged in
        payment.save().then(data => {
            return User.findById(purchasedBy)
        }).then(userData => {
            userData.purchaseHistory = [...userData.purchaseHistory, ...products]
            return userData.save()
        }).then(saved => {
            return sgMail.send(msg) 
        }).then(data => {
            console.log('email sent')
            res.status(200).json({ data: data })
        }).catch(err => {
            console.log(err)
            res.status(500).json({ data: 'Server error, check connection or try again later'})
        })
    } else {
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


}