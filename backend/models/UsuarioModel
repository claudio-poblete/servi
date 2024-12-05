const db = require('../config/database')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const saltRounds = 10

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds)
}

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM usuario')
    return result.rows
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error)
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const text = 'SELECT * FROM usuario WHERE id = $1'
    const params = [userId]
    const result = await db.query(text, params)
    if (result.rows.length === 0) {
      throw new Error('Usuario no encontrado')
    }
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error)
    throw error
  }
}

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios } = req.body
    const hashedPassword = await hashPassword(contrasena)

    const text = 'INSERT INTO usuario (nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios) ' +
                 'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
    const params = [nombre, hashedPassword, email, foto_perfil, descripcion, id_datos_bancarios]
    const result = await db.query(text, params)
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    return res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

const updateUser = async (req, res, userId) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios } = req.body
    let updateQuery = 'UPDATE usuario SET'
    let params = []
    let index = 1

    if (nombre) {
      updateQuery += ` nombre=$${index}, `
      params.push(nombre)
      index++
    }

    if (contrasena) {
      const hashedPassword = await hashPassword(contrasena)
      updateQuery += ` contrasena=$${index}, `
      params.push(hashedPassword)
      index++
    }

    if (email) {
      updateQuery += ` email=$${index}, `
      params.push(email)
      index++
    }

    if (foto_perfil) {
      updateQuery += ` foto_perfil=$${index}, `
      params.push(foto_perfil)
      index++
    }

    if (descripcion) {
      updateQuery += ` descripcion=$${index}, `
      params.push(descripcion)
      index++
    }

    if (id_datos_bancarios) {
      updateQuery += ` id_datos_bancarios=$${index}, `
      params.push(id_datos_bancarios)
      index++
    }

    updateQuery = updateQuery.slice(0, -2)
    updateQuery += ` WHERE id = $${index}`
    params.push(userId)

    const result = await db.query(updateQuery, params)

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.status(200).json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    return res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

const deleteUser = async (req, res, userId) => {
  try {
    const result = await db.query('DELETE FROM usuario WHERE id = $1', [userId])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    return res.status(200).json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    return res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}