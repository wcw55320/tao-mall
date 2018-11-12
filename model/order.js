const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "商品id不能为空"]
    },
    productName: {
        type: String,
        required: [true, "商品名字不能缺少"]
    },
    productPrice: {
        type: String,
        required: [true, "商品价格不能缺少"]
    },
    count: {
        type: Number,
        required: [true, "商品数量不能为空"],
        min: [1, "商品数量不能小于1"]
    },
    total: {// 总金额
        type: String
    },
    status: {// 订单状态: unpay(未付款) success(成功) cancel(取消)
        type: String,
        default: "unpay"
    },
    created: {
        type: Date,
        default: Date.now(),
    },
    payTime: {// 付款时间
        type: Date
    },
    cancelTime: Date // 取消订单时间
});

module.exports = mongoose.model('order', schema);