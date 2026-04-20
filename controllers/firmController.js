

const multer = require('multer');
const firm = require('../models/Firm');
const vendor = require('../models/Vendor');
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


const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, offer,region  } = req.body;

        const Vendor = await vendor.findById(req.vendorId);
        if (!Vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        else if (Vendor.Firm.length >= 1) {
            return res.status(400).json({ message: 'Vendor can only have one firm' });
        }
        const image = req.file ? req.file.path : undefined;
        const Firm = new firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: req.vendorId,

        });
        
        const savedFirm = await Firm.save();
     
        Vendor.Firm.push(savedFirm);
        await Vendor.save();
        const firmId = savedFirm._id;

        return res.status(200).json({ message: 'Firm added successfully', firmId });
    }

    catch (error) {

        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const delertedFirm = await firm.findByIdAndDelete(firmId);
        if (!delertedFirm) {
            return res.status(404).json({ error: 'Firm not found' });
        }   
        return res.status(200).json({ message: 'Firm deleted successfully' });
    } catch (error) {   
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }   
};


module.exports = {
    addFirm: [upload.single('image'), addFirm],
    deleteFirmById,
};