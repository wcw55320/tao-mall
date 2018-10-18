let mongoose = require("mongoose");


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "分类名称不能少"]
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
//调用
module.exports = mongoose.model('category', schema);