const Product = require("../models/Product");
const cloudinary = require('../utils/cloudinary');

exports.getAllProducts = (req, res) => {
  const currentPage = req.query.page || 1; // if page is not set default to page 1
  const perPage = 15;
  let totalItems;
  Product.find()
    .sort({ createdAt: 1 })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Product.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      res.status(200).json({ products: products });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.storeProduct = async (req, res) => {
//   const {
//     name,
//     body,
//     subheading,
//     description,
//     category,
//     deliveryStatus,
//     sizes,
//     tags,
//   } = req.body;

  if(!req.files || req.files.length === 0) {
    console.log("No images use default")
    return
  } else {
    const images = req.files;
    const imagesUrl = []
    const imagesId = []

    for(const image of images ) {
        const { path } = image;
        // HANDLE ERROR
        const result = await cloudinary.uploader.upload(path, { folder: "dlight_stores/products" })
        imagesUrl.push(result.secure_url) 
        imagesId.push(result.public_id) 
    }

    tags.push(req.body.tags);
    sizes.push(req.body.sizes)
    const product = new Product({
        ...req.body,
        imagesUrl: imagesUrl,
        imagesId: imagesId
    })
    product.save().then(savedProduct => {
        res.status(201).json({ product: savedProduct })
    }).catch(err => {
        // DELETE IMAGES WHEN SAVING FAILS 
        console.log(err)
    })

  }
};


exports.editProduct = (req, res) => {
  Product.findById(req.query.id)
  .then(data => {
      if(!data) {
          res.status(404).json({ message: "Category not found"})
      } else {
          res.status(200).json({ product: data })
      } 
  }).catch(err => {
      console.log(err)
  })
}
