const User = require('../models/user')

class userController {
    // Writer and Admin // Ok
    static async info(req, res) {
        const user = await User.findByEmail(req.body.email);
        res.status(200).json({
            message: "Thông tin cá nhân",
            user
        })
    }

    // edit user
    static async updateInfo(req, res) {
        const user = await User.findByEmail(req.body.email);
        res.status(200).json({
            message: "Thông tin cá nhân",
            user
        })
    }
    // User Manager (Admin)  // Ok
    static async listUser(req, res) {
        const Users = await User.find();
        res.status(400).json({
            message: "Danh sách các user",
            List: Users
        })
    }
}

module.exports = userController;