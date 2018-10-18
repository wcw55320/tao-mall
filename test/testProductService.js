let productService = require("../service/product");
require("../db")


async function testadd() {
    let res = {
        name: "海尔智能冰箱",
        price: "1000",
        stock: 800,
        description: "这是一个无噪音，省电，功率小的智能冰箱，支持远程控制。",
        category: "5bc8470510bb7bf9704283f2"
    }
    let result = await productService.addItem(res);
    console.log(result)
}

async function testupdete() {

    let id = "5bc8509359910d03cdf1482c";

    let res = {
        price: "16999.0",
    }
    let result = await productService.updeteById(id, res)
    console.log(result)
}


async function testdelete() {

    let id = "5bc850f78bfe990341cd453d";
    await productService.deleteById(id);

}


async function testpage() {

    let e = await productService.findByPage();
    console.log(e)
}



