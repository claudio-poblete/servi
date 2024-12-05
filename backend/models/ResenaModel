const db = require('../config/database')
const { validationResult } = require('express-validator')

const getAllResenas = async () => {
  try {
    const result = await db.query('SELECT * FROM resena')
    return result.rows
  } catch (error) {
    console.error('Error al obtener las reseñas:', error)
    throw error
  }
}

const getResenaById = async (resenaId) => {
  try {
    const text = 'SELECT * FROM resena WHERE id = $1'
    const params = [resenaId]
    const result = await db.query(text, params)
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener la reseña por ID:', error)
    throw error
  }
}

const createResena = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_servicio, descripcion, valoracion, id_usuario } = req.body
    const text = 'INSERT INTO resena (id_servicio, descripcion, valoracion, id_usuario) VALUES ($1, $2, $3, $4) RETURNING *'
    const params = [id_servicio, descripcion, valoracion, id_usuario]

    const result = await db.query(text, params)
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear la reseña:', error)
    return res.status(500).json({ error: 'Error al crear la reseña' })
  }
}

const updateResena = async (req, res, resenaId) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { descripcion, valoracion } = req.body
    const updateQuery = 'UPDATE resena SET descripcion = $1, valoracion = $2 WHERE id = $3'
    const params = [descripcion, valoracion, resenaId]

    const result = await db.query(updateQuery, params)
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' })
    }

    return res.status(200).json({ message: 'Reseña actualizada correctamente' })
  } catch (error) {
    console.error('Error al actualizar la reseña:', error)
    return res.status(500).json({ error: 'Error al actualizar la reseña' })
  }
}

const deleteResena = async (req, res, resenaId) => {
  try {
    const result = await db.query('DELETE FROM resena WHERE id = $1', [resenaId])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reseña no encontrada' })
    }

    return res.status(200).json({ message: 'Reseña eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la reseña:', error)
    return res.status(500).json({ error: 'Error al eliminar la reseña' })
  }
}

module.exports = {
  getAllResenas,
  getResenaById,
  createResena,
  updateResena,
  deleteResena
}