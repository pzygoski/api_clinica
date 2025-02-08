import mysql from 'mysql2/promise'

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'clinica',
    password: 'clinica123',
    database: 'clinica'
})

export default pool;