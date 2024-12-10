const express = require('express')
const {
  createServicio,
  getAllServicios,
  getServicioById,
  updateServicio,
  deleteServicio
} = require('../controllers/servicioController');

const { authenticateToken } = require('../middlewares/authMiddleware')
const { validateServiceFields, handleValidationErrors } = require('../middlewares/validationMiddleware')
const router = express.Router()


//OJO AQUÍ OMITÍ EL USO DE MIDDLEWARES, Y SI FUNCIONÓ EL SERVER

router.post(
  '/',
  authenticateToken,
  validateServiceFields,
  handleValidationErrors,
  createServicio,
)

router.get(
  '/',
  authenticateToken,
  getAllServicios,
)

router.get(
  '/:id_servicio',
  authenticateToken,
  getServicioById,
)

router.put(
  '/:id_servicio',
  authenticateToken,
  validateServiceFields,
  handleValidationErrors,
  updateServicio,
)

router.delete(
  '/:id_servicio',
  authenticateToken,
  deleteServicio,
)

//—————————————————————————————————————————————//

// router.post(
//   '/',
//   createServicio,
// )

// router.get(
//   '/',
//   getAllServicios,
// )

// router.get(
//   '/:id_servicio',
//   getServicioById,
// )

// router.put(
//   '/:id_servicio',
//   updateServicio,
// )

// router.delete(
//   '/:id_servicio',
//   deleteServicio,
// )



module.exports = router;