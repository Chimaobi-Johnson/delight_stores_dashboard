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
    subheading: { type: String },
    description: {
      type: String
    },
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
    purchases: { type: Number },
    purchasedBy: [ String ],
    tags: [ String ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"    
    },
    sizes: [ {
      type: Object
    } ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
