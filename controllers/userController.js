const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../config/update");

// Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const {
            _id,
            ten_dang_nhap,
            mat_khau,
            ho_ten,
            email,
            dia_chi,
            dien_thoai
        } = req.body;
        const hinh_anh = req.file ? req.file.filename : null; // Lấy tên tệp hình ảnh đã tải lên
        const id_quyen = req.body.id_quyen || '2'; // Đặt giá trị mặc định là '2' nếu không được cung cấp
        // Kiểm tra xem email đã được sử dụng chưa
        const emailExist = await Users.findOne({ where: { email } });
        if (emailExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }
        // Tạo mật khẩu bảo mật
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(mat_khau, salt);
        // Tạo người dùng mới
        const user = await Users.create({
            _id,
            ten_dang_nhap,
            mat_khau: hashPassword,
            ho_ten,
            email,
            dia_chi,
            dien_thoai,
            hinh_anh,
            id_quyen,
        });
        res.status(200).json({
            message: "Đăng ký tài khoản thành công",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// login tài khoản bằng email và mật khẩu
exports.login = async (req, res) => {
    try {
        const { email, mat_khau } = req.body;

        // Kiểm tra xem email đã được sử dụng chưa
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "Email không tồn tại",
            });
        }

        // Kiểm tra mật khẩu
        const validPass = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!validPass) {
            return res.status(400).json({
                message: "Mật khẩu không hợp lệ",
            });
        }

        // Tạo và gửi token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        // In ra thông tin đăng nhập
        const userInfo = {
            _id: user._id,
            ten_dang_nhap: user.ten_dang_nhap,
            ho_ten: user.ho_ten,
            email: user.email,
            dia_chi: user.dia_chi,
            dien_thoai: user.dien_thoai,
            hinh_anh: user.hinh_anh,
            id_quyen: user.id_quyen
        };

        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: userInfo
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}