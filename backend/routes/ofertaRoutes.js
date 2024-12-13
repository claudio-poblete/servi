const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middlewares/authMiddleware')
const { handleValidationErrors } = require('../middlewares/validationMiddleware')
const ofertaController = require('../controllers/ofertaController')

router.post(
  '/',
  authenticateToken,
  handleValidationErrors,
  ofertaController.createOferta
)

router.get('/', authenticateToken, ofertaController.getAllOfertas)

router.get('/:id_oferta', authenticateToken, ofertaController.getOfertaById)

router.get('/usuario/:userId', authenticateToken, ofertaController.getOfertasByUsuario);

router.put(
  '/:id_oferta',
  authenticateToken,
  handleValidationErrors,
  ofertaController.updateOferta
)

router.delete('/:id_oferta', authenticateToken, ofertaController.deleteOferta)

module.exports = router

