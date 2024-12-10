const express = require('express');
const request = require('supertest');
const {
  validateUserFields,
  validateServiceFields,
  handleValidationErrors,
} = require('../middlewares/validationMiddleware'); // Adjust the path as necessary

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Route for user validation
app.post('/api/users', validateUserFields, handleValidationErrors, (req, res) => {
  res.status(200).json({ message: 'User  is valid!' });
});

// Route for service validation
app.post('/api/services', validateServiceFields, handleValidationErrors, (req, res) => {
  res.status(200).json({ message: 'Service is valid!' });
});

describe('Validation Middleware', () => {
  describe('User  Validation', () => {
    it('should return 400 if the user fields are invalid', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          nombre: '', // Invalid
          email: 'invalid-email', // Invalid
          contrasena: 'short', // Invalid
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(5); // Expecting 5 validation errors
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
          titulo: '', // Invalid
          descripcion: 'A valid description',
          presupuesto: -10, // Invalid
          id_usuario: 'not-an-integer', // Invalid
          ubicacion: 'Location',
          id_categoria: 0, // Invalid
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