const { validationResult } = require('express-validator')
const OfertaModel = require('../models/OfertaModel')

const createOferta = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_servicio, id_usuario, oferta } = req.body

    const newOferta = await OfertaModel.createOferta(id_servicio, id_usuario, oferta)

    return res.status(201).json(newOferta)
  } catch (error) {
    console.error('Error al crear la oferta:', error)
    return res.status(500).json({ error: 'Error al crear la oferta' })
  }
}

const getAllOfertas = async (req, res) => {
  try {
    const ofertas = await OfertaModel.getAllOfertas()

    return res.status(200).json(ofertas)
  } catch (error) {
    console.error('Error al obtener las ofertas:', error)
    return res.status(500).json({ error: 'Error al obtener las ofertas' })
  }
}

const getOfertaById = async (req, res) => {
  const { id_oferta } = req.params

  try {
    const oferta = await OfertaModel.getOfertaById(id_oferta)

    return res.status(200).json(oferta)
  } catch (error) {
    console.error('Error al obtener la oferta:', error)
    return res.status(500).json({ error: 'Error al obtener la oferta' })
  }
}

const updateOferta = async (req, res) => {
  const { id_oferta } = req.params
  const { oferta, estado } = req.body

  try {
    const updatedOferta = await OfertaModel.updateOferta(id_oferta, oferta, estado)

    return res.status(200).json(updatedOferta)
  } catch (error) {
    console.error('Error al actualizar la oferta:', error)
    return res.status(500).json({ error: 'Error al actualizar la oferta' })
  }
}

const deleteOferta = async (req, res) => {
  const { id_oferta } = req.params

  try {
    const response = await OfertaModel.deleteOferta(id_oferta)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar la oferta:', error)
    return res.status(500).json({ error: 'Error al eliminar la oferta' })
  }
}

module.exports = {
  createOferta,
  getAllOfertas,
  getOfertaById,
  updateOferta,
  deleteOferta
}