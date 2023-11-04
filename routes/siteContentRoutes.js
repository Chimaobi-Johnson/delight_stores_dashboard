const express = require('express');
const siteContentController = require('../controller/siteContentController');
const { isLoggedIn } = require('../middleware/isAuth');


const router = express.Router();

// router.get('/api/site-content', siteContentController.getAllContent)
// router.get('/api/site-content/filter', siteContentController.getFilteredContent)
// router.post('/api/site-content/add/location',  isLoggedIn, siteContentController.updateSiteLocations)
// router.post('/api/site-content/add/shipping',  isLoggedIn, siteContentController.updateSiteShippingInfo)
router.post('/api/site-content/create',  isLoggedIn, siteContentController.createDoc)



module.exports = router;