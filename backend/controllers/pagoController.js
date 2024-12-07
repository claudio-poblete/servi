const { validationResult } = require('express-validator')
const PagoModel = require('../models/PagoModel')

const createPago = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_oferta, id_usuario } = req.body

    const newPago = await PagoModel.createPago(id_oferta, id_usuario)

    return res.status(201).json(newPago)
  } catch (error) {
    console.error('Error al crear el pago:', error)
    return res.status(500).json({ error: 'Error al crear el pago' })
  }
}

const getPagosByUsuario = async (req, res) => {
  const { id_usuario } = req.params

  try {
    const pagos = await PagoModel.getPagosByUsuario(id_usuario)

    return res.status(200).json(pagos)
  } catch (error) {
    console.error('Error al obtener los pagos por usuario:', error)
    return res.status(500).json({ error: 'Error al obtener los pagos por usuario' })
  }
}

const getPagosByOferta = async (req, res) => {
  const { id_oferta } = req.params

  try {
    const pagos = await PagoModel.getPagosByOferta(id_oferta)

    return res.status(200).json(pagos)
  } catch (error) {
    console.error('Error al obtener los pagos por oferta:', error)
    return res.status(500).json({ error: 'Error al obtener los pagos por oferta' })
  }
}

const deletePago = async (req, res) => {
  const { id_pago } = req.params

  try {
    const response = await PagoModel.deletePago(id_pago)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar el pago:', error)
    return res.status(500).json({ error: 'Error al eliminar el pago' })
  }
}

module.exports = {
  createPago,
  getPagosByUsuario,
  getPagosByOferta,
  deletePago
}