const db = require('../config/database')
const { validationResult } = require('express-validator')

const getAllPagos = async () => {
  try {
    const result = await db.query('SELECT * FROM pago')
    return result.rows
  } catch (error) {
    console.error('Error al obtener todos los pagos:', error)
    throw error
  }
}

const getPagoById = async (pagoId) => {
  try {
    const text = 'SELECT * FROM pago WHERE id = $1'
    const params = [pagoId]
    const result = await db.query(text, params)
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener el pago por ID:', error)
    throw error
  }
}

const createPago = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_oferta, id_usuario } = req.body

    const text = 'INSERT INTO pago (id_oferta, id_usuario) VALUES ($1, $2) RETURNING *'
    const params = [id_oferta, id_usuario]
    const result = await db.query(text, params)

    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear el pago:', error)
    return res.status(500).json({ error: 'Error al crear el pago' })
  }
}

const updatePago = async (req, res, pagoId) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_oferta, id_usuario } = req.body

    const text = 'UPDATE pago SET id_oferta = $1, id_usuario = $2 WHERE id = $3 RETURNING *'
    const params = [id_oferta, id_usuario, pagoId]
    const result = await db.query(text, params)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error al actualizar el pago:', error)
    return res.status(500).json({ error: 'Error al actualizar el pago' })
  }
}

const deletePago = async (req, res, pagoId) => {
  try {
    const result = await db.query('DELETE FROM pago WHERE id = $1', [pagoId])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    return res.status(200).json({ message: 'Pago eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el pago:', error)
    return res.status(500).json({ error: 'Error al eliminar el pago' })
  }
}

module.exports = {
  getAllPagos,
  getPagoById,
  createPago,
  updatePago,
  deletePago
}