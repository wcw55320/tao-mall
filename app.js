//用于处理异步异常
require("express-async-errors")

//打开数据连接
require("./db")
const express = require("express");
const app = express();

// 日志中间件
const morgan = require("morgan");
let config = require("./config");


//引入日志模块
app.user(morgan("combined"));


//解析json数据
app.use(express.json());


//处理中间件异常错误
app.use((err, request, response, next) => {

})

app.listen(config.PORT);