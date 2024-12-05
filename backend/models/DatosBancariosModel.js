const db = require('../config/database')
const { validationResult } = require('express-validator')

const getAllDatosBancarios = async () => {
  try {
    const result = await db.query('SELECT * FROM datos_bancarios')
    return result.rows
  } catch (error) {
    console.error('Error al obtener los datos bancarios:', error)
    throw error
  }
}

const getDatosBancariosByUserId = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM datos_bancarios WHERE id_usuario = $1', [userId])
    return result.rows[0]
  } catch (error) {
    console.error('Error al obtener los datos bancarios por usuario:', error)
    throw error
  }
}

const createDatosBancarios = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_usuario, banco, tipo_de_cuenta, numero_cuenta } = req.body
    const text = `
      INSERT INTO datos_bancarios (id_usuario, banco, tipo_de_cuenta, numero_cuenta)
      VALUES ($1, $2, $3, $4) RETURNING *`
    const params = [id_usuario, banco, tipo_de_cuenta, numero_cuenta]

    const result = await db.query(text, params)
    return res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error al crear los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al crear los datos bancarios' })
  }
}

const updateDatosBancarios = async (req, res, datosBancariosId) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_usuario, banco, tipo_de_cuenta, numero_cuenta } = req.body
    let updateQuery = 'UPDATE datos_bancarios SET'
    let params = []
    let index = 1

    if (id_usuario) {
      updateQuery += ` id_usuario=$${index}, `
      params.push(id_usuario)
      index++
    }

    if (banco) {
      updateQuery += ` banco=$${index}, `
      params.push(banco)
      index++
    }

    if (tipo_de_cuenta) {
      updateQuery += ` tipo_de_cuenta=$${index}, `
      params.push(tipo_de_cuenta)
      index++
    }

    if (numero_cuenta) {
      updateQuery += ` numero_cuenta=$${index}, `
      params.push(numero_cuenta)
      index++
    }

    updateQuery = updateQuery.slice(0, -2)
    updateQuery += ` WHERE id = $${index}`
    params.push(datosBancariosId)

    const result = await db.query(updateQuery, params)
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Datos bancarios no encontrados' })
    }
    return res.status(200).json({ message: 'Datos bancarios actualizados correctamente' })
  } catch (error) {
    console.error('Error al actualizar los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al actualizar los datos bancarios' })
  }
}

const deleteDatosBancarios = async (req, res, datosBancariosId) => {
  try {
    const result = await db.query('DELETE FROM datos_bancarios WHERE id = $1', [datosBancariosId])
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Datos bancarios no encontrados' })
    }
    return res.status(200).json({ message: 'Datos bancarios eliminados correctamente' })
  } catch (error) {
    console.error('Error al eliminar los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al eliminar los datos bancarios' })
  }
}

module.exports = {
  getAllDatosBancarios,
  getDatosBancariosByUserId,
  createDatosBancarios,
  updateDatosBancarios,
  deleteDatosBancarios
}