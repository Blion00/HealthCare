const exp = require("express");
const app = exp();
const port = 3000;
var cors = require('cors')
app.use( [ cors() , exp.json() ] );

const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/HealthCare');

app.get('/api/sp/:slug', async (req, res, next) => { 
    let slug = req.params.slug; 
    if (slug==="") return res.status(400).json({'thongbao':'Sản phẩm không tồn tại'});
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = await SpModel.findOne({ slug: slug });
    if (sp===null) res.status(400).json({'thongbao':'Sản phẩm không có'})
    sp.luot_xem = sp.luot_xem + 1;
    sp.save();
    res.status(200).json(sp); 
});
app.get('/api/sp_moi', async function(req, res) { 
    let limit = Number( req.query.limit == undefined? 6: req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1})
    .sort({'updated_at': -1})
    .limit(limit).exec();
    res.json(listsp);
});
app.get('/api/sp_quan_tam', async function(req, res) {
    let limit = Number( req.query.limit == undefined? 6: req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1})
    .sort({'luot_xem': -1})
    .limit(limit).exec();
    res.json(listsp);
});
app.get('/api/sp_trong_loai/:slug', async function(req, res) {  
    let slug = req.params.slug;
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    let loai = await LoaiModel.findOne({ slug: slug });
  
    if (!loai) return res.json({ 'thongbao': `Không có loại ${slug}` });
  
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 6;
    let startRow = (page - 1) * limit;
  
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
  
    let total = await SpModel.countDocuments({ an_hien: 1, id_loai: loai.id });
    
    let listsp = await SpModel.find({ an_hien: 1, id_loai: loai.id })
      .sort({ 'updated_at': -1 })
      .skip(startRow)
      .limit(limit)
      .exec();
    res.json({ sp_arr: listsp, total });
  });
app.get('/api/sp_trong_loai/:slug/dem', async function(req, res) {
    let slug = req.params.slu
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    let loai = await LoaiModel.findOne({ slug: slug });
    if (loai===null) return res.json({total: 0 });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    const dem = await SpModel.countDocuments({ an_hien: 1, id_loai: loai.id});
    res.json({total: dem });
});
app.get('/api/spmoi_trong_loai/:id_loai', async function(req, res) { 
    let id_loai = req.params.id_loai;
    if (isNaN(id_loai)) return res.json([]);
    let limit = req.query.limit || 6;
    if (isNaN(limit)) return res.json([]);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1, id_loai: id_loai})
    .sort({'updated_at': -1})
    .limit(limit)
    .exec();
    res.json(listsp);
});
app.get('/api/loai', async function(req, res) { 
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    listloai = await LoaiModel.find({ an_hien: 1})
    .sort({'thu_tu': 1})
    .exec();
    res.json(listloai);
});
app.get('/api/loai/:id', async function(req, res) { 
    let id = req.params.id; 
    if (isNaN(id)==true) return res.json({'thongbao':'Loại không tồn tại'});
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    let loai = await LoaiModel.findOne({ id: id });
    res.json(loai);
});
app.get('/api/loai_slug/:slug', async function(req, res) { 
    let slug = req.params.slug; 
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    let loai = await LoaiModel.findOne({ slug: slug });
    if (loai===null) return res.json({'thongbao':'Loại không tồn tại'});
    else res.json(loai);
});
app.get('/api/sp_lien_quan/:id/:limit', async function(req, res) { 
    let id = Number(req.params.id); //NaN nếu id là chữ
    let limit = Number(req.params.limit); //NaN nếu limit là chữ
    if (isNaN(id) === true || id <= 0 ) return res.json({'thongbao':'Sản phẩm không tồn tại'}); 
    if (isNaN(limit) === true || limit <= 1) limit = 1; 
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = await SpModel.findOne({ id: id });
    if (sp === null) return res.json({'thongbao':'Sản phẩm không có'})
    let id_loai = sp.id_loai;
    listsp = await SpModel.find({ an_hien: 1, id_loai: id_loai, id: { "$ne": id }})
    .sort({'updated_at': -1}).limit(limit).exec();
    res.json(listsp);
});
app.get('/api/tim_kiem', async function(req, res) {
    let tukhoa = req.query.tukhoa == undefined? 'xxxyyyzzz': req.query.tukhoa; 
    let limit = Number( req.query.limit == undefined? 6: req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1, ten_sp:{$regex: tukhoa, $options: 'i'} })
    .sort({'updated_at': -1})
    .limit(limit)
    .exec();
    res.json(listsp);
    });
app.post("/api/binh_luan", async function(req, res){
    let {id_sp, id_user, ho_ten, noi_dung} = req.body;
    const BLSchema = require('./model/schemaBinhLuan.js');
    const BLModel = await conn.model('binh_luan', BLSchema);
        
    const doc = await BLModel.find({}).select("id")
    .sort({"id" : -1}).limit(1).exec();
    let id_bl = doc[0].id + 1;
    
    let bl = new BLModel({id_sp, id_user, ho_ten, noi_dung});
    bl.id = id_bl;
    bl.save();
    res.json({"thong_bao":"Đã thêm binh luận", bl});
})
app.get('/api/binh_luan/:id_sp', async function(req, res) {  
    let id_sp = req.params.id_sp;
    if (isNaN(id_sp)) return res.json([]);
    let limit = req.query.limit || 100;
    if (isNaN(limit)) return res.json([]);
    const BLSchema = require('./model/schemaBinhLuan.js');
    const BLModel = await conn.model('binh_luan', BLSchema);
    listBL = await BLModel.find({ an_hien: true, id_sp: id_sp})
    .sort({'updated_at': -1}).limit(limit).exec();
    res.json(listBL); 
});
app.get('/api/luu_don_hang', async (req, res) => {
      let dh = {
        id_user: Number(req.body.id_user),    
        ten_nguoi_nhan: req.body.ten_nguoi_nhan,
        dia_chi: req.body.dia_chi,
        email: req.body.email,
        dien_thoai: req.body.dien_thoai,
        trang_thai:0,
        thoi_diem_mua: new Date()
      };
      if (isNaN(dh.id_user)) 
        return res.status(401).json( {"thongbao":"id_user chưa có", "id":"-1"} );
      if (dh.ten_nguoi_nhan==undefined || dh.ten_nguoi_nhan=="") 
        return res.status(401).json( {"thongbao":"ten_nguoi_nhan chưa có", "id":"-1"} );
      if (dh.dia_chi==undefined || dh.dia_chi=="") 
        return res.status(401).json( {"thongbao":"dia_chi chưa có", "id":"-1"} );
      if (dh.email==undefined || dh.email=="") 
        return res.status(401).json( {"thongbao":"email chưa có", "id":"-1"} );
      if (dh.dien_thoai==undefined || dh.dien_thoai=="") 
        return res.status(401).json( {"thongbao":"dien_thoai chưa có", "id":"-1"} );
    
      const DHSchema = require('./model/schemaDonHang.js');
      const DHModel = await conn.model('don_hang', DHSchema);
      const doc = await DHModel.find({}).select("id").sort({"id" : -1}).limit(1).exec();
      let id_dh = doc[0].id + 1;
      dh.id = id_dh;
    
       DHModel.create(dh)
      .then( function(item){ res.json({ "thongbao": "Đã tạo đơn hàng", "dh" : item}) })
      .catch( function (err) { res.json({"thongbao":"Lỗi tạo đơn hàng", err })  });
    });
app.listen(port, () =>console.log(`Ung dung dang chay voi port ${port}`));