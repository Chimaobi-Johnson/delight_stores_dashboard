const Discount = require("../models/Discount");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

exports.applyDiscount = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;

  const {
    product,
    productCategory,
    selectedProductId,
    title,
    percentage,
    dateFrom,
    dateTo,
  } = req.body;

  function discountPrice(price, percent) {
    return Math.round(Number(price) - (Number(percent) / 100) * Number(price));
  }

  let successUpdates = 0;

  if (product === "all") {
    //FETCH ALL PRODUCTS
    const products = await Product.find();
    if (products) {
      for (let index = 0; index < products.length; index++) {
        // update the discounted price on the priceSale field for all products
        const result = await Product.findByIdAndUpdate(products[index]._id, {
          priceSale: discountPrice(products[index].price, percentage),
        });
        if (result) {
          successUpdates++;
          if (successUpdates === product.length) {
            // update is done on all documents successfully
            // SAVE DISCOUNT DATA
            const discount = new Discount({
              productType: product,
              productCategory: productCategory,
              productId: selectedProductId,
              title: title,
              percentage: percentage,
              dateFrom: JSON.parse(dateFrom),
              dateTo: JSON.parse(dateTo),
              appliedBy: req.user._id,
            });
            try {
              const savedDiscount = await discount.save();
              if (savedDiscount) {
                res.status(200).send({ message: "Discount applied" });
              }
            } catch (error) {
              console.log(error);
              res.status(500).send({ message: "Server error" });
            }
          }
        }
      }
    }
  } else if (product === "category") {

        // DISCOUNT IS APPLIED BY CATEGORY

        // GET PRODUCTS BY CATEGORY AND STORE IN ARRAY

            // SAVE DISCOUNT DATA
        const discount = new Discount({
            productType: product,
            productCategory: productCategory,
            productId: selectedProductId,
            title: title,
            percentage: percentage,
            dateFrom: JSON.parse(dateFrom),
            dateTo: JSON.parse(dateTo),
            appliedBy: req.user._id,
        });
        const savedDiscount = await discount.save();
        if (savedDiscount) {
            try {

            const products = await Product.find({ category: req.body.productCategory })
            if(products) {
                console.log(products.length)
                for (let index = 0; index < products.length; index++) {
                    // update the discounted price on the priceSale field for all products in array
                    const result = await Product.findByIdAndUpdate(products[index]._id, {
                      priceSale: discountPrice(products[index].price, percentage),
                      discountID: savedDiscount._id
                    });
                    if (result) {
                        console.log(result.length)
                      successUpdates++;
                      if (successUpdates === products.length) {
                        // update is done on all documents successfully
                        // SAVE DISCOUNT DATA
                        res.status(200).send({ message: 'Discount applied' })
                      }
                    }
                  }
            }
            } catch (error) {
            console.log(error)
            // delete saved discount
            const delData = await Discount.findByIdAndDelete(savedDiscount._id)
            if(delData) {
                console.log('Saved discount deleted')
            }
            } 
        } 
        else {
            res.status(500).send({ message: 'Server error'})
        }


  } else {
    // DISCOUNT IS APPLIED ON ONE PRODUCT

    // SAVE DISCOUNT DATA
    const discount = new Discount({
      productType: product,
      productCategory: productCategory,
      productId: selectedProductId,
      title: title,
      percentage: percentage,
      dateFrom: JSON.parse(dateFrom),
      dateTo: JSON.parse(dateTo),
      appliedBy: req.user._id,
    });
    const savedDiscount = await discount.save();
    if (savedDiscount) {
      try {
        const product = await Product.findById(selectedProductId);
        // update the discounted price on the priceSale field for product
        if(product) {
            product.priceSale = discountPrice(product.price, percentage);
            product.discountID = savedDiscount._id;
            const result = product.save()
            if(result) {
                res.status(200).send({ message: 'Discount applied' })
            } else {
                const err = new Error('Server error')
                err.httpStatusCode = 500;
                throw err
            }

        } else {
            const err = new Error('Product not found')
            err.httpStatusCode = 404;
            throw err
        }

      } catch (error) {
        console.log(error)
        // delete saved discount
        const delData = await Discount.findByIdAndDelete(savedDiscount._id)
        if(delData) {
            console.log('Saved discount deleted')
        }
      }
    } else {
        res.status(500).send({ message: 'Server error'})
    }
  }
};

exports.updateStatus = (req, res) => {
  Discount.findById(req.query.id)
    .then((discount) => {
      discount.active = !discount.active;
      return discount.save();
    })
    .then((success) => {
      res.status(200).send({ messsage: "Success" });
    })
    .catch((err) => {
      res.status(500).send({ message: "Backend error" });
    });
};

exports.getDiscounts = (req, res) => {
  Discount.find()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Backend error" });
    });
};

exports.deleteDiscount = (req, res) => {
  Discount.findByIdAndDelete(req.query.id)
    .then((success) => {
      res.status(200).send({ messsage: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
};
