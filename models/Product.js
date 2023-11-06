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
    coverUrl: { 
      type: String, 
      default: null 
    },
    imagesUrl: [ String ],
    imagesId: [ String ],
    published: {
      type: Boolean,
      default: true
    },
    deliveryStatus: { 
      type: String, 
      default: "ready" 
    },
    quantity: { 
      type: Number, 
      default: 0 
    },
    inventoryType: { 
      type: String, 
      default: "in-stock" 
    },
    stock: { 
      type: Number, 
      default: 0 
    },
    available: { 
      type: Number, 
      default: 30 
    },
    totalSold: Number,
    purchases: { type: Number },
    purchasedBy: [ String ],
    colors: [ {
      type: Object
    } ],
    tags: [ String ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"    
    },
    sizes: [ {
      type: Object
    } ],
    gender: [ {
      type: Object
    } ],
    code: String,
    discountID: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
      required: false,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
