
const Discount = require('../models/Discount');
const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');
const mongoose = require('mongoose');


exports.applyDiscount = async (req, res) => {

    const ObjectId = mongoose.Types.ObjectId;

    const { product, productCategory, selectedProductId, title, percentage, dateFrom, dateTo} = req.body;

    function discountPrice(price, percent) {
        return Math.round(Number(price) - ((Number(percent)/100) * Number(price)))
    }

    let successUpdates = 0;


    if(product === 'all') {
        //FETCH ALL PRODUCTS
        const products = await Product.find();
        if(products) {
            
            for (let index = 0; index < products.length; index++) {
    
                // update the discounted price on the priceSale field for all products
                const result = await Product.findByIdAndUpdate(products[index]._id, {priceSale: discountPrice(products[index].price, percentage)})
                if(result) {
                    successUpdates++
                    if(successUpdates === product.length) { // update is done on all documents successfully
                        // SAVE DISCOUNT DATA
                        const discount = new Discount({
                            productType: product,
                            productCategory: productCategory,
                            productId: selectedProductId,
                            title: title,
                            percentage: percentage,
                            dateFrom: JSON.parse(dateFrom),
                            dateTo: JSON.parse(dateTo),
                            appliedBy: req.user._id
                        })
                        try {
                            const savedDiscount = await discount.save()
                            if(savedDiscount) {
                                res.status(200).send({ message: 'Discount applied'})             
                            }
                        } catch (error) {
                            console.log(error)
                            res.status(500).send({ message: 'Server error'})
                        }
                    } 
                }
            }
           
        }

    } else if (product === 'category') {

    } else {
        // DISCOUNT IS APPLIED ON ONE PRODUCT 
        const product = await Product.findById(selectedProductId)
        if(product) {

            // update the discounted price on the priceSale field for product
            product.priceSale = discountPrice(product.price, percentage)
        } else {
          const error = new Error('Product could not be found') 
          error.httpStatusCode = 404;
          throw error 
        }
        const result = await product.save()
        if(result) {
            // SAVE DISCOUNT DATA
            const discount = new Discount({
                productType: product,
                productCategory: productCategory,
                productId: selectedProductId,
                title: title,
                percentage: percentage,
                dateFrom: JSON.parse(dateFrom),
                dateTo: JSON.parse(dateTo),
                appliedBy: req.user._id
            })
            try {
                const savedDiscount = await discount.save()
                if(savedDiscount) {
                    res.status(200).send({ message: 'Discount applied'})             
                }
            } catch (error) {
                console.log(error)
                res.status(500).send({ message: 'Server error'})
            }
        }
    }



        }

exports.updateStatus = (req, res) => {
    Discount.findById(req.query.id)
    .then(discount => {
        discount.active = !discount.active
        return discount.save()
    })
    .then(success => {
        res.status(200).send({ messsage: 'Success'})
    })
    .catch(err => {
        res.status(500).send({ message: 'Backend error' })
    })
}

exports.getDiscounts = (req, res) => {
    Discount.find()
    .then(data => {
        res.status(200).send({ data: data })
    })
    .catch(err => {
        res.status(500).send({ message: 'Backend error' })
    })
}

exports.deleteDiscount = (req, res) => {
    Discount.findByIdAndDelete(req.query.id)
    .then(success => {
        res.status(200).send({ messsage: 'Success'})
    })
    .catch((err) => {
      console.log(err);
    });
}