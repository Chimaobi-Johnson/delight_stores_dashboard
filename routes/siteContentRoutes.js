const express = require('express');
const siteContentController = require('../controller/siteContentController');
const { isLoggedIn } = require('../middleware/isAuth');


const router = express.Router();

router.get('/api/site-content', siteContentController.getAllContent)
router.post('/api/site-content/delete', siteContentController.deleteItem)
router.post('/api/site-content/add/location',  isLoggedIn, siteContentController.updateSiteLocations)
router.post('/api/site-content/add/shipping',  isLoggedIn, siteContentController.updateSiteShippingInfo)



module.exports = router;