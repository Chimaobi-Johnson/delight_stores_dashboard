const express = require('express');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})

router.post('/api/login', (req, res) => {
    console.log(req)
    console.log(req.body)
    console.log(req.body.email)
    res.status(200).json({ message: 'user list'});
})



module.exports = router;
