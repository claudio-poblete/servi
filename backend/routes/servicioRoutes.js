const express = require('express')
const servicioController = require('../controllers/servicioController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validateServiceFields, handleValidationErrors } = require('../middlewares/validationMiddleware')
const router = express.Router()

router.post(
  '/',
  authenticateToken,
  validateServiceFields,
  handleValidationErrors,
  servicioController.createServicio
)

router.get(
  '/',
  authenticateToken,
  servicioController.getAllServicios
)

router.get(
  '/:id_servicio',
  authenticateToken,
  servicioController.getServicioById
)

router.put(
  '/:id_servicio',
  authenticateToken,
  validateServiceFields,
  handleValidationErrors,
  servicioController.updateServicio
)

router.delete(
  '/:id_servicio',
  authenticateToken,
  servicioController.deleteServicio
)


module.exports = router