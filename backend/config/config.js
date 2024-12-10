require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
}