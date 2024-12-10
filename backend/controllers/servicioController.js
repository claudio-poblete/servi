const { validationResult } = require('express-validator')
const {
  crearServicio,
  obtenerServicios,
  obtenerServiciosPorId,
  actualizarServicios,
  eliminarServicio
} = require('../models/ServicioModel')

const createServicio = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria } = req.body

    const newServicio = await crearServicio(
      titulo,
      descripcion,
      presupuesto,
      id_usuario,
      ubicacion,
      id_categoria
    )

    return res.status(201).json(newServicio)
  } catch (error) {
    console.error('Error al crear el servicio:', error)
    return res.status(500).json({ error: error.message || 'Error al crear el servicio' })
  }
}

const getAllServicios = async (req, res) => {
  try {
    const servicios = await obtenerServicios()

    return res.status(200).json(servicios)
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
    return res.status(500).json({ error: error.message || 'Error al obtener los servicios' })
  }
}

const getServicioById = async (req, res) => {
  const { id_servicio } = req.params

  try {
    const servicio = await obtenerServiciosPorId(id_servicio)

    return res.status(200).json(servicio)
  } catch (error) {
    console.error('Error al obtener el servicio:', error)
    return res.status(500).json({ error: error.message || 'Error al obtener el servicio' })
  }
}

const updateServicio = async (req, res) => {
  const { id_servicio } = req.params
  const { titulo, descripcion, presupuesto, ubicacion, id_categoria, estado } = req.body

  try {
    const updatedServicio = await actualizarServicios(
      id_servicio,
      titulo,
      descripcion,
      presupuesto,
      ubicacion,
      id_categoria,
      estado
    )

    return res.status(200).json(updatedServicio)
  } catch (error) {
    console.error('Error al actualizar el servicio:', error)
    return res.status(500).json({ error: error.message || 'Error al actualizar el servicio' })
  }
}

const deleteServicio = async (req, res) => {
  const { id_servicio } = req.params

  try {
    const response = await eliminarServicio(id_servicio)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar el servicio:', error)
    return res.status(500).json({ error: error.message || 'Error al eliminar el servicio' })
  }
}

module.exports = {
  createServicio,
  getAllServicios,
  getServicioById,
  updateServicio,
  deleteServicio
}