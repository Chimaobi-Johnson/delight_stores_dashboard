const SiteContent = require("../models/SiteContent");


exports.updateSiteLocations = (req, res) => {
    console.log(req.body)
    function isInArray(item) {
        return item.locationName === req.body.locationName;
    }
    SiteContent.find()
    .then(items => {
        const shippingLocationArr = items[0].shippingLocations
        // check if item exists using location name
        const checkItem = shippingLocationArr.find(isInArray)
        console.log(checkItem)

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