const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	try {
		const { nombre, contrasena, email,
					 foto_perfil, descripcion, id_datos_bancarios } = req.body

		const existingUser = await UserModel.getUserByEmail(email)
		if (existingUser) {
			return res.status(400).json(
				{ error: 'El correo electrónico ya está registrado' }
			)
		}

		const hashedPassword = await bcrypt.hash(contrasena, 10)

		const newUser = await UserModel.createUser({
			nombre,
			contrasena: hashedPassword,
			email,
			foto_perfil,
			descripcion,
			id_datos_bancarios
		})

		const token = jwt.sign({ id: newUser.id }, procces.env.JWT_SECRET, { expiresIn: '1h' })

		return res.status(200).json({
			message: 'Usuario registrado con éxito',
			token,
			user: newUser
		})
	} catch (error) {
		console.error('Error al registrar usuario:', error)
		return res.status(500).json({ error: 'Error al registar al usuario' })
	}
}

const login = async (req, res) => {
	try {
		const [email, contrasena] = req.body

		const user = await UserModel.getUserByEmail(email)
		if (!user) {
			return res.status(400).json(
				{ error: 'Correo o contraseña incorrectos' }
			)
		}

		const validPassowrd = await bcrypt.compare(contrasena, user.contrasena)
		if (!validPassowrd) {
			return res.status(400).json(
				{ error: 'Correo o contraseña incorrectos' }
			)
		}

		const token = jwt.sign(
			{ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }
		)

		return res.status(200).json({
			message: 'Inicio de sesión exitoso',
			token,
			user
		})
	} catch (error) {
		console.error('Error al iniciar sesión', error)
		return res.status(500).json({ error: 'Error al inciar sesión' })
	}
}

const getProfile = async (req, res) => {
	try {
		const userId = req.user.id

		const user = await UseModel.getUserById(userId)
		if (!user) {
			return res.status(404).json({ error: 'Usuario no encontrado' })
		}

		return res.status(200).json(user)
	} catch (error){
		console.error('Error al obtener el perfil:', error)
		return res.status(500).json({ error: 'Error al obtener el perfil' })
	}
}

const updateProfile = async (req, res) => {
	try {
		const userId = req.user.id
		const {
			nombre, contrasena, email,
			foto_perfil, descripcion, id_datos_bancarios
		} = req.body

		let hashedPassword
		if(contrasena){
			hashedPassword = await bcrypt.hash(contrasena, 10)
		}

		const updatedUser = await UserModel.updateUser (userId, {
			nombre,
			contrasena: hashedPassword,
			email,
			foto_perfil,
			descripcion,
			id_datos_bancarios
		})

		if (!updatedUser){
			return res.status(404).json({ error:'Usuario no encontrado' })
		}

		return res.status(200).json(
			{ message: 'Perfil actualizado con exito'},updatedUser
		)
	} catch (error) {
		console.error('Error al actualizar el perfil:', error)
		return res.status(500).json({ error: 'Error al atualizar el perfil'})
	}
}

const deleteProfile = async (req, res) => {
	try {
		const userId = req.user.id

		const deletedUser = await UserModel.deleteUser(userId)
		if (!deletedUser) {
			return res.status(404).json({ error: 'Usuario no encontrado' })
		}

		return res.status(200).json({ message: 'Usuario eliminado con éxito' })
	} catch (error) {
		console.error('Error al eliminar el usuario:', error)
		return res.status(500).json({ error: 'Errir al eliminar el usuario' })
	}
}

module.exports = {
	register,
	login,
	getProfile,
	updateProfile,
	deleteProfile
}
