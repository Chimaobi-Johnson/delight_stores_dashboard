const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
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
  },
  mobile: {
    type: String,
    required: true
  },
  city: {
    type: String,
  },
  streetname: {
    type: String,
  },
  houseno: {
    type: String,
  },
  products: [ {
    type: Object
  } ],
  purchasedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

}, { timestamps: true });


module.exports = mongoose.model('Payment', paymentSchema);