const express = require('express')
const cors = require('cors')
const { port } = require('./config/config')
require('dotenv').config()
const usuarioRoutes = require('./routes/usuarioRoutes')
const pagoRoutes = require('./routes/pagoRoutes')
const categoriaRoutes = require('./routes/categoriaRoutes')
const servicioRoutes = require('./routes/servicioRoutes')
const ofertaRoutes = require('./routes/ofertaRoutes')
const resenaRoutes = require('./routes/resenaRoutes')
const { authenticateToken } = require('./middlewares/authMiddleware')
const { handleValidationErrors } = require('./middlewares/validationMiddleware')

const app = express()

const allowedOrigins = ['http://localhost:5173', 'https://servi-7wlb.onrender.com'];

app.use(cors({
  origin: (origin, callback) => {
    console.log(origin)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

app.use('/api/usuarios',usuarioRoutes)
app.use('/api/ofertas', ofertaRoutes)
app.use('/api/pagos', authenticateToken, handleValidationErrors, pagoRoutes)
app.use('/api/categorias', authenticateToken, handleValidationErrors, categoriaRoutes)
app.use('/api/servicios', handleValidationErrors, servicioRoutes)
app.use('/api/resenas', authenticateToken, handleValidationErrors, resenaRoutes)

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
