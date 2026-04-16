const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middle/verifyToken');
const path = require('path');

const router = express.Router();

router.post('/addfirm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});


router.delete('/deletefirm/:firmId', firmController.deleteFirmById);

module.exports = router;