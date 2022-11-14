const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();



require('./models/Product');
require('./models/User');

const authRoutes = require('./routes/authRoutes');

app.use(authRoutes);

app.use('/', (req, res) => {
    res.send("Server connected")
})

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
  }).catch(err => console.log(err));


const PORT = process.env.PORT || 8000;
app.listen(PORT);
