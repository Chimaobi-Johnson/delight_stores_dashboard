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
        console.log(error)
        
        return error
    } else {
        if(req.file.size > 1700000) {
            res.status(500).json({ message: "Image is too large" })
        } else {
            const result = cloudinary.uploader.upload(req.file.path, { folder: "dlight_stores/categories" })
            .then(result => {
                const category = new Category({
                    name: req.body.name,
                    description: req.body.name,
                    imageUrl: result.secure_url,
                    imageId: result.public_id
                  });
               return category.save()
            })
            .then(savedCategory => {
                res.status(201).json({ category: savedCategory })
            })
            .catch(err => {
                console.log(err)
            })
        }

      
    }
}


exports.editCategory = (req, res) => {
    Category.findById(req.query.id)
    .then(data => {
        if(!data) {
            res.status(404).json({ message: "Category not found"})
        } else {
            res.status(200).json({ category: data })
        } 
    }).catch(err => {
        console.log(err)
    })
}

