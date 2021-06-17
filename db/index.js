const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '18775921835',
    database: 'dashijian',
})

module.exports = db