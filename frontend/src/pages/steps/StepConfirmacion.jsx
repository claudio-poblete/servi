import PropTypes from "prop-types";
import api from "../../api";
import AuthContextModule from "../../context/AuthContext";

const StepConfirmacion = ({ formData, prevStep, handleSuccess }) => {
  const { user } = AuthContextModule.useAuth(); // Obtener el usuario autenticado

  const handleSubmit = async () => {
    try {
      console.log("Enviando datos al backend:", formData);

      if (!user || !user.id) {
        throw new Error("No se ha detectado un usuario autenticado.");
      }

      // Crear el cuerpo de la solicitud
      const payload = {
        titulo: formData.descripcion.split(" ").slice(0, 5).join(" "), // Usar una versión corta como título
        descripcion: formData.descripcion,
        presupuesto: formData.presupuesto,
        id_usuario: user.id, // Usar el ID del usuario autenticado
        ubicacion: formData.ubicacion,
        id_categoria: formData.categoria,
        fecha: formData.fecha.fecha, // Fecha específica
      };

      const response = await api.post("/servicios", payload);

      console.log("Respuesta del backend:", response.data);
      alert("Servicio creado exitosamente");

      handleSuccess(); // Para limpiar o navegar a otra página
    } catch (error) {
      console.error("Error al enviar el servicio:", error);
      alert("Error al enviar el servicio, intenta nuevamente.");
    }
  };

  return (
    <div className="step-confirmacion">
      <h2>Confirmación</h2>
      <p>
        <strong>Categoría:</strong> {formData.categoria || "No especificada"}
      </p>
      <p>
        <strong>Descripción:</strong> {formData.descripcion || "No especificada"}
      </p>
      <p>
        <strong>Ubicación:</strong> {formData.ubicacion || "No especificada"}
      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {formData.fecha
          ? `${formData.fecha.tipo || ""} - ${formData.fecha.fecha || ""}`
          : "No especificada"}
      </p>
      <p>
        <strong>Presupuesto:</strong>{" "}
        {formData.presupuesto
          ? `CLP ${formData.presupuesto.toLocaleString("es-CL")}`
          : "No especificado"}
      </p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={prevStep}>
          Volver
        </button>
        <button className="btn-primary" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};

StepConfirmacion.propTypes = {
  formData: PropTypes.shape({
    categoria: PropTypes.string,
    descripcion: PropTypes.string,
    ubicacion: PropTypes.string,
    fecha: PropTypes.shape({
      tipo: PropTypes.string,
      fecha: PropTypes.string,
    }),
    presupuesto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};

export default StepConfirmacion;
