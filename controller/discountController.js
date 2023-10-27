
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

        }


        }





