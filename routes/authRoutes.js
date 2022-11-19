const express = require('express');
const authController = require('../controller/authController');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/login', authController.loginUser, (req, res) => res.status(200).json({ message: 'Login Successful', user: req.user }))

router.post('/api/register', authController.registerUser)

router.get('/api/current_user', (req, res) => {
	res.send({user: req.user});
})

router.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  })

module.exports = router;
