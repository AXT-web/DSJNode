const joi = require('@hapi/joi')

// 标题的验证规则
const title = joi.string().required()
// 分类ID的验证规则
const cate_id = joi.number().integer().min(3).required()
// 内容的验证规则
const content = joi.string().required().allow('')
// 发布状态的验证规则
const state = joi.string().valid('已发布', '草稿').required()

// 发布文章验证
exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}