const express = require('express'); // Khởi tạo framework express
const bodyParser = require('body-parser'); // 
require('dotenv').config();
const app = express();
const apiRoutes = require('./routes/apiRoutes');

app.use(bodyParser.json()); // Middleware để xử lý JSON

// Định tuyến
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});