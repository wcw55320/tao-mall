let config = require("../config");
let productService = require("../service/product");
let router = require("express").Router();


module.exports = router;
/**
 //  * 添加商品
 //  * url :  POST,http://localhost:8080/product
 //  * 请求体中传递,要添加的数据, {name:手机,price:100,stock:100,category:001,description:xxx}
 //  * @returns {Promise<void>}
 //  */
router.post("/", async (req, res) => {
    let result = await productService.addItem(req.body);
    res.success(result)
})

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/product/id
 * @returns {Promise<void>}
 */
router.delete("/:id", async (req, res) => {

    await productService.deleteById(req.params.id)
    res.success()
});


/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/product/:id
 * 更新操作的结果 : { n: 1, nModified: 1, ok: 1 }
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
router.put("/:id", async (req, res) => {

    await productService.updeteById(req.params.id, req.body)
    res.success()
});

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/product?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */

router.get("/", async (req, res) => {

    let page = req.query.page;
    let result = await productService.findByPage(page);
    res.success(result);
});





