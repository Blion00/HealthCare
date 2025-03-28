var mongoose = require('mongoose');
let dhctSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 }, 
    id_sp : { type:Number, min: 1},
    ten_sp : {type:String, required:true, },
    gia_mua : { type:Number, required:true, min:0} ,
    so_luong : { type:Number, required:true, min:1} ,
    sku: { type:String, default:'', }, 
    hinh:{ type:String, default:''},
    created_at: { type: Date, 'default': Date.now },
    updated_at: { type: Date, 'default': Date.now },
}, { collection: 'don_hang_chi_tiet' })
module.exports = dhctSchema
