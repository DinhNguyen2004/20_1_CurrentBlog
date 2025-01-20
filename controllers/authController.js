const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Giả lập database

class authController {
    static async register(req, res) {
        const { email, password } = req.body;
        const role = "writer";
        const is_active = 0;
        const is_following = 0;
        const is_verified = 0;
        // Kiểm tra dữ liệu
        // console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            // Kiểm tra người dùng đã tồn tại
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists.' });
            }

            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo người dùng mới
            await User.create(email, hashedPassword, role, is_active, is_following, is_verified);

            return res.status(201).json({ message: 'User registered successfully.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error.' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        // Kiểm tra dữ liệu
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            // Kiểm tra người dùng
            const existingUser = await User.findByEmail(email);
            if (!existingUser) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            const isMatch = await bcrypt.compare(req.body.password, existingUser.password)
            console.log(isMatch);
            if (isMatch == false) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            const token = jwt.sign({ email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful.', token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error.' });
        }
    } S
}

module.exports = authController;