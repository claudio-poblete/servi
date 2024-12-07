const express = require('express')
const router = express.Router()
const CategoriaController = require('../controllers/categoriaController')

router.get('/', CategoriaController.getAllCategorias)
router.get('/:id_categoria', CategoriaController.getCategoriaById)
router.post('/', CategoriaController.createCategoria)
router.put('/:id_categoria', CategoriaController.updateCategoria)
router.delete('/:id_categoria', CategoriaController.deleteCategoria)

module.exports = router