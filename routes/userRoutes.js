const express = require('express');
const usersController = require('../controller/usersController');
const { isLoggedIn } = require('../middleware/isAuth');


const router = express.Router();

router.get('/api/users', isLoggedIn, usersController.getAllUsers)
router.post('/api/users/delete', isLoggedIn, usersController.deleteUser)



module.exports = router;
