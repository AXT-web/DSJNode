const expressJoi = require('@escook/express-joi')
const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const ariclet_handler = require('../router_handler/article')
const upload = multer({ dest: path.join(__dirname, '../uploads') })
const { add_article_schema } = require('../schema/article')

// 发布文章
router.post('/addArticle', upload.single('cover_img'),expressJoi(add_article_schema), ariclet_handler.addArticle)

module.exports = router