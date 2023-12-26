const express = require('express');
const authController = require('../controller/authController');
const multer = require('../utils/multer');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/login', multer.none(), authController.loginUser, (req, res) => res.status(200).json({ message: 'Login Successful', user: req.user }))

router.post('/api/register', multer.none(), authController.registerUser)

router.get('/api/current_user', (req, res) => {
  const loggedUser = req.user
	res.status(200).json({user: loggedUser});
})

router.get('/api/logout', (req, res) => {
    req.logout();
    res.status(200).json({ auth: 'success' })
  })

module.exports = router;
