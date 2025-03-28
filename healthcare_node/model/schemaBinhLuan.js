var mongoose = require('mongoose');
let BinhLuanSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    id_user : {type:Number, required:true, },
    ho_ten : {type:String, required:true, },
    id_sp : {type:Number, required:true, },
    noi_dung : {type:String, required:true, },
    an_hien : { type:Boolean, default:true} ,
    created_at: { type: Date, 'default': Date.now },
    updated_at: { type: Date, 'default': Date.now },
}, { collection: 'binh_luan' })
module.exports = BinhLuanSchema;