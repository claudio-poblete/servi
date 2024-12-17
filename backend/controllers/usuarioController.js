const { validationResult } = require('express-validator')
const UsuarioModel = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpiration } = require('../config/config')

const createUsuario = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios } = req.body
    const newUser = await UsuarioModel.createUsuario(
      nombre,
      contrasena,
      email,
      foto_perfil,
      descripcion,
      id_datos_bancarios
    )

    return res.status(201).json(newUser)
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    return res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

const getUsuarioById = async (req, res) => {
  const userId = req.params.id_usuario;

  try {
      const usuario = await UsuarioModel.getUsuarioById(userId);
      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      return res.status(200).json(usuario);
  } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};


const loginUsuario = async (req, res) => {
  const { email, contrasena } = req.body
  console.log('Login - Email recibido:', email);
  try {
    const usuario = await UsuarioModel.getUsuarioByEmail(email)
    if (!usuario) {
      console.log('Usuario no encontrado:', email);
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' })
    }

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('Contraseña proporcionada:', contrasena);
    console.log('Contraseña almacenada (hash):', usuario.contrasena);
    console.log(isMatch)
    if (!isMatch) {
      console.log('Contraseña incorrecta para el usuario:', email);
      return res.status(400).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    const payload = { id: usuario.id, email: usuario.email }
    console.log('Generando token para el usuario:', usuario.id);

    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration })
    console.log('Token generado:', token);

    res.status(200).json({ message: 'Login exitoso', token })
  } catch (error) {
    console.error('Error al hacer login:', error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
}

const getUsuarioAutenticado = async (req, res) => {
  const userId = res.locals.user.id;

  try {
      const usuario = await UsuarioModel.getUsuarioById(userId);
      return res.status(200).json(usuario);
  } catch (error) {
      console.error('Error al obtener el usuario autenticado:', error);
      return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const updateUsuario = async (req, res) => {
  const { id } = req.params
  const { nombre, contrasena, email, foto_perfil, descripcion, id_datos_bancarios } = req.body

  try {
    const updatedUser = await UsuarioModel.updateUsuario(
      id,
      nombre,
      contrasena,
      email,
      foto_perfil,
      descripcion,
      id_datos_bancarios
    )

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    return res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

const deleteUsuario = async (req, res) => {
  const { id } = req.params

  try {
    const response = await UsuarioModel.deleteUsuario(id)

    return res.status(200).json(response)
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    return res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}

module.exports = {
  createUsuario,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
	loginUsuario,
  getUsuarioAutenticado
}