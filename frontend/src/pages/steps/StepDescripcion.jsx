import PropTypes from "prop-types";
import { useState } from "react";

const StepDescripcion = ({ nextStep, prevStep, updateFormData }) => {
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setDescripcion(e.target.value);
    if (e.target.value.trim().length >= 10) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (descripcion.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres.");
    } else {
      updateFormData("descripcion", descripcion.trim());
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h2>¿Qué servicio necesitas?</h2>
      <p className="step-instructions">
        En pocas palabras describe lo que necesitas hacer.
      </p>
      <textarea
        className="descripcion-input"
        placeholder="Describe tu servicio..."
        value={descripcion}
        onChange={handleChange}
        rows="4"
      />
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

StepDescripcion.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
};

export default StepDescripcion;
