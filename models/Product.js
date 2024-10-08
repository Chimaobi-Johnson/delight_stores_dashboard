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
      type: Number,
      default: 0
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
    publish: {
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
    available: { 
      type: Number, 
      default: 0 
    },
    totalSold: Number,
    purchases: { type: Number },
    purchasedBy: [ String ],
    tags: [ String ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"    
    },
    specifications: {
      type: Object
    },
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
