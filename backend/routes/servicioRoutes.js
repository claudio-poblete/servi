const express = require('express')
const { createServicio, getAllServicios, getServicioById, getServiciosUsuario,
  updateServicio, deleteServicio} = require('../controllers/servicioController');
const { authenticateToken } = require('../middlewares/authMiddleware')
const { handleValidationErrors } = require('../middlewares/validationMiddleware')
const router = express.Router()


router.post(
  '/',
  authenticateToken,
  handleValidationErrors,
  createServicio,
)

router.get( '/', getAllServicios,)

router.get(
  '/mis-servicios/:id_usuario',
  authenticateToken,
  getServiciosUsuario,
)

router.get(
  '/:id_servicio',
  getServicioById,
)

router.put(
  '/:id_servicio',
  handleValidationErrors,
  updateServicio,
)

router.delete(
  '/:id_servicio',
  authenticateToken,
  deleteServicio,
)



module.exports = router;