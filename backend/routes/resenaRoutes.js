const express = require('express')
const { check } = require('express-validator')
const resenaController = require('../controllers/resenaController')
const router = express.Router()
router.post(
  '/',
  [
    check('id_servicio').isInt().withMessage('El ID del servicio debe ser un número entero'),
    check('id_usuario').isInt().withMessage('El ID del usuario debe ser un número entero'),
    check('descripcion').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    check('valoracion').isInt({ min: 1, max: 5 }).withMessage('La valoración debe ser un número entre 1 y 5'),
  ],
  resenaController.createResena
)
router.get('/servicio/:id_servicio', resenaController.getResenasByServicio)
router.put(
  '/:id_resena',
  [
    check('descripcion').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    check('valoracion').isInt({ min: 1, max: 5 }).withMessage('La valoración debe ser un número entre 1 y 5'),
  ],
  resenaController.updateResena
)
router.delete('/:id_resena', resenaController.deleteResena)

module.exports = router