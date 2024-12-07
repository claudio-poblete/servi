const { validationResult } = require('express-validator')
const ResenaModel = require('../models/ResenaModel')

const createResena = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id_servicio, descripcion, valoracion, id_usuario } = req.body

    const newResena = await ResenaModel.createResena(id_servicio, id_usuario, descripcion, valoracion)

    return res.status(201).json(newResena)
  } catch (error) {
    console.error('Error al crear la reseña:', error)
    return res.status(500).json({ error: 'Error al crear la reseña' })
  }
}

const getResenasByServicio = async (req, res) => {
  const { id_servicio } = req.params

  try {
    const resenas = await ResenaModel.getResenasByServicio(id_servicio)

    return res.status(200).json(resenas)
  } catch (error) {
    console.error('Error al obtener las reseñas por servicio:', error)
    return res.status(500).json({ error: 'Error al obtener las reseñas' })
  }
}

const updateResena = async (req, res) => {
  const { id_resena } = req.params
  const { descripcion, valoracion } = req.body

  try {
    const updatedResena = await ResenaModel.updateResena(id_resena, descripcion, valoracion)

    return res.status(200).json(updatedResena)
  } catch (error) {
    console.error('Error al actualizar la reseña:', error)
    return res.status(500).json({ error: 'Error al actualizar la reseña' })
  }
}

const deleteResena = async (req, res) => {
  const { id_resena } = req.params

  try {
    const response = await ResenaModel.deleteResena(id_resena)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar la reseña:', error)
    return res.status(500).json({ error: 'Error al eliminar la reseña' })
  }
}

module.exports = {
  createResena,
  getResenasByServicio,
  updateResena,
  deleteResena
}