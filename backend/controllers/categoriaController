const CategoriaModel = require('../models/categoriaModel')

const getAllCategories = async (req, res) => {
	try {
		const categories = await CategoriaModel.getAllCategories()
		return res.status(200).json(categories)
	} catch (error) {
		console.error('Error al obtener las categorías:', error)
		return res.status(500).json({ error: 'Error al obtener las categorías' })
	}
}

const getCategoryById = async (req, res) => {
	const {id} = req.params
	try {
		const category = await CategoriaModel.getCategoriaById(id)
		if (!category) {
			return res.status(404).json({ error: 'Categoria no encontrada' })
		}
		return res.status(200).json(category)
	} catch (error) {
		console.error('Error al obtener la categoría:', error)
		return res.status(500).json({ error: 'Error al obtener la categoría' })
	}
}

const createCategory = async (req, res) => {
	const {nombre} = req.body
	try {
		const newCategory = await CategoriaModel.createCategory(nombre)
		return res.status(201).json(newCategory)
	} catch (error) {
		console.error('Error al crear la categoría:', error)
		return res.status(500).json({ error: 'Error al crear la categoria' })
	}
}

const updateCategory = async (req, res) => {
	const {id} = req.params
	const {nombre} = req.body
	try {
		const updateCategory = await CategoriaModel.updateCategory(id, nombre)
		if (!updateCategory) {
			return res.status(404).json({ error: 'Categoría no encontrada' })
		}
		return res.status(200).json(updateCategory)
	} catch (error) {
		console.error('Error al actualizar la categoria:', error)
		return res.status(500).json({ error: 'Error al actualizar la categoria' })
	}
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    const deletedCategory = await CategoriaModel.deleteCategory(id)
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoría no encontrada' })
    }
    return res.status(200).json({ message: 'Categoría eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar la categoría:', error)
    return res.status(500).json({ error: 'Error al eliminar la categoría' })
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}