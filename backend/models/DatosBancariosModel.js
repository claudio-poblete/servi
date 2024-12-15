const db = require('../config/database')

const createDatosBancarios = async (id_usuario, banco, tipo_de_cuenta, numero_cuenta) => {
  try {
    const queryCheck = 'SELECT * FROM datos_bancarios WHERE id_usuario = $1'
    const checkResult = await db.query(queryCheck, [id_usuario])

    if (checkResult.rows.length > 0) {
      throw new Error('Este usuario ya tiene datos bancarios registrados')
    }

    const query = `
      INSERT INTO datos_bancarios (id_usuario, banco, tipo_de_cuenta, numero_cuenta)
      VALUES ($1, $2, $3, $4)
      RETURNING *`
    const params = [id_usuario, banco, tipo_de_cuenta, numero_cuenta]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear los datos bancarios:', error)
    throw error
  }
}

const getDatosBancariosByUserId = async (id_usuario) => {
  try {
    const query = 'SELECT * FROM datos_bancarios WHERE id_usuario = $1'
    const result = await db.query(query, [id_usuario])

    if (result.rows.length === 0) {
      throw new Error('Datos bancarios no encontrados para este usuario')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener los datos bancarios:', error)
    throw error
  }
}

const updateDatosBancarios = async (id_usuario, banco, tipo_de_cuenta, numero_cuenta) => {
  try {
    const checkQuery = 'SELECT * FROM datos_bancarios WHERE id_usuario = $1'
    const checkResult = await db.query(checkQuery, [id_usuario])

    if (checkResult.rows.length === 0) {
      throw new Error('No se encontraron datos bancarios para este usuario')
    }

    const query = `
      UPDATE datos_bancarios
      SET banco = $1, tipo_de_cuenta = $2, numero_cuenta = $3
      WHERE id_usuario = $4
      RETURNING *`
    const params = [banco, tipo_de_cuenta, numero_cuenta, id_usuario]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar los datos bancarios:', error)
    throw error
  }
}

const deleteDatosBancarios = async (id_usuario) => {
  try {
    const checkQuery = 'SELECT * FROM datos_bancarios WHERE id_usuario = $1'
    const checkResult = await db.query(checkQuery, [id_usuario])

    if (checkResult.rows.length === 0) {
      throw new Error('No se encontraron datos bancarios para este usuario')
    }
    return { message: 'Datos bancarios eliminados correctamente' }
  } catch (error) {
    console.error('Error al eliminar los datos bancarios:', error)
    throw error
  }
}

module.exports = {
  createDatosBancarios,
  getDatosBancariosByUserId,
  updateDatosBancarios,
  deleteDatosBancarios
}