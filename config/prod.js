//生产环境
module.exports = {
    PORT: 80,
    DB: "product-manager",
    TokenExpie: 1000 * 3600 * 24 * 7,//一周
    TokenKey: "product-manager",
    PageCount: 10,
}