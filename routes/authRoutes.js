const express = require('express');
const authController = require('../controller/authController');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/login', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/register', authController.registerUser)

module.exports = router;
