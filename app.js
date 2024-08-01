const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRouters');
const cate = require('./routes/cateRouters');
const Users = require('./routes/usersRouters');
require('dotenv').config();



const app = express();

app.use(bodyParser.json());

app.use('/product', productRoutes);
app.use('/cate', cate);
app.use('/users', Users);

// Thử kết nối đến cơ sở dữ liệu
sequelize.authenticate()
  .then(() => {
    console.log('Kết nối đến cơ sở dữ liệu đã được thiết lập thành công.');

    // Đồng bộ các mô hình và khởi động server
    sequelize.sync()
      .then(() => {
        app.listen(3000, () => {
          console.log('Server đang chạy trên http://localhost:3000');
        });
      })
      .catch(err => {
        console.error('Không thể đồng bộ cơ sở dữ liệu:', err);
      });
  })
  .catch(err => {
    console.error('Không thể kết nối với cơ sở dữ liệu:', err);
  });
