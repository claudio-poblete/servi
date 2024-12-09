const express = require('express')
const servicioController = require('../controllers/servicioController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { uploadServiceImage, handleUploadErrors } = require('../middlewares/uploadMiddleware')
const { validateServiceFields, handleValidationErrors } = require('../middlewares/validationMiddleware')
const router = express.Router()

console.log(servicioController.createServicio)

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

router.post(
  '/:id_servicio/upload',
  authenticateToken,
  uploadServiceImage,
  handleUploadErrors,
  (req, res) => {
    const filePath = `/uploads/${req.file.filename}`
    res.status(200).json({ message: 'Imagen subida con éxito', filePath });
  }
)

module.exports = router