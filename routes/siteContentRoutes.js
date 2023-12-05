const express = require('express');
const siteContentController = require('../controller/siteContentController');
const { isLoggedIn, isAdmin } = require('../middleware/isAuth');


const router = express.Router();

router.get('/api/site-content', siteContentController.getAllContent)
router.post('/api/site-content/delete', siteContentController.deleteItem)
router.post('/api/site-content/add/location',  isLoggedIn, isAdmin, siteContentController.updateSiteLocations)
router.post('/api/site-content/add/shipping',  isLoggedIn, isAdmin, siteContentController.updateSiteShippingInfo)



module.exports = router;