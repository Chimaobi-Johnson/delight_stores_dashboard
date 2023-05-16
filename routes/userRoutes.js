const express = require('express');
const usersController = require('../controller/usersController');
const { isLoggedIn } = require('../middleware/isAuth');


const router = express.Router();

router.get('/api/users', isLoggedIn, usersController.getAllUsers)
router.post('/api/user/delete', isLoggedIn, usersController.deleteUser)
router.post('/api/user/cart/update', isLoggedIn, usersController.updateCart)

// router.get('/api/users/edit', isLoggedIn, usersController.getUser)



module.exports = router;
