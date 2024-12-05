const DatosBancariosModel = require('../models/DatosBancarios')

const getAllDatosBancarios = async (req, res) => {
	try {
		const datosBancarios = await DatosBancariosModel.getAllDatosBancarios()
		res.status(200).json(datosBancarios)
	} catch (error) {
		console.error('Error al obtener todos los datos bancarios:', error)
		res.status(500).json({ error: 'Error al obtener todos los datos bancarios' })
	}
}

const getDatosBancariosById = async (req, res) => {
	try {
		const {id} = req.params
		const datosBancarios = await DatosBancariosModel.getDatosBancariosById(id)

		if (!datosBancarios) {
			return res.status(404).json({ error: 'Datos bancarios no encontrados' })
		}
		res.status(200).json(datosBancarios)
	} catch (error) {
		console.erro('Error al obtener los datos bancarios por ID:', error)
		res.status(500).json({ error: 'Error al obtener los datos bancarios por ID' })
	}
}

const createDatosBancarios = async (req, res) => {
	try {
		const { id_usuario, banco, tipo_de_cuenta, numero_cuenta } = req.body
		const nuevoDatosBancarios = await
		DatosBancariosModel.createDatosBancarios({
			id_usuario,
			banco,
			tipo_de_cuenta,
			numero_cuenta
		})

		res.status(201).json(nuevoDatosBancarios)
	} catch (error) {
		console.error('Error al crear los datos bancarios:', error)
		res.status(500).json({ error: 'Error al crear los datos bancarios' })
	}
}

const updateDatosBancarios = async (req, res) => {
	try {
		const {id} = req.params
		const {
			id_usuario,
			banco,
			tipo_de_cuenta,
			numero_cuenta
		} = req.body

		const updated = await DatosBancariosModel.updateDatosBancarios(id, {
			id_usuario,
			banco,
			tipo_de_cuenta,
			numero_cuenta
		})

		if (!updated) {
			return res.status(404).json({ error: 'Datos bancarios no encontrados' })
		}

		res.status(200).json({ message: 'Datos bancarios actualizados correctamente' })
	} catch (error) {
		console.error('Error al actualizar los datos bancarios:', error)
		res.status(500).json({ error: 'Error al actualizar los datos bancarios' })
	}
}

const deleteDatosBancarios = async (req, res) => {
	try {
		const {id} = req.params
		const deleted = await DatosBancariosModel.deleteDatosBancarios(id)

		if (!deleted) {
			return res.status(404).json({ error: 'Datos bancarios no encontrados' })
		}

		res.satus(200).json({ message: 'Datos bancarios eliminados correctamente' })
	} catch (error) {
		console.error('Error al eliminar los datos bancarios:', error)
		res.status(500).json({ error: 'Error al eliminar los datos bancarios' })
	}
}

module.exports = {
  getAllDatosBancarios,
  getDatosBancariosById,
  createDatosBancarios,
  updateDatosBancarios,
  deleteDatosBancarios
}