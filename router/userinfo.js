const express = require('express')
const router = express.Router()

const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('../schema/user')

const { update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user')

// 获取用户信息
router.get('/select/userinfo', userinfo_handler.updateUserInfo)
// 更新用户基本信息
router.post('/update/updateuserinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 更新用户密码
router.post('/update/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatepwd)
// 更新用户头像
router.post('/update/updateAvatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

module.exports = router