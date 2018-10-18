let categoryService = require("../service/category");
let router = require("express").Router();
let config = require("../config");

module.exports = router;

/**
 * 添加分类
 * url :  POST,http://localhost:8080/category
 * 请求体中传递,要添加的数据, {name:手机}
 * @returns {Promise<void>}
 */
router.post("/", async (req, res) => {

    let result = await categoryService.addItem(req.body);
    res.success(result);
})

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/category/id
 * @returns {Promise<void>}
 */
router.delete("/:id", async (req, res) => {

    let id = req.params.id;
    await categoryService.deleteByID(id);
    res.success();

});
/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/category/:id
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */

router.put("/:id", async (req, res) => {

    await categoryService.updateByID(req.params.id, req.body);
    res.success();
});

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/category?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
router.get("/", async (req, res) => {

    let page = req.query.page;
    let result = await categoryService.findByPage(page);
    res.success(result);
});