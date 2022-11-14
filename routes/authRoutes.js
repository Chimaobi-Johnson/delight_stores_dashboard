const express = require('express');


const router = express.Router();

router.get('/user', (req, res) => {
    res.status(200).json({ message: 'user list'});
})



module.exports = router;
