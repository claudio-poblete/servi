const jwt = require('jsonwebtoken')
const config = require('../config/config')

const authenticateToken = async (req, res, next) => {

  console.log('Auth Middleware - Headers:', req.headers);

  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      console.log('No se proporcionó el encabezado de autorización');
      return res.status(401).json({ error: 'Token no proporcionado. Por favor, autentíquese.' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      console.log('No se encontró el token');
      return res.status(401).json({ error: 'Token no proporcionado. Por favor, autentíquese.' })
    }

    try {
      const user = jwt.verify(token, config.jwtSecret)
      console.log('Token verificado exitosamente:', user);
      res.locals.user = user
      next()
    } catch (err) {
      console.log('Error al verificar el token:', err);
      return res.status(403).json({ error: 'Token no válido o ha expirado.' })
    }

  } catch (error) {
    console.error('Error en el middleware de autenticación:', error)
    res.status(500).json({ error: 'Error interno del servidor durante la autenticación.' })
  }
}

module.exports = { authenticateToken };
