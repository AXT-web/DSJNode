const joi = require('@hapi/joi')

// 定义分类名称的验证规则
const name = joi.string().required()
// 定义分类别名的验证规则
const alias = joi.string().alphanum().required()
// 定义分类ID的校验规则
const id = joi.number().integer().min(3).required()

// 添加分类的校验规则
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}
// 删除分类的校验规则
exports.delete_cate_schema = {
    body: {
        id,
    },
}
// 根据ID获取分类
exports.get_cate_schema = {
    params: {
        id,
    },
}
// 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}