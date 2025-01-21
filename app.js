const express = require('express'); // Khởi tạo framework express
const bodyParser = require('body-parser'); // 
require('dotenv').config();
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const apiAdmin = require('./routes/apiAdmin');
const { checkdangnhap, checkadmin } = require('./middleware/authMiddleware');


app.use(bodyParser.json()); // Middleware để xử lý JSON

// Kiểm tra 
// Định tuyến

// API reader (đọc bài viết, follow chuyển sang trang đăng nhập, đăng ký, đăng nhập)
// API Writer (Yêu cầu checkdn, tạo bài viết, xóa bài viết, ...)
app.use('/api', apiRoutes)
// API Admin (Yêu cầu checkdn, checkAdmin, quản lý user, )

app.use('/api/admin', checkdangnhap, checkadmin, apiAdmin);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});