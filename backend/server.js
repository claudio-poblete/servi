const express = require('express')
const cors = require('cors')
const { port } = require('./config/config')
require('dotenv').config()
const usuarioRoutes = require('./routes/usuarioRoutes')
const pagoRoutes = require('./routes/pagoRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const servicioRoutes = require('./routes/servicioRoutes')
const resenaRoutes = require('./routes/resenaRoutes')
const authMiddleware = require('./middlewares/authMiddleware')

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/pagos', pagoRoutes)
app.use('/api/categorias', categoriaRoutes)
app.use('/api/servicios', servicioRoutes)
app.use('/api/resenas', resenaRoutes)

app.use('/api/usuarios', authMiddleware, usuarioRoutes)
app.use('/api/pagos', authMiddleware, pagoRoutes)
app.use('/api/categorias', authMiddleware, categoriaRoutes)
app.use('/api/servicios', authMiddleware, servicioRoutes)
app.use('/api/resenas', authMiddleware, resenaRoutes)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Error interno del servidor'
  })
})

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})