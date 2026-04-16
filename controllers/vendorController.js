const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey =process.env.whatIsYourName;

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword,
        });
        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
        console.log('Vendor registered successfully');

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error registering vendor:', error);
    }
};

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id : vendor._id}, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Vendor logged in successfully',token });
        console.log(email);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error logging in vendor:', error);
    }
};

const allVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('Firm');
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error fetching vendors:', error);
    }
};
const singleVendor = async(req, res) => {
    try {
        const vendor= await Vendor. findById(req.paramas.id).populate('Firm');
        if(!vendor){
            return res.status(404).json({message: 'Vendor not found'});
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Error fetching vendor:', error);
    }
};


    module.exports = { vendorRegister, vendorLogin, allVendors, singleVendor };