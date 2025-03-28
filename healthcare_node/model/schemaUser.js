var mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 }, 
    ho_ten : {type:String, required:true, },
    email : {type:String, required:true, },
    password : {type:String, required:true, },
    role : { type:Number, default:0} ,
    created_at: { type: Date, 'default': Date.now },
    updated_at: { type: Date, 'default': Date.now },
}, { collection: 'users' })
module.exports = userSchema;