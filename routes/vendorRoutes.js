const vendorController = require('../controllers/vendorController');
const express = require('express');
const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);
router.get('/allvendors', vendorController.allVendors);
router.get('/singlevendor/:vendorId', vendorController.singleVendor);

module.exports = router;