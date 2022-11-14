const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use('/', (req, res) => {
    res.send("Server connected")
})

app.listen(8000);