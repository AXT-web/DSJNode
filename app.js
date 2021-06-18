const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')

const userRouter = require('./router/user')
const config = require('./config')
const expressJoi = require('@escook/express-joi')
const userinfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')

const app = express()

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

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
// 权限中间件，特别的接口不需要对照token
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ paht: [/^\/api\//] }))

app.use(cors())
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/artcate', artCateRouter)
app.use('/my/article', articleRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError)
        return res.cc({ status: 1, message: err, })
    if (err.name === 'UnauthorizedError')
        return res.cc('身份认证失败！')
    res.cc({ status: 1, message: err, })
})

app.listen(8888, function () {
    console.log('api server running at http://127.0.0.1:8888')
})