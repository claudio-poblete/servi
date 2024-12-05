const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.delete('/profile', userController.deleteProfile)

module.exports = router