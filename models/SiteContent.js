const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sitecontentSchema = new Schema(
  {
    slider: [ {
        type: Object
      } ],
    about: {
        type: Object
    },
    shippingInfo: {
        type: String
    },
    shippingLocations: [ {
        type: Object
    } ],
    contactInfo: {
        type: Object
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteContent", sitecontentSchema);
