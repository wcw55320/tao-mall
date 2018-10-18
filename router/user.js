let userService = require("../service/user");
let router = require("express").Router();
let config = require("../config");
let encryptUtil = require("../utils/encryptUtil");


module.exports = router;
/**
 * 用户注册
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 */
router.post("/regist", async (req, res) => {
    let result = await userService.regist(req.body);
    res.success(result)
})


router.get('/:username', async (req, res) => {
    let user = await userService.findByUsername(req.params.username);
    res.success(user)
});

router.delete('/:username', async (req, res) => {
    await userService.deleteUserByUsername(req.params.username);
    res.success()
});

router.post("/login", async (req, res) => {

    let token = await userService.login(req.body);

    res.success(token);
});

