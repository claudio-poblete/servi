const ServicioModel = require('../models/servicioModel')

const getAllServicios = async (req, res) => {
  try {
    const servicios = await ServicioModel.getAllServicios()
    res.status(200).json(servicios)
  } catch (error) {
    console.error('Error al obtener los servicios:', error)
    res.status(500).json({ error: 'Error al obtener los servicios' })
  }
}

const getServicioById = async (req, res) => {
  try {
    const { id } = req.params
    const servicio = await ServicioModel.getServicioById(id)
    if (!servicio) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json(servicio)
  } catch (error) {
    console.error('Error al obtener el servicio por ID:', error)
    res.status(500).json({ error: 'Error al obtener el servicio' })
  }
}

const createServicio = async (req, res) => {
  try {
    const { titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria } = req.body
    const nuevoServicio = await ServicioModel.createServicio({
      titulo,
      descripcion,
      presupuesto,
      id_usuario,
      ubicacion,
      id_categoria
    })
    res.status(201).json(nuevoServicio)
  } catch (error) {
    console.error('Error al crear el servicio:', error)
    res.status(500).json({ error: 'Error al crear el servicio' })
  }
}

const updateServicio = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria, estado } = req.body
    const servicioActualizado = await ServicioModel.updateServicio(id, {
      titulo,
      descripcion,
      presupuesto,
      id_usuario,
      ubicacion,
      id_categoria,
      estado
    })
    if (!servicioActualizado) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json({ message: 'Servicio actualizado correctamente' })
  } catch (error) {
    console.error('Error al actualizar el servicio:', error)
    res.status(500).json({ error: 'Error al actualizar el servicio' })
  }
}

const deleteServicio = async (req, res) => {
  try {
    const { id } = req.params
    const servicioEliminado = await ServicioModel.deleteServicio(id)
    if (!servicioEliminado) {
      return res.status(404).json({ error: 'Servicio no encontrado' })
    }
    res.status(200).json({ message: 'Servicio eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el servicio:', error)
    res.status(500).json({ error: 'Error al eliminar el servicio' })
  }
}

module.exports = {
  getAllServicios,
  getServicioById,
  createServicio,
  updateServicio,
  deleteServicio
}