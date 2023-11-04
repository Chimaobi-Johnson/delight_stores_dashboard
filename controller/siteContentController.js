const SiteContent = require("../models/SiteContent");


exports.createDoc = async (req, res) => {
        const siteContent = new SiteContent({
            contactInfo: {
                phone: [ '+2349120972176' ],
                email: ['support@delighthomewarestores.com'],
                address: {
                    addressLine1: 'No. 26 Destiny drive, Emmanuel school rd',
                    city: 'Port Harcourt',
                    state: 'Rivers',
                    country: 'Nigeria'
                },
                social: {
                    instagram: '@delight_homeware_stores'
                }
            }
        })
        siteContent
        .save()
        .then((savedItem) => {
          res.status(201).send({ data: savedItem });
        })
        .catch((err) => {
          console.log(err);
        });
    }
