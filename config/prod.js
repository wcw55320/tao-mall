//生产环境
module.exports = {
    PORT: 80,
    DB: "product-manager",
    TokenExpie: 1000 * 3600 * 24 * 7,//一周
    PageCount: 10,
    PAGE_SIZE: 10,
    TOKEN_KEY: "product-manager",
}