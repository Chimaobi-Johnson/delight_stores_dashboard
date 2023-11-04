const SiteContent = require("../models/SiteContent");


exports.updateSiteLocations = (req, res) => {
    function isInArray(item) {
        return item.locationName === req.body.locationName;
    }
    SiteContent.find()
    .then(items => {
        const shippingLocationArr = items[0].shippingLocations
        // check if item exists using location name
        const checkItem = shippingLocationArr.find(isInArray)

        if(checkItem) {
            console.log(checkItem)
            const error = new Error('item exists')
            error.httpStatusCode = 409
            throw(error)
        }
        shippingLocationArr.push(req.body)
        items[0].shippingLocations = shippingLocationArr
        return items[0].save()
    })
    .then(success => {
        res.status(200).send({ data: 'Success' });
    })
    .catch(err => {
        console.log(err)
        res.status(err.httpStatusCode).send({ data: 'Error check connection' });
    })
}

exports.updateSiteShippingInfo = (req, res) => {
    SiteContent.find()
    .then(items => {
        items[0].shippingInfo = req.body.data
        return items[0].save()
    })
    .then(success => {
        res.status(200).send({ data: 'Success' });
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ data: 'Error check connection' });
    })
}