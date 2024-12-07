const db = require('../config/database')

const createOferta = async (id_servicio, id_usuario, oferta) => {
  try {
    const checkQuery = 'SELECT * FROM ofertas WHERE id_servicio = $1 AND id_usuario = $2'
    const checkResult = await db.query(checkQuery, [id_servicio, id_usuario])

    if (checkResult.rows.length > 0) {
      throw new Error('Ya existe una oferta para este servicio por este usuario')
    }
    const query = 'INSERT INTO ofertas (id_servicio, id_usuario, oferta) VALUES ($1, $2, $3) RETURNING *'
    const params = [id_servicio, id_usuario, oferta]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear la oferta:', error)
    throw error
  }
}

const getAllOfertas = async () => {
  try {
    const query = 'SELECT * FROM ofertas'
    const result = await db.query(query)

    if (result.rows.length === 0) {
      throw new Error('No se encontraron ofertas')
    }

    return result.rows
  } catch (error) {
    console.error('Error al obtener las ofertas:', error)
    throw error
  }
}

const getOfertaById = async (id_oferta) => {
  try {
    const query = 'SELECT * FROM ofertas WHERE id = $1'
    const result = await db.query(query, [id_oferta])

    if (result.rows.length === 0) {
      throw new Error('Oferta no encontrada')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener la oferta:', error)
    throw error
  }
}

const updateOferta = async (id_oferta, oferta, estado) => {
  try {
    const checkQuery = 'SELECT * FROM ofertas WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_oferta])

    if (checkResult.rows.length === 0) {
      throw new Error('Oferta no encontrada')
    }

    const query = 'UPDATE ofertas SET oferta = $1, estado = $2 WHERE id = $3 RETURNING *'
    const params = [oferta, estado, id_oferta]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar la oferta:', error)
    throw error
  }
}

const deleteOferta = async (id_oferta) => {
  try {
    const checkQuery = 'SELECT * FROM ofertas WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_oferta])

    if (checkResult.rows.length === 0) {
      throw new Error('Oferta no encontrada')
    }

    const deleteQuery = 'DELETE FROM ofertas WHERE id = $1'
    const result = await db.query(deleteQuery, [id_oferta])

    return { message: 'Oferta eliminada correctamente' }
  } catch (error) {
    console.error('Error al eliminar la oferta:', error)
    throw error
  }
}

module.exports = {
  createOferta,
  getAllOfertas,
  getOfertaById,
  updateOferta,
  deleteOferta
}