import PropTypes from "prop-types";
import { useState } from "react";

const StepPresupuesto = ({ nextStep, prevStep, updateFormData, formData }) => {
  const [presupuesto, setPresupuesto] = useState(formData.presupuesto || "");

  const handleContinue = () => {
    updateFormData("presupuesto", presupuesto); // Actualiza el presupuesto en formData
    nextStep(); // Avanza al siguiente paso (StepConfirmacion)
  };

  return (
    <div className="step-presupuesto">
      <h2>Presupuesto</h2>
      <p>¿Cuánto estás dispuesto a pagar por este servicio?</p>
      <input
        type="number"
        placeholder="Ej: 20000"
        value={presupuesto}
        onChange={(e) => setPresupuesto(e.target.value)}
      />
      <div className="step-buttons">
        <button className="btn-secondary" onClick={prevStep}>
          Volver
        </button>
        <button className="btn-primary" onClick={handleContinue}>
          Continuar
        </button>
      </div>
    </div>
  );
};

StepPresupuesto.propTypes = {
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    presupuesto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default StepPresupuesto;
