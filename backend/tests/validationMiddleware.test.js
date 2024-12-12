const express = require('express');
const request = require('supertest');
const {
  validateUserFields,
  validateServiceFields,
  handleValidationErrors,
} = require('../middlewares/validationMiddleware');

const app = express();
app.use(express.json());

app.post('/api/users', validateUserFields, handleValidationErrors, (req, res) => {
  res.status(200).json({ message: 'User  is valid!' });
});

app.post('/api/services', validateServiceFields, handleValidationErrors, (req, res) => {
  res.status(200).json({ message: 'Service is valid!' });
});

describe('Validation Middleware', () => {
  describe('User  Validation', () => {
    it('should return 400 if the user fields are invalid', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          nombre: '',
          email: 'invalid-email',
          contrasena: 'short',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(5);
    });

    it('should return 200 if the user fields are valid', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          nombre: 'John Doe',
          email: 'john.doe@example.com',
          contrasena: 'validpassword',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User  is valid!');
    });
  });

  describe('Service Validation', () => {
    it('should return 400 if the service fields are invalid', async () => {
      const response = await request(app)
        .post('/api/services')
        .send({
          titulo: '',
          descripcion: 'A valid description',
          presupuesto: -10,
          id_usuario: 'not-an-integer',
          ubicacion: 'Location',
          id_categoria: 0,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(4); // Expecting 4 validation errors
    });

    it('should return 200 if the service fields are valid', async () => {
      const response = await request(app)
        .post('/api/services')
        .send({
          titulo: 'Valid Title',
          descripcion: 'A valid description',
          presupuesto: 100,
          id_usuario: 1,
          ubicacion: 'Location',
          id_categoria: 1,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Service is valid!');
    });
  });
});