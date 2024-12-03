require('dotenv').config()
const pool = require('./database')

async function testConnection() {
  try {
    console.log('Intentando conectar con:', {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    })

    const res = await pool.query('SELECT NOW()')
    console.log('Conexión exitosa:', res.rows[0])
  } catch (error) {
    console.error('Error de conexión:', error)
  } finally {
    pool.end()
  }
}

testConnection()
