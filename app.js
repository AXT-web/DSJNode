const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')

const userRouter = require('./router/user')

const app = express()

// 数据响应中间件
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

app.use(cors())
app.use('/api', userRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError)
        return res.cc({ status: 1, message: err, })
    res.cc({ status: 1, message: err, })
})

app.listen(8888, function () {
    console.log('api server running at http://127.0.0.1:8888')
})