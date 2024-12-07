const express = require('express')
const router = express.Router()
const datosBancariosController = require('../controllers/datosBancariosController')
const authenticateToken = require('../middlewares/authMiddleware')
const { handleValidationErrors } = require('../middlewares/validationMiddleware')

router.post(
  '/datos-bancarios',
  authenticateToken,
  handleValidationErrors,
  datosBancariosController.createDatosBancarios
)
router.get('/datos-bancarios/:id_usuario',
  authenticateToken,
  datosBancariosController.getDatosBancariosByUserId
)
router.put(
  '/datos-bancarios/:id_usuario',
  authenticateToken,
  handleValidationErrors,
  datosBancariosController.updateDatosBancarios
)
router.delete('/datos-bancarios/:id_usuario', authenticateToken, datosBancariosController.deleteDatosBancarios)

module.exports = router