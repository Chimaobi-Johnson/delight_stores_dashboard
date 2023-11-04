const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discountSchema = new Schema(
  {
    productType: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: false,
    },
    productId: {
        type: String,
        required: false,
    },
    title: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
    dateFrom: {
      type: Date,
      required: true,
    },
    dateTo: {
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    appliedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
