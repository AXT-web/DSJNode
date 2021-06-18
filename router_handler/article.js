const path = require('path')

const db = require('../db/index')

const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.fieldname),
    pub_date: new Date(),
    author_id: req.user.id,
}

// 发布文章
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img')
        return res.cc('文章封面是必选参数')
    const sql = `insert into ev_article set ?`
    db.query(sql, articleInfo, (err, results) => {
        if (err)
            return res.cc(err)
        if (results.affectedRows !== 1)
            return res.cc('发布文章失败!')
        res.cc('发布文章成功', 0)
    })
}