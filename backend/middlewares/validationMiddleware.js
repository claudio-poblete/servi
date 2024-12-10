const { check, validationResult } = require('express-validator')

const validateUserFields = [
  check('nombre')
    .isString().withMessage('El nombre debe ser un texto válido.')
    .matches(/^[a-zA-Z\s]+$/).withMessage('El nombre no debe contener números ni símbolos.')
    .notEmpty().withMessage('El nombre es obligatorio.'),

  check('email')
    .isEmail().withMessage('El correo electrónico debe tener un formato válido.')
    .custom((value) => {
      const domain = value.split('@')[1]
      if (typeof domain !== 'string' || !domain.includes('.')) {
        throw new Error('El dominio del correo no es válido.')
      }
      return true;
    })
    .notEmpty().withMessage('El correo electrónico es obligatorio.'),

  check('contrasena')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
    .notEmpty().withMessage('La contraseña es obligatoria.'),
]

const validateServiceFields = [
  check('titulo')
    .isString().withMessage('El título debe ser un texto válido.')
    .notEmpty().withMessage('El título es obligatorio.'),

  check('descripcion')
    .isString().withMessage('La descripción debe ser un texto válido.')
    .notEmpty().withMessage('La descripción es obligatoria.'),

  check('presupuesto')
    .isFloat({ min: 0 }).withMessage('El presupuesto debe ser un número válido y positivo.')
    .notEmpty().withMessage('El presupuesto es obligatorio.'),

  check('id_usuario')
    .isInt({ min: 1 }).withMessage('El ID del usuario debe ser un número entero positivo.')
    .notEmpty().withMessage('El ID del usuario es obligatorio.'),

  check('ubicacion')
    .isString().withMessage('La ubicación debe ser un texto válido.')
    .notEmpty().withMessage('La ubicación es obligatoria.'),

  check('id_categoria')
    .isInt({ min: 1 }).withMessage('El ID de la categoría debe ser un número entero positivo.')
    .notEmpty().withMessage('El ID de la categoría es obligatorio.'),
]

const handleValidationErrors = (req, res, next) => {
  console.log('Validation Errors:', validationResult(req).array());


  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    })
  }
  next()
}

module.exports = {
  validateUserFields,
  validateServiceFields,
  handleValidationErrors,
}