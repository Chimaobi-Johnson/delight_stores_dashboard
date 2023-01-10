const cloudinary = require('cloudinary').v2;
const keys = require('../config/keys');

cloudinary.config({ 
    cloud_name: keys.cloudinaryName, 
    api_key: keys.cloudinaryAPIKey, 
    api_secret: keys.cloudinarySecretKey,
    secure: true
  });

module.exports = cloudinary