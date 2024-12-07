require('dotenv').config()

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'tokensecreto2110',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
}