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
        console.log(result.public_id)
        imagesUrl.push(result.secure_url) 
        imagesId.push(result.public_id) 
    }
    const product = new Product({
        ...req.body,
        tags: req.body.tags,
        sizes: req.body.sizes,
        imagesUrl: imagesUrl,
        imagesId: imagesId
    })
    product.save()
    .then(savedProduct => {
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
          res.status(404).json({ message: "Product not found"})
      } else {
          res.status(200).json({ product: data })
      } 
  }).catch(err => {
      console.log(err)
  })
}


exports.updateProduct = async (req, res) => {
  const { productId, name, price, subheading, description, deliveryStatus, sizes, tags } = req.body;

  if(req.files.length !== 0) {

    const newImages = req.files;
    const imagesId = [];
    const imagesUrl = [];
    
    for(const image of newImages ) {
      const { path } = image;
      const result = await cloudinary.uploader.upload(path, { folder: "dlight_stores/products" })
        if(result) {
          imagesUrl.push(result.secure_url) 
          imagesId.push(result.public_id) 
        }
      }
      Product.findById(productId)
        .then(data => {
            if(!data) {
                res.status(404).json({ message: "Product may have been deleted, create new product"  })
            } else {
              return data
            }
        }).then(productData => {
              const newImages = req.files;
              const newImagesID = [...productData.imagesId, ...imagesId];
              const newImagesURL = [...productData.imagesUrl, ...imagesUrl];

              productData.name = name;
              productData.price = price;
              productData.subheading = subheading;
              productData.description = description;
              productData.deliveryStatus = deliveryStatus;
              productData.sizes = sizes;
              productData.tags = tags;
              productData.imagesId = newImagesID;
              productData.imagesUrl = newImagesURL
              return productData.save()

        }).then(updatedProduct => {
          res.status(200).json({ product: updatedProduct })
        }).catch(err => {
          console.log(err)
        })

  } else {

    console.log('updated without image change')
      Product.findById(productId)
      .then(data => {
          if(!data) {
              res.status(404).json({ message: "Product may have been deleted, create new product"})
          } else {
              data.name = name;
              data.price = price;
              data.subheading = subheading;
              data.description = description;
              data.deliveryStatus = deliveryStatus;
              data.sizes = sizes;
              data.tags = tags;
              return data.save()
          } 
      }).then(updatedProduct => {
          res.status(200).json({ product: updatedProduct })
      }).catch(err => {
          console.log(err)
      })
  }
}

exports.deleteProduct = (req, res) => {
  Product.findById(req.query.id)
  .then(data => {
      if(!data) {
          res.status(404).json({ message: "Product not found"})
      } else {
          return cloudinary.api.delete_resources(data.imagesId)
      } 
  }).then(result => {
    if(result) {
      return Product.findByIdAndDelete(req.query.id)
    }
  }).then(deletedProduct => {
    res.status(200).json({ product: deletedProduct })
  }).catch(err => {
      console.log(err)
  })
}


exports.deleteSingleImage = (req, res) => {
  const { cloudinaryId, cloudinaryUrl, productId } = req.body;
  cloudinary.uploader.destroy(cloudinaryId, (error, result) => {
    if(result) {
        Product.findById(productId).then(product => {
          const newImagesId = [ ...product.imagesId ];
          const newImagesUrl = [ ...product.imagesUrl ];
          const indexId = newImagesId.indexOf(cloudinaryId);
          const indexUrl = newImagesUrl.indexOf(cloudinaryUrl);
          newImagesId.splice(indexId, 1);
          newImagesUrl.splice(indexUrl, 1);
          product.imagesId = newImagesId;
          product.imagesUrl = newImagesUrl;
          return product.save();
        }).then(updatedProduct => {
           res.status(200).json({ product: updatedProduct })
        }).catch(err => {
            console.log(err)
        })
      }
  })

}