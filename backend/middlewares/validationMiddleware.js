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
  handleValidationErrors,
}