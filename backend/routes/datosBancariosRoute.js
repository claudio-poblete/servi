const express = require('express')
const {
	getAllDatosBancarios,
	getDatosBancariosById,
	createDatosBancarios,
	updateDatosBancarios,
	deleteDatosBancarios
} = require('../controllers/datosBancariosController')
const router = express.Router()

router.get('/', getAllDatosBancarios)
router.get('/:id', getDatosBancariosById)
router.post('/', createDatosBancarios)
router.put('/:id', updateDatosBancarios)
router.delete('/:id', deleteDatosBanarios)

module.exports = router