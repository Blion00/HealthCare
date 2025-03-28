var mongoose = require('mongoose');
let donhangSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 }, 
    id_user : { type:Number, required:true,} ,
    thoi_diem_mua: { type: Date, 'default': Date.now },
    ten_nguoi_nhan : {type:String, required:true, },
    dia_chi: { type:String, default:'', }, 
    email: { type:String, default:'', }, 
    dien_thoai: { type:String, default:'', }, 
    trang_thai : { type:Number, default:0} ,
    created_at: { type: Date, 'default': Date.now },
    updated_at: { type: Date, 'default': Date.now },
}, { collection: 'don_hang' })
module.exports = donhangSchema;