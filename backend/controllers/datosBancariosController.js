const { validationResult } = require('express-validator')
const DatosBancariosModel = require('../models/DatosBancariosModel')

const createDatosBancarios = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_usuario, banco, tipo_de_cuenta, numero_cuenta } = req.body
    const newDatosBancarios = await DatosBancariosModel.createDatosBancarios(
      id_usuario,
      banco,
      tipo_de_cuenta,
      numero_cuenta
    )

    return res.status(201).json(newDatosBancarios)
  } catch (error) {
    console.error('Error al crear los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al crear los datos bancarios' })
  }
}

const getDatosBancariosByUserId = async (req, res) => {
  const { id_usuario } = req.params

  try {
    const datosBancarios = await DatosBancariosModel.getDatosBancariosByUserId(id_usuario)

    return res.status(200).json(datosBancarios)
  } catch (error) {
    console.error('Error al obtener los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al obtener los datos bancarios' })
  }
}

const updateDatosBancarios = async (req, res) => {
  const { id_usuario } = req.params
  const { banco, tipo_de_cuenta, numero_cuenta } = req.body

  try {
    const updatedDatosBancarios = await DatosBancariosModel.updateDatosBancarios(
      id_usuario,
      banco,
      tipo_de_cuenta,
      numero_cuenta
    )

    return res.status(200).json(updatedDatosBancarios)
  } catch (error) {
    console.error('Error al actualizar los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al actualizar los datos bancarios' })
  }
}

const deleteDatosBancarios = async (req, res) => {
  const { id_usuario } = req.params

  try {
    const response = await DatosBancariosModel.deleteDatosBancarios(id_usuario)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar los datos bancarios:', error)
    return res.status(500).json({ error: 'Error al eliminar los datos bancarios' })
  }
}

module.exports = {
  createDatosBancarios,
  getDatosBancariosByUserId,
  updateDatosBancarios,
  deleteDatosBancarios
}