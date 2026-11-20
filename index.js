const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = require('./app');

mongoose.connect(keys.mongoURI).then(connect => {
    console.log('Database Connected!')
}).catch(err => console.log(err));

const PORT = process.env.PORT || 8000;
app.listen(PORT);
