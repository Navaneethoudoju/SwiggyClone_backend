const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/addproduct/:firmId', productController.addProduct);
router.get('/getproducts/:firmId', productController.getProductByFirm);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/deleteproduct/:productId', productController.deleteProductById);
module.exports = router;

