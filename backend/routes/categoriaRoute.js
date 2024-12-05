const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

router.get('/', categoriaController.getAllCategories)
router.get('/:id', categoriaController.getCategoryById)
router.post('/', categoriaController.createCategory)
router.put('/:id', categoriaController.updateCategory)
router.delete('/:id', categoriaController.deleteCategory)

module.exports = router