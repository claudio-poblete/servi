import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import api from "../../api";

const StepCategoria = ({ nextStep, updateFormData }) => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categorias"); // Ajusta el endpoint si es necesario
        setCategorias(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener las categorías:", err);
        setError("No se pudieron cargar las categorías.");
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleSelect = (categoria) => {
    setSelectedCategoria(categoria.id);
  };

  const handleContinue = () => {
    if (selectedCategoria) {
      updateFormData("categoria", selectedCategoria);
      nextStep();
    }
  };

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="step-container">
      <h2>Elige una categoría</h2>
      <div className="categoria-grid">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`categoria-card ${
              selectedCategoria === categoria.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(categoria)}
          >
            {categoria.nombre}
          </div>
        ))}
      </div>
      <button
        className="btn-primary"
        disabled={!selectedCategoria}
        onClick={handleContinue}
      >
        Continuar
      </button>
    </div>
  );
};

StepCategoria.propTypes = {
  nextStep: PropTypes.func.isRequired,
  updateFormData: PropTypes.func.isRequired,
};

export default StepCategoria;
