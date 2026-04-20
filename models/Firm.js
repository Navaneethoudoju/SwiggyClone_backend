const mongoose = require('mongoose');

const firmScheama = new mongoose.Schema({
    firmName: {
        type: String,
        required: true,
        unique: true,
    },

    area: {
        type: String,
        required: true,
    },      

    category: {
        type: [
            {
                    type: String,
                     enum : ['veg', 'non-veg']
            }
       ],
    },
    
    region: {
        type: [
            {
                    type: String,
                    enum : ['south-indian', 'north-indian', 'chinese', 'Bakery']
            }
        ]
    },
    
    offer:{
        type: String,
    },

    image : {
        type: String,
    },

    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        }
    ],
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
        
}
);

const Firm = mongoose.model('Firm', firmScheama);
module.exports = Firm;
