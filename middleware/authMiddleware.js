const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.checkdangnhap = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Lỗi đăng nhập, trường không hợp lệ.' });
    }
    try {
        // Kiểm tra người dùng
        const existingUser = await User.findByEmail(req.body.email);
        if (!existingUser) {
            return res.status(400).json({ message: 'Tài khoản không tồn tại trong hệ thống.' });
        }
        const isMatch = await bcrypt.compare(req.body.password, existingUser.password)
        if (isMatch == false) {
            return res.status(400).json({ message: 'Mật khẩu không hợp lệ' });
        }
        // Kiểm tra người dùng xác thực email
        if (existingUser.is_verified == 0) {
            return res.status(400).json({ message: 'Người dùng chưa xác thực email' });
        }
        req.user = {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
            is_active: existingUser.is_active
        };
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error.' });
    }
};

exports.checkadmin = (req, res, next) => {
    if (req.user.role == 'admin') {
        console.log('Đăng nhập admin thành công');
        return next();
    }
    res.status(500).json({ message: 'Đăng nhập admin không thành công' });
};
