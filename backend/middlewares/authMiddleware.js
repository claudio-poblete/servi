const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado. Por favor, autentíquese.' });
    }

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token no válido o ha expirado.' })
      }

      res.locals.user = user
      next()
    })
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error)
    res.status(500).json({ error: 'Error interno del servidor durante la autenticación.' })
  }
}

module.exports = authenticateToken