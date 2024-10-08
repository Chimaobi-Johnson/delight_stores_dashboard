const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageId: { 
        type: String, 
        required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
