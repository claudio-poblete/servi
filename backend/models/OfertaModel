const db = require('../config/database')
const { validationResult } = require('express-validator')

const getAllOfertas = async () => {
  try {
    const result = await db.query('SELECT * FROM ofertas')
    return result.rows
  } catch (error) {
    console.error('Error al obtener todas las ofertas:', error)
    throw error
  }
}

const getOfertaById = async (ofertaId) => {
  try {
    const text = 'SELECT * FROM ofertas WHERE id = $1'
    const params = [ofertaId]
    const result = await db.query(text, params)
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener la oferta por ID:', error)
    throw error
  }
}

const createOferta = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_servicio, id_usuario, oferta } = req.body

    const text = 'INSERT INTO ofertas (id_servicio, id_usuario, oferta) VALUES ($1, $2, $3) RETURNING *'
    const params = [id_servicio, id_usuario, oferta]
    const result = await db.query(text, params)

    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear la oferta:', error)
    return res.status(500).json({ error: 'Error al crear la oferta' })
  }
}

const updateOferta = async (req, res, ofertaId) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_servicio, id_usuario, oferta } = req.body

    const text = 'UPDATE ofertas SET id_servicio = $1, id_usuario = $2, oferta = $3 WHERE id = $4 RETURNING *'
    const params = [id_servicio, id_usuario, oferta, ofertaId]
    const result = await db.query(text, params)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Oferta no encontrada' })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error al actualizar la oferta:', error)
    return res.status(500).json({ error: 'Error al actualizar la oferta' })
  }
}

const deleteOferta = async (req, res, ofertaId) => {
  try {
    const result = await db.query('DELETE FROM ofertas WHERE id = $1', [ofertaId])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Oferta no encontrada' })
    }
    return res.status(200).json({ message: 'Oferta eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la oferta:', error)
    return res.status(500).json({ error: 'Error al eliminar la oferta' })
  }
}

module.exports = {
  getAllOfertas,
  getOfertaById,
  createOferta,
  updateOferta,
  deleteOferta
}