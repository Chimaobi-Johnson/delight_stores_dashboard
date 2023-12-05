const SiteContent = require("../models/SiteContent");

exports.getAllContent = (req, res) => {
    SiteContent.find()
    .then(items => {
        res.status(200).send({ document: items[0] })
    }).catch(err => {
        console.log(err)
        res.status(500).send({ data: 'Error check connection' });
    })
}


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

exports.deleteItem = (req, res) => {
    function checkArray(item) {
        return item.locationName === req.query.item
    }
    SiteContent.find()
    .then(items => {
        // get index of item using location name
        const shippingLocationArr = items[0].shippingLocations
        const matchedItem = shippingLocationArr.find(checkArray)
        if(!matchedItem) {
            const error = new Error('item does not exist')
            error.httpStatusCode = 404
            throw(error)
        }
        const arrIndex = shippingLocationArr.indexOf(matchedItem)
        // remove item using splice method
        shippingLocationArr.splice(arrIndex, 1)
        // update
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