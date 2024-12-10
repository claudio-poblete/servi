const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validateUserFields, handleValidationErrors } = require('../middlewares/validationMiddleware')


router.post(
  '/registro',
  validateUserFields,
  handleValidationErrors,
  usuarioController.createUsuario
)
router.get('/usuario/:id_usuario', authenticateToken, usuarioController.getUsuarioById)
router.put(
  '/usuario/:id_usuario',
  authenticateToken,
  validateUserFields,
  handleValidationErrors,
  usuarioController.updateUsuario
)
router.delete('/usuario/:id_usuario', authenticateToken, usuarioController.deleteUsuario)
router.post('/login', usuarioController.loginUsuario)

module.exports = router