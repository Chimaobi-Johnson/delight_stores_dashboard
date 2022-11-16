const express = require('express');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/login', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/register', (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: 'user list'});
})

module.exports = router;
