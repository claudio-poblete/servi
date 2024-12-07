const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err)
  process.exit(-1)
})

const query = (text, params) => {
  return pool.query(text, params)
}

module.exports = { query }