const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerUser = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        return user.save();
    })
    .then(result => {
        res.status(200).json({ message: 'User created successfully', user: result })
    })
    .catch((err) => {
        console.log(err)
    });
}