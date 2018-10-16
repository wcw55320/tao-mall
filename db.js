const mongoose = require('mongoose')
let config = require("./config");
//连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/" + config.DB);
const db = mongoose.connection;

db.on('error', err => {
    if (err) {
        console.log(err)
    }
});

db.once('open', function () {
    console.log('连接mongodb成功！');
});