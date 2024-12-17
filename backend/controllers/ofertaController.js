const { validationResult } = require('express-validator');
const OfertaModel = require('../models/OfertaModel');

// Crear una nueva oferta
const createOferta = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_servicio, id_usuario, oferta } = req.body;

    const newOferta = await OfertaModel.createOferta(id_servicio, id_usuario, oferta);

    return res.status(201).json(newOferta);
  } catch (error) {
    console.error('Error al crear la oferta:', error);
    return res.status(500).json({ error: 'Error al crear la oferta' });
  }
};

// Obtener todas las ofertas
const getAllOfertas = async (req, res) => {
  try {
    const ofertas = await OfertaModel.getAllOfertas();

    return res.status(200).json(ofertas);
  } catch (error) {
    console.error('Error al obtener las ofertas:', error);
    return res.status(500).json({ error: 'Error al obtener las ofertas' });
  }
};

// Obtener una oferta por su ID
const getOfertaById = async (req, res) => {
  const { id_oferta } = req.params;

  try {
    const oferta = await OfertaModel.getOfertaById(id_oferta);

    return res.status(200).json(oferta);
  } catch (error) {
    console.error('Error al obtener la oferta:', error);
    return res.status(500).json({ error: 'Error al obtener la oferta' });
  }
};

// Obtener ofertas de un usuario
const getOfertasByUsuario = async (req, res) => {
  const { userId } = req.params;

  try {
    const ofertas = await OfertaModel.getOfertasByUsuario(userId);

    if (!ofertas || ofertas.length === 0) {
      return res.status(200).json({ message: 'No tienes ofertas aún.', data: [] });
    }

    return res.status(200).json({ data: ofertas });
  } catch (error) {
    console.error('Error al obtener las ofertas del usuario:', error);
    return res.status(500).json({ error: 'Error al obtener las ofertas del usuario.' });
  }
};

// Actualizar una oferta
const updateOferta = async (req, res) => {
  const { id_oferta } = req.params;
  const { oferta, estado } = req.body;

  try {
    const updatedOferta = await OfertaModel.updateOferta(id_oferta, oferta, estado);

    return res.status(200).json(updatedOferta);
  } catch (error) {
    console.error('Error al actualizar la oferta:', error);
    return res.status(500).json({ error: 'Error al actualizar la oferta' });
  }
};

// Eliminar una oferta
const deleteOferta = async (req, res) => {
  const { id_oferta } = req.params;

  try {
    const response = await OfertaModel.deleteOferta(id_oferta);

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error al eliminar la oferta:', error);
    return res.status(500).json({ error: 'Error al eliminar la oferta' });
  }
};

//Nueva función**: Aceptar una oferta
const acceptOferta = async (req, res) => {
  const { id_oferta } = req.params;

  try {
    // Llamada al modelo para marcar la oferta como aceptada
    const updatedOferta = await OfertaModel.acceptOferta(id_oferta);

    if (!updatedOferta) {
      return res.status(404).json({ error: 'Oferta no encontrada.' });
    }

    return res.status(200).json({ message: 'Oferta aceptada con éxito.', data: updatedOferta });
  } catch (error) {
    console.error('Error al aceptar la oferta:', error);
    return res.status(500).json({ error: 'Error al aceptar la oferta.' });
  }
};

module.exports = {
  createOferta,
  getAllOfertas,
  getOfertaById,
  getOfertasByUsuario,
  updateOferta,
  deleteOferta,
  acceptOferta, // Exportamos el nuevo método
};
