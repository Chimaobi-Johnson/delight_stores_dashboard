const express = require('express');
const usersController = require('../controller/usersController');
const { isLoggedIn, isAdmin } = require('../middleware/isAuth');
const cors = require('cors')


const router = express.Router();

router.get('/api/users', isLoggedIn, isAdmin, usersController.getAllUsers)
router.post('/api/user/delete', isLoggedIn, isAdmin, usersController.deleteUser)
router.post('/api/user/cart/update', isLoggedIn, usersController.updateCart)

// router.get('/api/users/edit', isLoggedIn, usersController.getUser)



module.exports = router;
