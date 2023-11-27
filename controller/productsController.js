const Category = require("../models/Category");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");
const mongoose = require('mongoose');

exports.getAllProducts = (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const currentPage = req.query.page || 1; // if page is not set default to page 1
  const perPage = 25;
  let totalItems;
  if(req.query.id) {
    Product.aggregate([
      { $match: { category : new ObjectId(req.query.id) } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryDetails' }},
      { $lookup: { from: 'discounts', localField: 'discountID', foreignField: '_id', as: 'discountDetails' }},
      { $project: { name: 1, price: 1, imagesUrl: 1, category: 1, categoryDetails: 1, discount: 1, discountDetails: 1 }}
    ])
    .then((products) => {
      res.status(200).send({ products: products });
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    Product.find()
    .sort({ createdAt: -1 })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Product.aggregate([
        { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryDetails' }},
        { $lookup: { from: 'discounts', localField: 'discountID', foreignField: '_id', as: 'discountDetails' }},
        { $project: { imagesId: 0 }}
      ])
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      res.status(200).send({ products: products });
    })
    .catch((err) => {
      console.log(err);
    });
  }

};

exports.storeProduct = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    console.log("No images use default");
    return;
  } else {
    const images = req.files;
    const imagesUrl = [];
    const imagesId = [];

    for (const image of images) {
      const { path } = image;
      // HANDLE ERROR
      const result = await cloudinary.uploader.upload(path, {
        folder: "dlight_stores/products",
      });
      imagesUrl.push(result.secure_url);
      imagesId.push(result.public_id);
    }
    const product = new Product({
      ...req.body,
      available: req.body.quantity,
      gender: JSON.parse(req.body.gender),
      specifications: JSON.parse(req.body.specifications),
      tags: JSON.parse(req.body.tags),
      newLabel: JSON.parse(req.body.newLabel),
      saleLabel: JSON.parse(req.body.saleLabel),
      imagesUrl: imagesUrl,
      imagesId: imagesId,
      postedBy: req.user._id
    });
    product
      .save()
      .then((savedProduct) => {
        res.status(201).send({ product: savedProduct });
      })
      .catch((err) => {
        // DELETE IMAGES WHEN SAVING FAILS
        console.log(err);
      });
  }
};

exports.getProduct = (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  Product.aggregate([
    { $match: { _id : new ObjectId(req.query.id) } },
    { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryDetails' }},
    { $lookup: { from: 'discounts', localField: 'discountID', foreignField: '_id', as: 'discountDetails' }},
    { $project: { imagesId: 0 }}
  ])
    .then(product => {
      res.status(200).send({ product: product })
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = async (req, res) => {

  if (req.files.length !== 0) {
    console.log("updating with image change");

    const newImages = req.files;

    const imagesId = [];
    const imagesUrl = [];


    for (const image of newImages) {
      const { path } = image;
      const result = await cloudinary.uploader.upload(path, {
        folder: "dlight_stores/products",
      });
      if (result) {
        imagesUrl.push(result.secure_url);
        imagesId.push(result.public_id);
      }
    }
    Product.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .json({
              message: "Product may have been deleted, create new product",
            });
        } else {
          return data;
        }
      })
      .then((productData) => {
        const newImages = req.files;

        // add existing and updated images to new image array
        const newImagesID = [...productData.imagesId, ...imagesId];
        const newImagesURL = [...productData.imagesUrl, ...imagesUrl];

        productData.name = req.body.name;
        productData.price = req.body.price;
        productData.subheading = req.body.subheading;
        productData.description = req.body.description;
        productData.deliveryStatus = req.body.deliveryStatus;
        productData.tags = JSON.parse(req.body.tags);
        productData.gender = JSON.parse(req.body.gender);
        productData.specifications = JSON.parse(req.body.specifications);
        productData.newLabel = JSON.parse(req.body.newLabel);
        productData.saleLabel = JSON.parse(req.body.saleLabel);
        productData.quantity = req.body.quantity;
        productData.publish = req.body.publish;
        productData.available = req.body.quantity;
        productData.sku = req.body.sku;
        productData.code = req.body.code;
        productData.category = req.body.category;
        productData.imagesId = newImagesID;
        productData.imagesUrl = newImagesURL;
        return productData.save();
      })
      .then((updatedProduct) => {
        res.status(200).send({ product: updatedProduct });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("updating without image change");
    Product.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .json({
              message: "Product may have been deleted, create new product",
            });
        } else {

          data.name = req.body.name;
          data.price = req.body.price;
          data.subheading = req.body.subheading;
          data.description = req.body.description;
          data.deliveryStatus = req.body.deliveryStatus;
          data.tags = JSON.parse(req.body.tags);
          data.gender = JSON.parse(req.body.gender);
          data.specifications = JSON.parse(req.body.specifications);
          data.newLabel = JSON.parse(req.body.newLabel);
          data.saleLabel = JSON.parse(req.body.saleLabel);
          data.quantity = req.body.quantity;
          data.available = req.body.quantity;
          data.sku = req.body.sku;
          data.code = req.body.code;
          data.category = req.body.category;
          data.publish = req.body.publish;

          return data.save();
        }
      })
      .then((updatedProduct) => {
        res.status(200).send({ product: updatedProduct });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.deleteProduct = (req, res) => {
  Product.findById(req.query.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Product not found" });
      } else {
        return cloudinary.api.delete_resources(data.imagesId);
      }
    })
    .then((result) => {
      if (result) {
        return Product.findByIdAndDelete(req.query.id);
      }
    })
    .then((deletedProduct) => {
      res.status(200).json({ product: deletedProduct });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteSingleImage = (req, res) => {
  const { cloudinaryId, cloudinaryUrl, productId } = req.body;
  cloudinary.uploader.destroy(cloudinaryId, (error, result) => {
    if (result) {
      Product.findById(productId)
        .then((product) => {
          const newImagesId = [...product.imagesId];
          const newImagesUrl = [...product.imagesUrl];
          const indexId = newImagesId.indexOf(cloudinaryId);
          const indexUrl = newImagesUrl.indexOf(cloudinaryUrl);
          newImagesId.splice(indexId, 1);
          newImagesUrl.splice(indexUrl, 1);
          product.imagesId = newImagesId;
          product.imagesUrl = newImagesUrl;
          return product.save();
        })
        .then((updatedProduct) => {
          res.status(200).json({ product: updatedProduct });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'Error deleting image' });
        });
    }
  });
};


exports.getProductIds = (req, res) => {
  Product.find({}, {_id: 1})
  .then(ids => {
    res.status(200).send({ ids: ids })
  })
  .catch((err) => {
    console.log(err);
  });
}


exports.filterProductsByCatgory = (req, res) => {
  Product.aggregate([
    { $match: { category : req.query.id } },
    // { $project: { name: 1, price: 1, imagesUrl: 1 }}
  ])
  // Product.find({ category: req.body.category._id })
  .then(data => {
    console.log(data)
    res.status(200).json({ products: data })
  }).catch(err => {
    console.log(err)
  })
}