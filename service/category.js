let config = require("../config/prod");
let Category = require("../model/category");


/**
 * 添加分类
 * url :  POST,http://localhost:8080/category
 * 请求体中传递,要添加的数据, {name:手机}
 * @returns {Promise<void>}
 */

async function addItem(category) {

    let result = await Category.findOne({name: category.name})

    if (result) {
        throw Error("该用户名" + category.name + "已经存在")
    }
    result = await Category.create(category);

    return result;
}


/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/category/id
 * @returns {Promise<void>}
 */
async function deleteByID(id) {

    let reslut = await Category.findOne({_id: id});
    if (!reslut) {
        throw Error(`ID为${id}的数据不存在`);
    }

    reslut = await Category.deleteOne({_id: id});
    if (reslut.n !== 1) {
        throw Error(`删除ID为${id}的数据失败`);
    }
}

/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/category/:id
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
async function updateByID(id, category) {

    let result = await Category.findOne({_id: id})

    if (!result) {
        throw Error("id为" + id + "的数据不存在")
    }

    result = await Category.updateOne({_id: id}, category);
    if (result.n < 1) {
        throw Error("ID为:" + id + "数据更新失败")
    }
}


/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/category?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
async function findByPage(page = 1) {
    //偏移量
    let offset = (page - 1) * config.PAGE_SIZE;

    return await Category.find().skip(offset).limit(config.PAGE_SIZE);

}


module.exports = {
    addItem, deleteByID, findByPage, updateByID
};