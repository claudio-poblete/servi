const { validationResult } = require('express-validator')
const CategoriaModel = require('../models/CategoriaModel')

const createCategoria = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { nombre } = req.body

    const newCategoria = await CategoriaModel.createCategoria(nombre)

    return res.status(201).json(newCategoria)
  } catch (error) {
    console.error('Error al crear la categoría:', error)
    return res.status(500).json({ error: 'Error al crear la categoría' })
  }
}

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await CategoriaModel.getAllCategorias()

    return res.status(200).json(categorias)
  } catch (error) {
    console.error('Error al obtener las categorías:', error)
    return res.status(500).json({ error: 'Error al obtener las categorías' })
  }
}

const getCategoriaById = async (req, res) => {
  const { id_categoria } = req.params

  try {
    const categoria = await CategoriaModel.getCategoriaById(id_categoria)

    return res.status(200).json(categoria)
  } catch (error) {
    console.error('Error al obtener la categoría:', error)
    return res.status(500).json({ error: 'Error al obtener la categoría' })
  }
}

const updateCategoria = async (req, res) => {
  const { id_categoria } = req.params
  const { nombre } = req.body

  try {
    const updatedCategoria = await CategoriaModel.updateCategoria(id_categoria, nombre)

    return res.status(200).json(updatedCategoria)
  } catch (error) {
    console.error('Error al actualizar la categoría:', error)
    return res.status(500).json({ error: 'Error al actualizar la categoría' })
  }
}

const deleteCategoria = async (req, res) => {
  const { id_categoria } = req.params

  try {
    const response = await CategoriaModel.deleteCategoria(id_categoria)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar la categoría:', error)
    return res.status(500).json({ error: 'Error al eliminar la categoría' })
  }
}

module.exports = {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
}