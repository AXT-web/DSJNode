const joi = require('@hapi/joi')

// 用户名验证规则
const username = joi.string().alphanum().min(3).max(12).required()
// 密码验证规则
const password = joi.string().pattern(/^[\s]{8,18}$/).required()

exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}