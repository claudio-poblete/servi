const db = require('../config/database')

const getAllCategories = async () => {
	try {
		const result = await db.query('SELECT * FROM categoria ORDER BY id')
		return result.rows
	} catch (error) {
		console.error('Error al obtener todas las categorias:', error)
		throw error
	}
}

const getCategoryById = async (id) => {
	try {
		const text = 'SELECT * FROM categoria WHERE = $1'
		const params = [id]
		const result = await db.query(text, params)
		if (result.rowCount === 0) {
			throw new Error('Categoria no encontrada.')
		}
		return result.rows[0]
	} catch (error){
		console.error('Error al obtener la categoria por ID:', error)
		throw error
	}
}

const createCategory = async (nombre) => {
	try {
		const text = 'INSERT INTO categoria (nombre) VALUES ($1) RETURNING *'
		const params = [nombre]
		const result = await db.query(text, params)
		return result.rows[0]
	} catch (error) {
		console.error('Error al crear la categoría:', error)
		throw error
	}
}

const updateCategory = async (id, nombre) => {
	try {
		const result = await db.query(
			'UPDATE categoria SET nombre = $1 WHERE id = $2 RETURNING *',
			[nombre, id]
		)
		if (result.rowCount === 0) {
			throw new Error('Categoría no encontrada o no se pudo actualizar.')
		}
		return result.rows[0]
	} catch (error) {
		console.error('Error al actualizar la categoria:', error)
		throw error
	}
}

const deleteCategory = async (id) => {
	try {
		const result = await db.query('DELETE FROM categoria WHERE id = $1', [id])
		if (result.rowCount === 0) {
			throw new Error('Categoría no encontrada o no se pudo eliminar.')
		}
		return { message: 'Categoría eliminada correctamente.' }
	} catch (error) {
		console.error('Error al eliminar la categoría:', error)
		throw error
	}
}

module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory
}