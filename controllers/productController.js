const product = require('../models/Product');
const multer = require('multer');
const Firm = require('../models/Firm');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({
    storage: storage,
});

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.path : undefined;
        console.log(req.body);

        const firmId = req.params.firmId; // Assuming you have a route parameter for firm ID
        console.log(firmId);
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: 'Firm not found' });
        }
        const newProduct = new product({
            productName,
            price,
            category,
            image,
            bestSeller,
            description,
            firm: firm._id,
        });
        const savedProduct = await newProduct.save();
        firm.product.push(savedProduct);
        await firm.save();

        return res.status(200).json({ message: 'Product added successfully' });
    }
       catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductByFirm = async (req, res) => {
    try {
        console.log('api called');
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(400).json({ error: 'Firm Not found' });
        }
        const products = await product.find({ firm: firmId });

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }   
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    }
        catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

        

module.exports = { addProduct: [upload.single('image'), addProduct] , getProductByFirm, deleteProductById };