const Product = require("../models/Product");

exports.getAllProducts = (req, res) => {
    const currentPage = req.query.page || 1;  // if page is not set default to page 1
    const perPage = 15;
    let totalItems;
    Product.find().sort({ "createdAt": 1 }).countDocuments()
    .then(count => {
        totalItems = count
        return Product.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage) 
    })
    .then(products => {
        res.status(200).json({ products: products })
    })
    .catch(err => {
        console.log(err)
    })
}

exports.storeProduct = (req, res) => {
    console.log(req.body)
    console.log(req.files)
}
