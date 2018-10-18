let categoryService = require("../service/category");
require("../db")


async function testadd() {
    let res = {
        name: "3C产品"
    }
    let result = await categoryService.addItem(res);
    console.log(result)
}


async function testupdete() {

    let id = "5bc83cb39eef8257687b71f7";

    let res = {
        name: "数码产品",
    }
    let result = await categoryService.updateByID(id, res)
    console.log(result)
}


async function testdelete() {

    let id = "5bc83f0dbc9b08eac809b3f7";
    await categoryService.deleteByID(id);

}

async function testpage() {

    let e = await categoryService.findByPage();
    console.log(e)
}

testpage()