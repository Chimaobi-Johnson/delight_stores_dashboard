
module.exports.isLoggedIn  = function(req, res, next) {
    if(req.user) {
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports.isAdmin  = function(req, res, next) {
    if(req.user.role === 'admin') {
        return next()
    } else {
        res.status(401).send('Unauthorized')
    }
}