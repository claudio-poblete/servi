// validationMiddleware.test.js
const express = require("express");
const request = require("supertest");
const {
  validateUserFields, // Asegúrate de que el nombre sea correcto
  handleValidationErrors,
} = require("../middlewares/validationMiddleware");

const app = express();
app.use(express.json());

// Ruta para validar usuarios
app.post(
  "/api/users",
  validateUserFields, // Middleware de validación de usuarios
  handleValidationErrors,
  (req, res) => {
    res.status(200).json({ message: "User  is valid!" });
  }
);

// Ruta para servicios (sin validación)
app.post(
  "/api/services",
  (req, res) => {
    res.status(200).json({ message: "Service is valid!" });
  }
);

describe("Validation Middleware", () => {
  describe("User  Validation", () => {
    it("should return 400 if the user fields are invalid", async () => {
      const response = await request(app).post("/api/users").send({
        nombre: "",
        email: "invalid-email",
        contrasena: "short",
      });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(5); // Asegúrate de que este número coincida con los errores esperados
    });

    it("should return 200 if the user fields are valid", async () => {
      const response = await request(app).post("/api/users").send({
        nombre: "John Doe",
        email: "john.doe@example.com",
        contrasena: "validpassword",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User  is valid!");
    });
  });

  describe("Service Validation", () => {
    it("should return 200 for valid service without validation", async () => {
      const response = await request(app).post("/api/services").send({
        // Aquí puedes enviar cualquier dato, ya que no hay validación
        titulo: "Valid Title",
        descripcion: "A valid description",
        presupuesto: 100,
        id_usuario: 1,
        ubicacion: "Location",
        id_categoria: 1,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Service is valid!");
    });
  });
});