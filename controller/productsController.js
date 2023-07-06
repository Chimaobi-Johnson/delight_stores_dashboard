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
      { $match: { category : ObjectId(req.query.id) } },
      { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'categoryDetails' }},
      { $project: { name: 1, price: 1, imagesUrl: 1, category: 1, categoryDetails: 1 }}
    ])
    .then((products) => {
      res.status(200).json({ products: products });
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
      return Product.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      res.status(200).json({ products: products });
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
    const sizeObj = req.body.sizes

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
      tags: req.body.tags,
      sizes: sizeObj,
      imagesUrl: imagesUrl,
      imagesId: imagesId,
    });
    product
      .save()
      .then((savedProduct) => {
        res.status(201).json({ product: savedProduct });
      })
      .catch((err) => {
        // DELETE IMAGES WHEN SAVING FAILS
        console.log(err);
      });
  }
};

exports.getProduct = (req, res) => {
  let productData
  Product.findById(req.query.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Product not found" });
      } else {
        productData = data;
        return Category.findById(data.category)
        // res.status(200).json({ product: data });
      }
    })
    .then(cat => {
      res.status(200).json({ product: productData, category: cat })
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProduct = async (req, res) => {
  const {
    productId,
    name,
    price,
    subheading,
    description,
    deliveryStatus,
    sizes,
    tags,
  } = req.body;

  const sizeObj = sizes


  if (req.files.length !== 0) {
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
    Product.findById(productId)
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
        const newImagesID = [...productData.imagesId, ...imagesId];
        const newImagesURL = [...productData.imagesUrl, ...imagesUrl];

        productData.name = name;
        productData.price = price;
        productData.subheading = subheading;
        productData.description = description;
        productData.deliveryStatus = deliveryStatus;
        productData.sizes = sizeObj;
        productData.tags = tags;
        productData.imagesId = newImagesID;
        productData.imagesUrl = newImagesURL;
        return productData.save();
      })
      .then((updatedProduct) => {
        res.status(200).json({ product: updatedProduct });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("updated without image change");
    Product.findById(productId)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .json({
              message: "Product may have been deleted, create new product",
            });
        } else {
          data.name = name;
          data.price = price;
          data.subheading = subheading;
          data.description = description;
          data.deliveryStatus = deliveryStatus;
          data.sizes = sizeObj;
          data.tags = tags;
          return data.save();
        }
      })
      .then((updatedProduct) => {
        res.status(200).json({ product: updatedProduct });
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
        });
    }
  });
};


exports.getProductIds = (req, res) => {
  Product.find({}, {_id: 1})
  .then(ids => {
    res.status(200).json({ ids: ids })
  })
  .catch((err) => {
    console.log(err);
  });
}


exports.filterProductsByCatgory = (req, res) => {
  console.log(req.query.id)
  Product.aggregate([
    { $match: { category : req.query.id } },
    // { $project: { name: 1, price: 1, imagesUrl: 1 }}
  ])
  // Product.find({ category: req.body.category._id })
  .then(products => {
    console.log(products)
    res.status(200).json({ products: products })
  }).catch(err => {
    console.log(err)
  })
}