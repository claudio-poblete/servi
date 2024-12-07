const express = require('express')
const { body } = require('express-validator')
const pagoController = require('../controllers/pagoController')
const router = express.Router()

router.post(
  '/',
  [
    body('id_oferta').isInt().withMessage('El id_oferta debe ser un número entero'),
    body('id_usuario').isInt().withMessage('El id_usuario debe ser un número entero')
  ],
  pagoController.createPago
)
router.get('/usuario/:id_usuario', pagoController.getPagosByUsuario)
router.get('/oferta/:id_oferta', pagoController.getPagosByOferta)
router.delete('/:id_pago', pagoController.deletePago)

module.exports = router