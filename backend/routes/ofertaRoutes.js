const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');
const ofertaController = require('../controllers/ofertaController');

// Crear una nueva oferta
router.post(
  '/',
  authenticateToken,
  handleValidationErrors,
  ofertaController.createOferta
);

// Obtener todas las ofertas
router.get('/', authenticateToken, ofertaController.getAllOfertas);

// Obtener una oferta por su ID
router.get('/:id_oferta', authenticateToken, ofertaController.getOfertaById);

// Obtener todas las ofertas de un usuario
router.get('/usuario/:userId', authenticateToken, ofertaController.getOfertasByUsuario);

// Actualizar una oferta
router.put(
  '/:id_oferta',
  authenticateToken,
  handleValidationErrors,
  ofertaController.updateOferta
);

// Eliminar una oferta
router.delete('/:id_oferta', authenticateToken, ofertaController.deleteOferta);

//Nueva ruta**: Aceptar una oferta
router.post(
  '/:id_oferta/aceptar',
  authenticateToken,
  ofertaController.acceptOferta
);

module.exports = router;
