//用于处理异步异常
require("express-async-errors")

//打开数据连接
require("./db")
const express = require("express");
const app = express();

// 日志中间件
const morgan = require("morgan");
let config = require("./config");
let bodyParser = require("body-parser");


// 注册body-parser中间件
app.use(bodyParser.json());
//引入日志模块
app.use(morgan("combined"));
// 注册自定义的中间件
app.use(require("./middleware/res_md"));
// 注册路由
app.use("/user", require('./router/user'));
app.use("/category", require('./router/category'));
app.use("/product", require('./router/product'));
//解析json数据
app.use(express.json());


//处理中间件异常错误
app.use((err, req, res, next) => {
    res.fail(err.toString())
})

app.listen(config.PORT);