var mongoose = require('mongoose');
const loaiSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 }, 
    ten_loai : {type:String, required:true, },
    slug : {type:String, default: null, },

    thu_tu : { type:Number, default:0,} ,
    an_hien : { type:Boolean, default:true,} ,
    created_at: { type: Date, 'default': Date.now },
    updated_at: { type: Date, 'default': Date.now },
}, { collection: 'loai' })
module.exports = loaiSchema;