let UserService = require("../service/user");
require("../db")


async function testUser() {
    //用户添加
    let user = {
        username: "wangwu",
        password: "456",
        role: 100
    }

    let res = await UserService.regist(user)
    console.log(res)
}

async function testDeleteUsername() {

    await UserService.deleteUserByUsername("wangwu");

}

async function testFindOne() {

    let res = await UserService.findByUsername("sdas");
    console.log(res)

}

async function testLogin() {
    let user = {
        username: "wangwu",
        password: "222"
    }
    let res = await UserService.login(user);
    console.log(res)
}
