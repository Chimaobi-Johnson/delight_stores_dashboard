const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceSale: {
      type: Number
    },
    sku: Number,
    saleLabel: {
      enabled: Boolean,
      content: String
    },
    subheading: { type: String },
    description: {
      type: String
    },
    coverUrl: [ String ],
    imagesUrl: [ String ],
    imagesId: [ String ],
    status: { 
      type: String, 
      default: "published" 
    },
    deliveryStatus: { 
      type: String, 
      default: "ready" 
    },
    stock: Number,
    totalSold: Number,
    purchases: { type: Number },
    purchasedBy: [ String ],
    colors: [ String ],
    tags: [ String ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"    
    },
    sizes: [ {
      type: Object
    } ],
    code: String,

    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
