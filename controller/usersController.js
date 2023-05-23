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

exports.updateCart = (req, res) => {
    const newCart = req.body;
    User.findOne(req.user._id)
    .then(user => {
       user.cart.items = newCart
       return user.save()
    })
    .then(data => {
        res.status(200).json({ data: data })
    })
    .catch(err => {
        console.log(err)
    })

   
}



// exports.getUser = (req, res) => {
//     User.findById(req.query.id)
//     .then(user => {
//         if(!user) {
//             res.status(401).json({ user: 'user not found' })
//         }
//         res.status(200).json({ user: user })
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

exports.deleteUser = (req, res) => {

    User.findByIdAndDelete(req.query.id).then(user => {
        res.status(200).json({ user: user })
    }).catch(err => {
        console.log(err)
    })

}


