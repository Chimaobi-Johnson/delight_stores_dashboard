const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cloudinary = require('cloudinary').v2;

const keys = require('./config/keys');

const app = express();



require('./models/Product');
require('./models/User');
require('./models/Category');

require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

let upload = multer({ dest: "uploads/" });

cloudinary.config({ 
  cloud_name: keys.cloudinaryName, 
  api_key: keys.cloudinaryAPIKey, 
  api_secret: keys.cloudinarySecretKey,
  secure: true
});

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());
// app.use(passport.session());
app.use(passport.authenticate('session'));

app.use(bodyParser.json()) // to parse incoming json data
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: null,
  filename: function(req, file, cb) {
      cb(null, uuidv4() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
if(file.mimetype === 'image/png' ||
   file.mimetype === 'image/jpg' ||
   file.mimetype === 'image/jpeg'
   ) {
  cb(null, true);
} else {
  cb(null, false);
}
};

app.use(multer({storage: storage, fileFilter: fileFilter}).fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'productImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 10 }
]));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);



app.use('/', (req, res) => {
    res.send("Server connected")
})

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
  }).catch(err => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT);
