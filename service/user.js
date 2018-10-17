let User = require("../model/user");
let encryptUtil = require("../utils/encryptUtil");
let config = require("../config/prod");

/**
 * 用户注册
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */

async function regist(user) {
    //根据用户名查询用户
    let res = await User.findOne({username: user.username});
    if (res) {
        throw Error("该用户名" + user.username + "已经存在")
    }
    //加密
    //参数1:原文
    //参数2:盐
    user.password = encryptUtil.md5Hmac(user.password, user.username)
    //对角色重新赋值
    user.role = 0;
    //注册
    res = await User.create(user);
    res.password = " ";
    return res;
}

/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8080/username
 * @param username 用户名
 * @returns {Promise<void>}
 */
async function deleteUserByUsername(username) {
    // //根据用户名检查用户是否存在
    await isExistByUsername(username)
    let res = await User.deleteOne({username: username});
    if (res.n < 1) {
        throw Error("删除失败");
    }

}

/* 根据用户名查询用户
* url : GET , http://localhost:8080/username
* @param username : 用户名, zhangsan
* @returns {Promise<*>}
*/
async function findByUsername(username) {

    let res = await User.findOne({username: username}).select("-__v -password");
    if (!res) {
        throw Error("该用户名为" + username + "不存在")
    }
    return res;
}

/**
 * 用户登录
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function login(user) {

    // 根据用户名检查用户是否存在
    await isExistByUsername(user.username);
    // 用户有没有传递密码过来
    let password = user.password;
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空");
    }

    // 加密密码
    user.password = encryptUtil.md5Hmac(password, user.username);
    // 查询用户
    user = await User.findOne(user);
    // 查询用户失败,说明用户名或密码错误
    if (!user) {
        throw Error("用户名或密码错误");
    }
    // 查询成功,定义token数据
    let token = {
        username: user.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };

    // 参数1 : 原文
    // 参数2 : 密钥
    // 对token进行加密
    let encryptedToken = encryptUtil.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    return encryptedToken;
}

async function isExistByUsername(username) {

    let res = await User.findOne({username: username});
    if (!res) {
        throw Error("该用户名" + username + "不存在")
    }

}

module.exports = {
    regist, deleteUserByUsername, login, findByUsername
}



