let permissions = [
    {
        role: 0,// 普通商家用户
        urls: [
            /\/category.*/,
            /\/product.*/,
            /\/order.*/
        ]
    }, {
        role: 100,// 管理员
        urls: [
            /.*/
        ]
    }
];

// 权限的校验
module.exports = (request, response, next) => {
    // 获取当前用户要请求的Url地址
    let reqUrl = request.url;
    // 获取用户
    let user = request.user;
    // 对登录状态的用户进行权限的校验
    if (user) {

        // 标志位,标记用户是否能够访问对应的地址,默认值是不允许访问
        let isGo = false;
        // 循环权限的数组
        outer:for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i];
            // 如果当前用户的角色 = 当前权限的角色
            if (user.role === permission.role) {
                // 遍历当前权限能够访问的URL地址
                let urls = permission.urls;
                for (let j = 0; j < urls.length; j++) {

                    let url = urls[j];
                    // 比对当前遍历到的正则表达式是否匹配,当前用户要访问的url地址
                    if (url.test(reqUrl)) {
                        // 如果匹配成功,修改标志位,说明用户可以访问,此时可以跳出循环
                        isGo = true;
                        break outer;
                    }
                }
            }
        }
        // 整个循环结束以后,如果发现用户没有权限访问对应的url地址,就抛出异常
        if (!isGo) {
            throw Error("您没有权限访问对应的地址");
        }
    }

    // 放行的代码
    next();
}