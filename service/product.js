let config = require("../config");
let Product = require("../model/product");


//根据ID查询商品
async function findById(id) {

    return await Product.fondOne({_id: id})
}

/**
 //  * 添加商品
 //  * url :  POST,http://localhost:8080/product
 //  * 请求体中传递,要添加的数据, {name:手机,price:100,stock:100,category:001,description:xxx}
 //  * @returns {Promise<void>}
 //  */
async function addItem(product) {

    //判断商品是否存在
    let result = await Product.findOne({name: product.name});
    if (result) {
        throw Error("名字为:" + product.name + "已经存在")
    }
    //添加
    result = await Product.create(product)
    return result;

}

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/product/id
 * @returns {Promise<void>}
 */
async function deleteById(id) {
    //判断商品是否存在
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error("名字为:" + id + "不存在")
    }

    // { n: 1, nModified: 1, ok: 1 }
    result = await Product.deleteOne({_id: id})
    if (result.n < 1) {
        throw Error("删除商品失败")
    }
    return result
}


/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/product/:id
 * 更新操作的结果 : { n: 1, nModified: 1, ok: 1 }
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
async function updeteById(id, product) {
    //判断商品是否存在
    let result = await Product.findOne({_id: id});
    if (!result) {
        throw Error("名字为:" + id + "不存在")
    }

    result = await Product.updateOne({_id: id}, product)
    if (result.n < 1) {
        throw Error("更新商品失败")
    }
    return result
}

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/product?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
async function findByPage(page = 1) {
    let offset = (page - 1) * config.PAGE_SIZE
    return await Product.find().skip(offset).limit(config.PAGE_SIZE);
}

module.exports = {
    addItem, deleteById, updeteById, findByPage, findById
}





