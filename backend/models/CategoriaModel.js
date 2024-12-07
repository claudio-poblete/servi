const db = require('../config/database')

const createCategoria = async (nombre) => {
  try {
    const queryCheck = 'SELECT * FROM categoria WHERE nombre = $1'
    const checkResult = await db.query(queryCheck, [nombre])

    if (checkResult.rows.length > 0) {
      throw new Error('La categoría ya existe')
    }

    const query = 'INSERT INTO categoria (nombre) VALUES ($1) RETURNING *'
    const params = [nombre]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear la categoría:', error)
    throw error
  }
}

const getAllCategorias = async () => {
  try {
    const query = 'SELECT * FROM categoria'
    const result = await db.query(query)

    if (result.rows.length === 0) {
      throw new Error('No se encontraron categorías')
    }

    return result.rows
  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    throw error
  }
}

const getCategoriaById = async (id_categoria) => {
  try {
    const query = 'SELECT * FROM categoria WHERE id = $1'
    const result = await db.query(query, [id_categoria])

    if (result.rows.length === 0) {
      throw new Error('Categoría no encontrada')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener la categoría:', error)
    throw error
  }
}

const updateCategoria = async (id_categoria, nombre) => {
  try {
    const checkQuery = 'SELECT * FROM categoria WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_categoria])

    if (checkResult.rows.length === 0) {
      throw new Error('Categoría no encontrada')
    }

    const query = 'UPDATE categoria SET nombre = $1 WHERE id = $2 RETURNING *'
    const params = [nombre, id_categoria]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar la categoría:', error)
    throw error
  }
}

const deleteCategoria = async (id_categoria) => {
  try {
    const checkQuery = 'SELECT * FROM categoria WHERE id = $1'
    const checkResult = await db.query(checkQuery, [id_categoria])

    if (checkResult.rows.length === 0) {
      throw new Error('Categoría no encontrada')
    }

    const deleteQuery = 'DELETE FROM categoria WHERE id = $1'
    const result = await db.query(deleteQuery, [id_categoria])

    return { message: 'Categoría eliminada correctamente' }
  } catch (error) {
    console.error('Error al eliminar la categoría:', error)
    throw error
  }
}

module.exports = {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
}