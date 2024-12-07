const db = require('../config/database')

const createResena = async (id_servicio, id_usuario, descripcion, valoracion) => {
  try {
    const checkQuery = 'SELECT * FROM resena WHERE id_servicio = $1 AND id_usuario = $2'
    const checkResult = await db.query(checkQuery, [id_servicio, id_usuario])

    if (checkResult.rows.length > 0) {
      throw new Error('El usuario ya ha dejado una reseña para este servicio')
    }

    const query = 'INSERT INTO resena (id_servicio, id_usuario, descripcion, valoracion) VALUES ($1, $2, $3, $4) RETURNING *'
    const params = [id_servicio, id_usuario, descripcion, valoracion]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear la reseña:', error)
    throw new Error('Error al crear la reseña')
  }
}

const getAllResenas = async () => {
  try {
    const query = 'SELECT * FROM resena'
    const result = await db.query(query)

    if (result.rows.length === 0) {
      throw new Error('No se encontraron reseñas')
    }

    return result.rows
  } catch (error) {
    console.error('Error al obtener las reseñas:', error)
    throw error
  }
}

const getResenaById = async (id_resena) => {
  try {
    const query = 'SELECT * FROM resena WHERE id = $1'
    const result = await db.query(query, [id_resena])

    if (result.rows.length === 0) {
      throw new Error(Reseña con ID ${id_resena} no encontrada)
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener la reseña:', error)
    throw error
  }
}

const getResenasByServicio = async (id_servicio) => {
  try {
    const query = 'SELECT * FROM resena WHERE id_servicio = $1'
    const result = await db.query(query, [id_servicio])

    if (result.rows.length === 0) {
      throw new Error('No se encontraron reseñas para este servicio')
    }

    return result.rows
  } catch (error) {
    console.error('Error al obtener las reseñas por servicio:', error)
    throw error
  }
}

const updateResena = async (id_resena, descripcion, valoracion) => {
  try {
    const checkQuery = 'SELECT * FROM resena WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_resena])

    if (checkResult.rows.length === 0) {
      throw new Error(Reseña con ID ${id_resena} no encontrada)
    }

    const query = 'UPDATE resena SET descripcion = $1, valoracion = $2 WHERE id = $3 RETURNING *'
    const params = [descripcion, valoracion, id_resena]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar la reseña:', error)
    throw error
  }
}

const deleteResena = async (id_resena) => {
  try {
    const checkQuery = 'SELECT * FROM resena WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_resena])

    if (checkResult.rows.length === 0) {
      throw new Error(Reseña con ID ${id_resena} no encontrada)
    }

    const deleteQuery = 'DELETE FROM resena WHERE id = $1'
    const result = await db.query(deleteQuery, [id_resena])

    return { message: 'Reseña eliminada correctamente' }
  } catch (error) {
    console.error('Error al eliminar la reseña:', error)
    throw error
  }
}

module.exports = {
  createResena,
  getAllResenas,
  getResenaById,
  getResenasByServicio,
  updateResena,
  deleteResena
}