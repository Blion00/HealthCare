const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/HealthCare');
const loaiSchema = require('./model/schemaLoai.js');
const SpSchema = require('./model/schemaSP.js');
const UserSchema = require('./model/schemaUser.js');
const DhSchema = require('./model/schemaDonHang.js');
const DhctSchema = require('./model/schemaDonHangChiTiet.js');
const BinhLuanSchema = require('./model/schemaBinhLuan.js');
const data  = require("./model/data.js");
const slugify = require('slugify');

let { loai_arr, sp_arr, users_arr, don_hang_arr, don_hang_chi_tiet_arr, binhluan_arr } =  data;

const chen_loai = async ()=>{
  const LoaiModel = await conn.model('loai', loaiSchema);
  await LoaiModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " loại"));
  for(let i = 0; i < loai_arr.length; i++){
    let loai = new LoaiModel(loai_arr[i]);
    loai.slug = slugify(loai.ten_loai, { lower: true, strict: true });
    await loai.save();
  }
}
let ngau_nhien = function(low, high){
  return Math.floor(Math.random() * (high - low) + low);
} 

const chen_sp = async ()=>{
  const SpModel = await conn.model('san_pham', SpSchema);
  await SpModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " sản phẩm"));
  for(let i = 0; i < sp_arr.length; i++){
      let sp = new SpModel(sp_arr[i]);
      sp.slug = slugify(sp.ten_sp, { lower: true, strict: true }) + "-"+ sp.id;
      sp.luot_xem = ngau_nhien(1, 2000);

      let ngay = ngau_nhien(2023, 2026) + "-" + ngau_nhien(1, 13) +"-"+ngau_nhien(1,29);
      let gio  = ngau_nhien(0,24) +":"+ngau_nhien(0,60)+":"+ ngau_nhien(0,60);
      console.log(ngay + " " + gio);
      sp.created_at = ngay + " " + gio;
      sp.updated_at = ngay + " " + gio;
      await sp.save();
  }//for
}
const chen_user = async ()=>{
  const UserModel = await conn.model('users', UserSchema);
  await UserModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " users"));
  for(let i = 0; i < users_arr.length; i++){
    let user = new UserModel(users_arr[i]);
    await user.save();
  }
}
const chen_don_hang = async ()=>{
  const DhModel = await conn.model('don_hang', DhSchema);
  await DhModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " đơn hàng"));
  for(let i = 0; i < don_hang_arr.length; i++){
    let donhang = new DhModel(don_hang_arr[i]);
    await donhang.save();
  }
}
const chen_don_hang_chi_tiet = async ()=>{
  const DhctSchemaModel = await conn.model('don_hang_chi_tiet', DhctSchema);
  await DhctSchemaModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " đơn hàng chi tiết"));
  for(let i = 0; i < don_hang_chi_tiet_arr.length; i++){
    let ct = new DhctSchemaModel(don_hang_chi_tiet_arr[i]);
    await ct.save();
  }
}
const chen_binhluan = async ()=>{
  const BinhLuanModel = await conn.model('binh_luan', BinhLuanSchema);
  await BinhLuanModel.deleteMany({}).then( obj => console.log("Đã xóa ", obj.deletedCount, " bình luận"));
  for(let i = 0; i < binhluan_arr.length; i++){
    let binhluan = new BinhLuanModel(binhluan_arr[i]);
    await binhluan.save();
  }
}
///////////////////////////////////////////////////
(async() => {
  await chen_loai();
  await chen_sp();
  await  chen_user();
  await  chen_don_hang();
  await  chen_don_hang_chi_tiet();
  await chen_binhluan();
  process.exit();
})();
