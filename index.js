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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(upload.fields([]), authRoutes);
app.use(upload.fields([]), userRoutes);
app.use(productRoutes);
app.use(upload.fields([]), categoryRoutes);


app.use('/', (req, res) => {
    res.send("Server connected")
})

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
  }).catch(err => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT);
