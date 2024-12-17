import { useState } from "react";
import StepCategoria from "./steps/StepCategoria";
import StepDescripcion from "./steps/StepDescripcion";
import StepUbicacion from "./steps/StepUbicacion";
import StepFecha from "./steps/StepFecha";
import StepPresupuesto from "./steps/StepPresupuesto";
import StepConfirmacion from "./steps/StepConfirmacion";
import './steps/stepsStyles.css';

const PedirUnServi = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    categoria: null,
    descripcion: "",
    ubicacion: "",
    fecha: "",
    presupuesto: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSuccess = () => {
    console.log("Formulario enviado correctamente:", formData);
    alert("¡Servicio solicitado exitosamente!");
    setStep(1); // Reiniciar el wizard
    setFormData({
      categoria: null,
      descripcion: "",
      ubicacion: "",
      fecha: "",
      presupuesto: "",
    });
  };

  return (
    <div className="wizard-container">

      {step === 1 && (
        <StepCategoria nextStep={nextStep} updateFormData={updateFormData} />
      )}
      {step === 2 && (
        <StepDescripcion
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && (
        <StepUbicacion
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 4 && (
        <StepFecha
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
        />
      )}
      {step === 5 && (
        <StepPresupuesto
          nextStep={nextStep}
          prevStep={prevStep}
          updateFormData={updateFormData}
          formData={formData}
        />
      )}
      {step === 6 && (
        <StepConfirmacion
          formData={formData}
          prevStep={prevStep}
          handleSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default PedirUnServi;
