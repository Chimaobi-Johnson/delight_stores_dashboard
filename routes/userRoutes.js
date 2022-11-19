const express = require('express');
const usersController = require('../controller/usersController');


const router = express.Router();

router.get('/api/users', usersController.getAllUsers)



module.exports = router;
