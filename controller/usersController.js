const User = require("../models/User");

exports.getAllUsers = (req, res) => {
    const currentPage = req.query.page || 1;  // if page is not set default to page 1
    const perPage = 15;
    let totalItems;
    User.find().sort({ "createdAt": 1 }).countDocuments()
    .then(count => {
        totalItems = count
        return User.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage) 
    })
    .then(users => {
        res.status(200).json({ users: users })
    })
    .catch(err => {
        console.log(err)
    })
}

