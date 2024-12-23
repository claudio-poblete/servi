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

// Obtener ofertas recibidas para los servicios del usuario autenticado
router.get(
  '/recibidas',
  authenticateToken,
  ofertaController.getOfertasRecibidas
);

// Obtener ofertas realizadas por el usuario autenticado
router.get(
  '/mis-ofertas',
  authenticateToken,
  ofertaController.getOfertasByUsuario
);

// Obtener una oferta por su ID
router.get('/:id_oferta', authenticateToken, ofertaController.getOfertaById);

// Obtener todas las ofertas (para administración)
router.get('/', authenticateToken, ofertaController.getAllOfertas);

// Actualizar una oferta
router.put(
  '/:id_oferta',
  authenticateToken,
  handleValidationErrors,
  ofertaController.updateOferta
);

// Eliminar una oferta
router.delete('/:id_oferta', authenticateToken, ofertaController.deleteOferta);

// Aceptar una oferta
router.post('/:id_oferta/aceptar', authenticateToken, ofertaController.acceptOferta);

module.exports = router;
