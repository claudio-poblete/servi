import PropTypes from "prop-types";
import { useState } from "react";

const StepFecha = ({ nextStep, prevStep, updateFormData }) => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(""); // Almacena la selección
  const [fechaEspecifica, setFechaEspecifica] = useState(""); // Para la fecha específica
  const [error, setError] = useState("");

  const handleSelectOption = (opcion) => {
    setOpcionSeleccionada(opcion);
    setError("");
  };

  const handleContinue = () => {
    if (!opcionSeleccionada) {
      setError("Por favor, selecciona una opción.");
      return;
    }

    // Si se seleccionó fecha específica, se debe validar que haya fecha
    if (opcionSeleccionada === "especifica" && !fechaEspecifica) {
      setError("Por favor, ingresa una fecha válida.");
      return;
    }

    // Actualiza los datos del formulario
    updateFormData("fecha", {
      tipo: opcionSeleccionada,
      fecha: fechaEspecifica || null,
    });

    nextStep();
  };

  return (
    <div className="step-container">
      <h2>¿Cuándo?</h2>
      <p className="step-instructions">
        Hazle saber a los <span className="texto-morado">servis</span> cuándo quieres que se cumpla tu servicio.
      </p>
      <div className="options-container">
        <div
          className={`option-card ${
            opcionSeleccionada === "especifica" ? "selected" : ""
          }`}
          onClick={() => handleSelectOption("especifica")}
        >
          <h4>Fecha específica</h4>
          {opcionSeleccionada === "especifica" && (
            <input
              type="date"
              value={fechaEspecifica}
              onChange={(e) => setFechaEspecifica(e.target.value)}
              className="date-input"
            />
          )}
        </div>

        <div
          className={`option-card ${
            opcionSeleccionada === "urgente" ? "selected" : ""
          }`}
          onClick={() => handleSelectOption("urgente")}
        >
          <h4>Urgente</h4>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="step-buttons">
        <button className="btn-secondary" onClick={prevStep}>
          Atrás
        </button>
        <button className="btn-primary" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

StepFecha.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
};

export default StepFecha;
