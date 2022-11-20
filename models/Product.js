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
      type: String,
      required: true,
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
    sizes: [ String ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
