const { required } = require('joi');
const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: String,
        required: true,
        trim: true
    },
    reviews:{
        type:String,
        required: true,
        trim: true
    },
    category:{
        type:String,
        trim: true,
        default: 'Best Seller'
    },
    discount:{
        type: String,
        required: true,
        trim: true
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true
    },
    url:{
        type: String,
        required: true,
        trim: true
    },
    shop:{
        type: String,
        required: true,
        trim: true
    },
    originalPrice:{
        type: String,
        trim: true,
        required: true,
    },
    totalBuyers:{
        type: String,
        trim: true
    },
    recentPurchase:{
        type: String,
        trim: true
    }

});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;