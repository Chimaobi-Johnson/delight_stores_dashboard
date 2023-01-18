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


exports.updateProduct = (req, res) => {
  const { productId, name, price, subheading, description, deliveryStatus, sizes, tags } = req.body;

  if(req.files.length !== 0) {
    console.log('files tampered with')
    Product.findById(productId)
    .then(data => {
        if(!data) {
            res.status(404).json({ message: "Product may have been deleted, create new product"  })
        } else {
          const oldImages = data.imagesId;
          const newImages = req.files;
          const imagesUrl = []
          const imagesId = []

          // delete old images
          for(const image of oldImages ) {
            cloudinary.uploader.destroy(image, (error, data) => {
              console.log(data)
              console.log(error)

              if(result) {
                return
              } else {
                console.log(err)
              }
          })

         
        }
       // add current images
        for(const image of newImages ) {
            const { path } = image;
            // HANDLE ERROR
            cloudinary.uploader.upload(path, { folder: "dlight_stores/products" }, (error, result) => {
              if(result) {
                imagesUrl.push(result.secure_url) 
                imagesId.push(result.public_id) 
              } else {
                return
              }
            })

        }

        data.name = name;
        data.price = price;
        data.subheading = subheading;
        data.description = description;
        data.deliveryStatus = deliveryStatus;
        data.sizes = sizes;
        data.tags = tags;
        data.imagesId = imagesId;
        data.imagesUrl
        return data.save()
      }

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
