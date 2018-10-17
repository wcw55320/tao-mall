//读取环境变量中NODE_ENV;
let nodeenv = process.env.NODE_ENV;

let config = null;

// 如果值是prod,就去加载生产环境的配置
if (nodeenv === "prod") {

    config = require("./prod");
} else {
    //如果不是就去加载开发环境配置
    config = require("./dev")
}

module.exports = config;