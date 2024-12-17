import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const StepUbicacion = ({ nextStep, prevStep, updateFormData }) => {
  const [ubicacion, setUbicacion] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUbicacion(e.target.value);
    if (e.target.value.trim().length > 0) {
      setError("");
    }
  };

  const handleContinue = () => {
    if (ubicacion.trim().length === 0) {
      setError("Por favor, ingresa una ubicación válida.");
    } else {
      updateFormData("ubicacion", ubicacion.trim());
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h2>Designa un lugar</h2>
      <p className="step-instructions">
        ¿Dónde necesitas que se lleve a cabo el servicio?
      </p>
      <div className="input-location-wrapper">
        <input
          type="text"
          placeholder="Ingresa la ubicación..."
          value={ubicacion}
          onChange={handleChange}
          className="ubicacion-input"
        />
        <FontAwesomeIcon icon={faLocationDot} className="icon-location" />
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

StepUbicacion.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
};

export default StepUbicacion;
