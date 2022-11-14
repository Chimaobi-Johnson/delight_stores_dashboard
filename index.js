const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();



require('./models/Product');
require('./models/User');

const authRoutes = require('./routes/authRoutes');



app.use(bodyParser.raw()) // to parse incoming json data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'text/plain')
  next();
});


app.use(authRoutes);

app.use('/', (req, res) => {
    res.send("Server connected")
})

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
  }).catch(err => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT);
