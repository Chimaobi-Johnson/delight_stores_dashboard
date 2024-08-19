const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const multer = require('./utils/multer');
const cors = require('cors')

const app = express();

let whitelist = ['https://delighthomewarestores.com', 'http://localhost:3001']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

// app.use(
//   cors({
//     // origin: 'https://delighthomewarestores.com',
//     // allowedHeaders: 'Content-Type, Authorization',
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true
//   })
// )



require('./models/Product');
require('./models/User');
require('./models/Category');
require('./models/Payment');
require('./models/Discount');



require('./services/passport');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const discountRoutes = require('./routes/discountRoutes');
const siteContentRoutes = require('./routes/siteContentRoutes');




app.use(cookieSession({
    name: 'session',
    // sameSite: 'none',
    // domain: 'delight-stores-dashboard.herokuapp.com',
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());
// app.use(passport.session());
app.use(passport.authenticate('session'));

app.use(bodyParser.json()) // to parse incoming json data
app.use(bodyParser.urlencoded({ extended: false }));


// app.use((req, res, next) => {
//   // add in config file dynamically
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(authRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(paymentRoutes);
app.use(discountRoutes);
app.use(siteContentRoutes);



if(process.env.NODE_ENV === 'production') {
  // to make sure that express will serve up production assets like main.js files
  app.use(express.static('client/build'));

  // to make sure espress will serve index.html when it doesnt recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
}).catch(err => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT);
