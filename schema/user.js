const joi = require('@hapi/joi')

// 用户名验证规则
const username = joi.string().alphanum().min(3).max(12).required()
// 密码验证规则
const password = joi.string().pattern(/^[\s]{8,18}$/).required()
// 定义id验证规则
const id = joi.number().integer().min(3).required()
// 定义nickname验证规则
const nickname = joi.string().required()
// 定义email验证规则
const email = joi.string().email().required()
// 定义avatar头像验证规则
const avatar = joi.string().dataUri().required()

// 登录验证
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}
// 更新用户信息验证
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}
// 更新密码验证
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}
// 更新头像验证
exports.update_avatar_schema = {
    body: {
        avatar,
    },
}