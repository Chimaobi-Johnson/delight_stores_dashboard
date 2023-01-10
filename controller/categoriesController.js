const Category = require("../models/Category");
const Product = require("../models/Product");
const cloudinary = require('../utils/cloudinary');

exports.getAllCategories = (req, res) => {
    const currentPage = req.query.page || 1;  // if page is not set default to page 1
    const perPage = 15;
    let totalItems;
    Category.find().sort({ "createdAt": 1 }).countDocuments()
    .then(count => {
        totalItems = count
        return Category.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage) 
    })
    .then(categories => {
        res.status(200).json({ categories: categories })
    })
    .catch(err => {
        console.log(err)
    })
}


exports.addCategory = (req, res) => {
    if(!req.file) {
        const error = new Error("Image is required");
        return error
    } else {
        const result = cloudinary.uploader.upload(req.file.path, { folder: "dlight_stores" })
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
      
    }
}

