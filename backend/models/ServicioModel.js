const db = require('../config/database')
const { validationResult } = require('express-validator')

const getAllServices = async () => {
	try {
		const result = await db.query('SELECT * FROM servicio')
		return result.rows
	} catch (error) {
		console.error('Error al obtener los servicios:', error)
		throw error
	}
}

const getServiceById = async (serviceId) => {
	try {
		const text = 'SELECT * FROM servicio WHERE id = $1'
		const params = [serviceId]
		const result = await db.query(text, params)
		return result.rows[0]
	} catch (error) {
		console.error('Error al obtener el servicio por ID:', error)
		throw error
	}
}

const createService = async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			titulo,
			descripcion,
			presupuesto,
			id_usuario,
			ubicacion,
			id_categoria,
		} = req.body

		const text = `
			INSERT INTO servicio (titulo, descripcion,
			presupuesto, id_usuario, ubicacion, id_categoria)
			VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
		`
		const params = [titulo, descripcion, presupuesto, id_usuario, ubicacion, id_categoria]

		const result = await db.query(text, params)
		return res.status(200).json(result.rows[0])
	} catch (error) {
		console.error('Error al crear el servicio:', error)
		return res.status(500).json({ error: 'Error al crear el servicio' })
	}
}

const updateService = async (req, res, serviceId) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: erros.array() })
		}

		const {
			titulo,
			descripcion,
			presupuesto,
			ubicacion,
			id_categoria,
		} = req.body

		let updateQuery = 'UPDATE servicio SET'
		const params = []
		let index = 1

		if (titulo) {
			updateQuery += `titulo=$${index}, `
			params.push(titulo)
			index++
		}

		if (descripcion) {
			updateQuery += `descripcion=$${index}, `
			params.push(descripcion)
			index++
		}

		if (presupuesto) {
			updateQuery += `presupuesto=$${index}, `
			params.push(presupuesto)
			index++
		}

		if (ubicacion) {
			updateQuery += `ubicacion=$${index}, `
			params.push(ubicacion)
			index++
		}

		if (id_categoria) {
			updateQuery += `id_categoria=$${index}, `
			params.push(id_categoria)
			index++
		}

		if (estado !== undefined) {
			updateQuery += `estado=$${index}, `
			params.push(estado)
			index++
		}

		updateQuery = updateQuery.slice(0, -2)
		updateQuery += `WHERE id = $${index}`
		params.push(serviceId)

		const result = await db.query(updateQuery, params)
		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Servicio no encontrado' })
		}
		return res.status(200).json({ message: 'Servicio actualizado correctamente' })
	} catch (error) {
		console.error('Error al actualizar el servicio:', error)
		return res.status(500).json({ error: 'Error al actualizar el servicio' })
	}
}

const deleteService = async (req, res, serviceId) => {
	try {
		const result = await db.query('DELETE FROM servicio WHERE id = $1', [serviceId])
		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Servicio no encontrado'} )
		}
		return res.status(200).json({ message: 'Servicio eliminado correctamente'} )
	} catch (error) {
		console.error('Error al elimnar el servicio:', error)
		return res.statu(500).json({ error: 'Error al eliminar el servicio' })
	}
}

module.exports = {
	getAllServices,
	getServiceById,
	createService,
	updateService,
	deleteService,
}