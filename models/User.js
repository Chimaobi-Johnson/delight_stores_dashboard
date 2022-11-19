const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: { type: String },
  imageId: { type: String },
  firstName: {
    type: String,
    required: true
    },
  lastName: {
    type: String,
    required: true
    },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'suscriber'
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);