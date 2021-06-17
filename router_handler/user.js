const express = require('express')
const bcrypt = require('bcryptjs')

const db = require('../db/index')

// 注册
exports.regUser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或者密码不能为空！')
    }
    const sql = `select * from ev_users where username = ?`
    db.query(sql, [userinfo, username], function (err, results) {
        if (err) {
            return res.cc(err.message)
        }
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 18)
        const sql = `insert into ev_users set ?`
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            if (err) {
                return res.cc(err.message)
            }
            if (results.affectedRows !== 1) {
                return res.cc({ '注册用户失败，请稍后再试！' })
            }
            res.cc('注册成功!')
        })
    })
}

// 登录
exports.login = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或者密码不能为空！')
    }
    const sql = `select * from ev_users where username = ?`
    db.query(sql, userinfo.username, function (err, results) {
        if (err)
            return res.cc(err)
        if (results.length !== 1)
            return res.cc('登录失败!')
    })
}