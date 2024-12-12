const db = require('../config/database')
const bcrypt = require('bcryptjs')

const createUsuario = async (nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios) => {
  try {
    const emailCheckQuery = 'SELECT * FROM usuario WHERE email = $1'
    const emailCheckResult = await db.query(emailCheckQuery, [email])

    if (emailCheckResult.rows.length > 0) {
      throw new Error('El correo electrónico ya está registrado')
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10)

    const query = `
      INSERT INTO usuario (nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `
    const params = [nombre, hashedPassword, email, foto_perfil, descripcion, id_datos_bancarios]
    const result = await db.query(query, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    throw error
  }
}

const getUsuarioById = async (usuarioId) => {
  console.log('Llamando a getUsuarioById con ID:', usuarioId)
  try {
    const query = 'SELECT * FROM usuario WHERE id = $1'
    const result = await db.query(query, [usuarioId])

    if (result.rows.length === 0) {
      throw new Error('Usuario no encontrado')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    throw error
  }
}

const getUsuarioByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM usuario WHERE email = $1'
    const result = await db.query(query, [email])

    if (result.rows.length === 0) {
      throw new Error('Usuario no encontrado')
    }

    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    throw error
  }
}

const updateUsuario = async (usuarioId, nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios) => {
  try {
    const checkUserQuery = 'SELECT * FROM usuario WHERE id = $1'
    const checkUserResult = await db.query(checkUserQuery, [usuarioId])

    if (checkUserResult.rows.length === 0) {
      throw new Error('Usuario no encontrado')
    }

    let hashedPassword = null
    if (contrasena) {
      hashedPassword = await bcrypt.hash(contrasena, 10)
    }

    const updateQuery = `
      UPDATE usuario
      SET nombre = $1, contrasena = COALESCE($2, contrasena), email = $3, foto_perfil = $4, descripcion = $5, id_datos_bancarios = $6
      WHERE id = $7
      RETURNING *;
    `
    const params = [
      nombre,
      hashedPassword,
      email,
      foto_perfil,
      descripcion,
      id_datos_bancarios,
      usuarioId
    ]
    const result = await db.query(updateQuery, params)

    return result.rows[0]
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    throw error
  }
}

const deleteUsuario = async (usuarioId) => {
  try {
    const checkUserQuery = 'SELECT * FROM usuario WHERE id = $1'
    const checkUserResult = await db.query(checkUserQuery, [usuarioId])

    if (checkUserResult.rows.length === 0) {
      throw new Error('Usuario no encontrado')
    }

    const deleteQuery = 'DELETE FROM usuario WHERE id = $1'
    const result = await db.query(deleteQuery, [usuarioId])

    if (result.rowCount === 0) {
      throw new Error('No se pudo eliminar el usuario')
    }

    return { message: 'Usuario eliminado correctamente' }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    throw error
  }
}

module.exports = {
  createUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
	getUsuarioByEmail
}