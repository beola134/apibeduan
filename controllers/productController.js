const Product = require('../models/product');
const upload = require('../config/update');
const Cate = require('../models/cate');

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Thêm sản phẩm
  exports.addProduct = async (req, res) => {
    try {
      // Xử lý upload file
      upload.single('hinh_anh')(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        const { _id: productId, ten_san_pham,ten, gia_san_pham,gia_giam, mo_ta,ma_san_pham,do_chiu_nuoc,xuat_xu, gioi_tinh, so_luong, loai_may, duong_kinh, chat_lieu_day, chat_lieu_vo, mat_kinh, mau_mat, phong_cach, kieu_dang, id_danh_muc: categoryId } = req.body;
        const hinh_anh = req.file ? req.file.originalname : '';
        // Kiểm tra danh mục 
        if (!categoryId || !(await Cate.findOne({ where: { _id: categoryId } }))) {
          return res.status(400).json({ error: 'ID danh mục không hợp lệ' });
        }
        // Kiểm tra sản phẩm
        if (!productId || await Product.findOne({ where: { _id: productId } })) {
          return res.status(400).json({ error: 'ID sản phẩm hiện tại hoặc không hợp lệ' });
        }
        // Tạo và lưu sản phẩm
        const product = await Product.create({
          _id: productId,ten_san_pham,ten,gia_san_pham,gia_giam,hinh_anh,mo_ta,ma_san_pham,do_chiu_nuoc,xuat_xu,gioi_tinh,so_luong,loai_may,duong_kinh,chat_lieu_day,chat_lieu_vo,mat_kinh,mau_mat,phong_cach,kieu_dang, id_danh_muc: categoryId
        });
        res.json(product);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Xóa sản phẩm
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({ where: { _id: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }
      await product.destroy();
      res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  //cập nhật sản phẩm
  exports.updateProduct = async (req, res) => {
    try {
      // Tìm sản phẩm theo ID
      const product = await Product.findOne({ where: { _id: req.params.id } });
      if (!product) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }
      // Xử lý upload ảnh
      upload.single('hinh_anh')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const { ten_san_pham, gia_san_pham, mo_ta, gioi_tinh, so_luong, loai_may, duong_kinh, chat_lieu_day, chat_lieu_vo, mat_kinh, mau_mat, phong_cach, kieu_dang, id_danh_muc: categoryId } = req.body;
        const hinh_anh = req.file ? req.file.originalname : product.hinh_anh;
        // Kiểm tra danh mục
        if (!categoryId || !(await Cate.findOne({ where: { _id: categoryId } }))) {
          return res.status(400).json({ error: 'ID danh mục không hợp lệ' });
        }
        // Cập nhật sản phẩm
        await product.update({
          ten_san_pham,gia_san_pham,hinh_anh,mo_ta,gioi_tinh,so_luong,loai_may,duong_kinh,chat_lieu_day,chat_lieu_vo,mat_kinh,mau_mat,phong_cach,kieu_dang,id_danh_muc: categoryId
        });
        res.json(product);
      });
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }