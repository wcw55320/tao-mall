let orderService = require("../service/order");
require("../db")


async function testadd() {
    let res = {
        productId: "5bc850cd160b4403016eb5d4",
        count: 3,
        productName: "联想E450",
        productPrice: "4000.1",

    }
    let result = await orderService.addItem(res);
    console.log(result)
}

async function testpage() {

    let e = await orderService.findByPage();
    console.log(e)
}

