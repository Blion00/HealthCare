var mongoose = require('mongoose');
let spSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
    ten_sp: { type: String, required: true },
    slug: { type: String, default: null },
    id_loai: { type: Number, required: true },
    sku: { type: String, default: '' },
    hinh: { type: String, default:''},
    gia: { type: Number, default: null},
    an_hien: { type: Number, default: true},
    luot_xem: { type: Number, default: 0},
    tags: { type: String, default:''},
    created_at: { type: Date, 'default': Date.now },
    update_at: { type: Date, 'default': Date.now},
}, { collection: 'san_pham' })
module.exports = spSchema;