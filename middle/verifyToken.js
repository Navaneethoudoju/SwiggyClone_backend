const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.WhatIsYourName;

const verifyToken = async(req, res, next) => {
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({error: 'Token is required'});
    }
    try {
        const decoded =jwt.verify(token, secretKey);

        const vendor = await Vendor.findById(decoded.id);
        
        if(!vendor){
            return res.status(401).json({error: 'Vendor not found'});
        }
        req.vendorId = vendor._id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({error: 'Invalid token'});
    }
};

module.exports = verifyToken;