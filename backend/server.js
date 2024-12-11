const express = require('express')
const cors = require('cors')
const { port } = require('./config/config')
require('dotenv').config()
const usuarioRoutes = require('./routes/usuarioRoutes')
const pagoRoutes = require('./routes/pagoRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const servicioRoutes = require('./routes/servicioRoutes')
const resenaRoutes = require('./routes/resenaRoutes')
const { authenticateToken } = require('./middlewares/authMiddleware')
const { validateServiceFields, handleValidationErrors } = require('./middlewares/validationMiddleware')

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

app.use('/api/usuarios', authenticateToken, validateServiceFields, handleValidationErrors, usuarioRoutes)
app.use('/api/pagos', authenticateToken, validateServiceFields, handleValidationErrors, pagoRoutes)
app.use('/api/categorias', authenticateToken, validateServiceFields, handleValidationErrors, categoriaRoutes)
app.use('/api/servicios', authenticateToken, validateServiceFields, handleValidationErrors, servicioRoutes)
app.use('/api/resenas', authenticateToken, validateServiceFields, handleValidationErrors, resenaRoutes)

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
