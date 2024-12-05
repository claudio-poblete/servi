const express = require('express')
const { getAllServicios, getServicioById,
			 createServicio, updateServicio,
			 deleteServicio} = require('../controllers/servicioController')
const router = express.Router()

router.get('/', getAllServicios)
router.get('/:id', getServicioById)
router.post('/', createServicio)
router.put('/:id', updateServicio)
router.delete('/:id', deleteServicio)

module.exports = router